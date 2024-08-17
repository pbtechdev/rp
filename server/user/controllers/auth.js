import Company from '../models/Company.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* REGISTER COMPANY */

export const registerCompany = async (req, res) => {
    try {
        const { name, email, password, companyLogo, profilePic } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newCompany = new Company({
            name,
            email,
            password: passwordHash,
            companyLogo,
            profilePic
        });

        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* LOGIN */

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await Company.findOne({ email: userName });
        if (!user) return res.status(400).json({ message: "User does not exit" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}