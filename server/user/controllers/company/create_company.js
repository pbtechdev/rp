import Company from '../../models/Company.js';
import bcrypt from 'bcrypt';


/* CREATE COMPANY */

export const createCompany = async (req, res, next) => {
    try {
        const { name, industryType, password, companyLogo, linkedIn, facebook, twitter, userId, portfolioSite } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const company = await Company.findById(userId);
        if (!company) return res.status(400).json({ message: 'Unable to find your profile' });

        company.name = name;
        company.password = passwordHash;
        company.industryType = industryType;
        company.companyLogo = companyLogo;
        company.linkedIn = linkedIn;
        company.facebook = facebook;
        company.twitter = twitter;
        company.portfolioSite = portfolioSite;

        await company.save();

        return res.status(201).json({ message: 'Company profile has been created' });

    } catch (err) {
        next(500)
    }
}