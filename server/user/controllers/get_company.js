import mongoose from "mongoose";
import Company from "../models/Company.js";

/* GET COMPANY DETAILS */

export const getCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid company ID' })

        const company = await Company.findById(id);

        if (!company) return res.status(404).json({ message: 'Profile Not Found' });
        delete company.password;

        return res.status(200).json(company)
    } catch (err) {
        next(500);
    }
}
