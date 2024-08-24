import mongoose from 'mongoose';
import Team from '../../models/Team.js';
import Company from '../../models/Company.js';

export const createTeam = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, teamLeadName, linkedCompanyId } = req.body;

        // Check if the company exists
        const company = await Company.findById(linkedCompanyId).session(session);
        if (!company) {
            await session.abortTransaction(); // Rollback transaction if company does not exist
            return res.status(400).json({ message: 'Company with the given ID does not exist' });
        }

        const newTeam = new Team({
            name,
            teamLeadName,
            linkedCompanyId
        });

        await newTeam.save({ session });

        // Increment the teams count in the company
        await Company.findByIdAndUpdate(linkedCompanyId, { $inc: { teamsCount: 1 } }, { session });

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession(); // End the session

        return res.status(201).json(newTeam);

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
