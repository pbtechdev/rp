import mongoose from 'mongoose';
import User from '../../models/User.js';
import Team from '../../models/Team.js';
import bcrypt from 'bcrypt';

/* CREATE USER */

export const createUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        const {
            name, email, password, role, profilePic, joiningDate, totalYearsExperience, employeeId,
            position, team, personalInfo, paymentInfo, linkedCompanyId
        } = req.body;

        // Validate required fields
        if (!name || !email || !password || !team || !linkedCompanyId) {
            await session.abortTransaction(); // Rollback transaction if any required field is missing
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            await session.abortTransaction(); // Rollback transaction if email is already in use
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Validate the team field
        if (!mongoose.isValidObjectId(team)) {
            await session.abortTransaction(); // Rollback transaction if team ID is invalid
            return res.status(400).json({ message: 'Invalid team ID format' });
        }

        // Check if the team exists
        const existingTeam = await Team.findById(team).session(session);
        if (!existingTeam) {
            await session.abortTransaction(); // Rollback transaction if team does not exist
            return res.status(400).json({ message: 'Team with the given ID does not exist' });
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
            team,
            personalInfo,
            paymentInfo,
            linkedCompanyId
        });

        await user.save({ session });

        existingTeam.teamSize += 1;
        await existingTeam.save({ session });

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession(); // End the session

        return res.status(201).json(user);

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
