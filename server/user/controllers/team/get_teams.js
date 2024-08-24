import Team from '../../models/Team.js';

export const getTeams = async (req, res, next) => {
    const { linkedCompanyId } = req.query;

    try {
        const teams = await Team.find({ linkedCompanyId }).exec();
        res.status(200).json(teams);
    } catch (error) {
        next(500)
    }
}