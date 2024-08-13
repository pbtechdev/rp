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
        required: true,
        min: 2,
        unique: true
    },
    role: {
        type: String,
        default: 'ADMIN',
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    companyLogo: {
        type: String,
        default: ""//todo: need to create a one logo here saying that your logo;
    },
}, { timestamps: true })

const Company = mongoose.model("Company", CompanySchema)

export default Company;