import mongoose from 'mongoose';
import User from '../../models/User.js';
import Team from '../../models/Team.js';
import Company from '../../models/Company.js';
import bcrypt from 'bcrypt';

/* CREATE USER */

export const createUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            name, email, role, profilePic, joiningDate, totalYearsExperience, employeeId,
            position, teamId, personalInfo, paymentInfo, linkedCompanyId
        } = req.body;
        const personalInfomartion = { ...personalInfo, gender: personalInfo.gender ? personalInfo.gender : null }
        const password = 'Test@1234'// todo:need to remove this default password

        // Check if email already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            await session.abortTransaction(); // Rollback transaction if email is already in use
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Check if the team exists
        const existingTeam = await Team.findById(teamId).session(session);
        if (!existingTeam) {
            await session.abortTransaction(); // Rollback transaction if team does not exist
            return res.status(400).json({ message: 'Team with the given ID does not exist' });
        }

        const existingCompany = await Company.findById(linkedCompanyId).session(session);
        if (!existingCompany) {
            await session.abortTransaction(); // Rollback transaction if company does not exist
            return res.status(400).json({ message: 'Company with the given ID does not exist' });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
            role,
            profilePic,
            joiningDate,
            totalYearsExperience,
            employeeId,
            position,
            teamId,
            personalInfo: personalInfomartion,
            paymentInfo,
            linkedCompanyId
        });

        await user.save({ session });

        existingTeam.teamSize += 1;
        await existingTeam.save({ session });

        existingCompany.employeesCount += 1;
        await existingCompany.save({ session });

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession(); // End the session

        return res.status(201).json({ message: 'User added successfully.', user });

    } catch (err) {
        // Rollback the transaction and end the session if an error occurs
        await session.abortTransaction();
        session.endSession();
        return next(err);
    } finally {
        // Ensure the session is always ended
        session.endSession();
    }
};
