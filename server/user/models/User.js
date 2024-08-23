import { Schema, model } from "mongoose";

const PaymentInfo = new Schema({
    salary: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    bonus: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    variables: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    pan: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    esiNo: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    uan: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    }
});

const PersonalInfo = new Schema({
    mobileNumber: {
        type: String,
        min: 2,
        max: 20,
        trim: true
    },
    address: {
        type: String,
        min: 2,
        max: 2000,
        trim: true
    },
    personalEmail: {
        type: String,
        min: 2,
        max: 2000,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHERS']
    }
});

const UserSchema = new Schema({
    linkedCompanyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
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
    password: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        trim: true
    },
    role: {
        type: String,
        immutable: true,
        min: 2,
        max: 50,
        enum: ['OWNER', 'HR', 'MANAGER', 'LEAD', 'EMPLOYEE'],
        default: "EMPLOYEE",
    },
    profilePic: {
        type: String,
        default: "",
        trim: true
    },
    joiningDate: {
        type: Date
    },
    position: {
        type: String,
        min: 2,
        max: 200,
        trim: true
    },
    totalYearsExperience: {
        type: Number,
        min: 2,
        max: 50,
        default: 0
    },
    employeeId: {
        type: Number,
        min: 1,
        max: 50,
    },
    position: {
        type: String,
        min: 2,
        max: 200,
        trim: true
    },
    team: {
        type: String,
        min: 2,
        max: 200,
        trim: true
    },
    personalInfo: PersonalInfo,
    paymentInfo: PaymentInfo
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;