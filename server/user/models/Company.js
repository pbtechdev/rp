import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
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
    contactNubmer: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        trim: true
    },
    linkedIn: {
        type: String,
        default: "",
        trim: true
    },
    facebook: {
        type: String,
        default: "",
        trim: true
    },
    twitter: {
        type: String,
        default: "",
        trim: true
    },
    role: {
        type: String,
        immutable: true,
        default: "OWNER",
    },
    companyLogo: {
        type: String,
        default: "",
        trim: true
    },
    employeesCount: {
        type: Number,
        default: 0,
    },
    teams: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Company = mongoose.model("Company", CompanySchema)

export default Company;