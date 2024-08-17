import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';


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