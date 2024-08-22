import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        trim: true
    },
    email: {
        type: String,
        min: 2,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        trim: true
    },
    contactNumer: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    role: {
        type: String,
        default: "EMPLOYEE",
    },
    profilePic: {
        type: String,
        default: "",
        trim: true
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;