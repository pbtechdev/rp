import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 256,
        unique: true,
        trim: true,
        immutable: true,
        match: [/.+@.+\..+/, 'Invalid email address']
    },
    industryType: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 2000
    },
    portfolioSite: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    linkedIn: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    facebook: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    twitter: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    role: {
        type: String,
        default: 'OWNER',
        immutable: true,
        minlength: 2,
        maxlength: 50
    },
    companyLogo: {
        type: String,
        trim: true
    },
    employeesCount: {
        type: Number,
        default: 0
    },
    teamsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Company = model("Company", CompanySchema);

export default Company;