import mongoose from "mongoose";
import Company from '../models/Company.js';

export const uploadImage = async (req, res, next) => {
    const { userId, saveAsProfile } = req.body;
    const { path } = req.file ?? {};
    try {
        const company = await Company.findById(userId);
        if (!company) return res.status(404).json({ message: 'Company not found!' })
        const absolutePath = 'http://localhost:8081/' + path
        if (saveAsProfile) {
            company.profilePic = absolutePath;
        }

        company.companyLogo = absolutePath;
        await company.save();
        return res.status(200).json({ imageUrl: absolutePath });// todo:should remove the local host once real storage connected
    } catch (error) {
        return next(500)
    }

}