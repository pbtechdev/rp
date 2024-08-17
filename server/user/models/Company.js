import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        min: 2,
        unique: true
    },
    contactNubmer: {
        type: String,
        min: 2,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    linkedIn: {
        type: String,
        default: ""
    },
    facebook: {
        type: String,
        default: ""
    },
    twitter: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: 'OWNER',
    },
    companyLogo: {
        type: String,
        default: ""
    },
    employeesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Company = mongoose.model("Company", CompanySchema)

export default Company;