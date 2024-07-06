import Company from '../models/Company.js';
import bcrypt from 'bcrypt';

/* REGISTER COMPANY */

export const registerCompany = async (req, res) => {
    try {
        const { name, email, password, companyLogo } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newCompany = new Company({
            name,
            email,
            password: passwordHash,
            companyLogo
        })

        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}