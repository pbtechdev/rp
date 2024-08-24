import Team from '../../models/Team.js';

/* CREATE TEAM */

export const createTeam = async (req, res, next) => {
    try {
        const { name, teamLeadName } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Team name is required' });
        }

        const team = new Team({ name, teamLeadName });

        await team.save();

        return res.status(201).json(team);

    } catch (err) {
        next(err);
    }
}