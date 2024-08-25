import Company from '../../models/Company.js';

/* UPDATE COMPANY */

export const updateCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, industryType, companyLogo, linkedIn, facebook, twitter, portfolioSite } = req.body;

        const company = await Company.findById(id);
        if (!company) return res.status(404).json({ message: 'Company not found' });

        if (name) company.name = name;
        if (industryType) company.industryType = industryType;
        if (companyLogo) company.companyLogo = companyLogo;
        if (linkedIn) company.linkedIn = linkedIn;
        if (facebook) company.facebook = facebook;
        if (twitter) company.twitter = twitter;
        if (portfolioSite) company.portfolioSite = portfolioSite;

        // Save the updated company
        await company.save();

        return res.status(200).json({ message: 'Company profile has been updated' });

    } catch (err) {
        next(500)
    }
};
