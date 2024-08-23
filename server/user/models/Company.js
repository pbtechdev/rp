import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
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
        max: 2000,
        unique: true,
        trim: true,
        immutable: true,
    },
    industryType: {
        type: String,
        min: 2,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        trim: true
    },
    portfolioSite: {
        type: String,
        default: "",
        trim: true,
        max: 2000
    },
    linkedIn: {
        type: String,
        default: "",
        trim: true,
        max: 2000
    },
    facebook: {
        type: String,
        default: "",
        trim: true,
        max: 2000
    },
    twitter: {
        type: String,
        default: "",
        trim: true,
        max: 2000
    },
    role: {
        type: String,
        immutable: true,
        enum: ['OWNER', 'HR', 'MANAGER', 'LEAD', 'EMPLOYEE'],
        default: "OWNER",
        min: 2,
        max: 50,
    },
    companyLogo: {
        type: String,
        default: "",
        trim: true
    },
    employeesCount: {
        type: Number,
        default: 0,
        min: 2,
        max: 50,
    },
    teams: {
        type: Number,
        default: 0,
        min: 2,
        max: 50,
    }

}, { timestamps: true })

const Company = model("Company", CompanySchema)

export default Company;