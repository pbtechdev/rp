import User from "../../models/User";

export const getUsers = async (req, res, next) => {
    try {
        const { linkedCompanyId, teamId, page = 1, limit = 10 } = req.query;

        // Validate and parse pagination parameters
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        if (pageNumber < 1 || pageSize < 1) {
            return res.status(400).json({ message: 'Page and limit must be positive integers' });
        }

        // Build the query
        let query = {};
        if (linkedCompanyId) {
            query.linkedCompanyId = linkedCompanyId;
        }
        if (team) {
            query.teamId = teamId;
        }

        // Fetch users from the database with pagination
        const users = await User.find(query)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();

        // Count total users for pagination info
        const totalUsers = await User.countDocuments(query).exec();

        res.status(200).json({
            page: pageNumber,
            limit: pageSize,
            total: totalUsers,
            totalPages: Math.ceil(totalUsers / pageSize),
            users
        });
    } catch (error) {
        next(500)
    }
};