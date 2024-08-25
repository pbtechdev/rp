import { Schema, model } from "mongoose";

const PaymentInfo = new Schema({
    salary: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    },
    variables: {
        type: Number,
        default: 0
    },
    pan: {
        type: String,
        maxlength: 20,
        trim: true
    },
    esiNo: {
        type: String,
        maxlength: 20,
        trim: true
    },
    uan: {
        type: String,
        maxlength: 20,
        trim: true
    }
});

const PersonalInfo = new Schema({
    mobileNumber: {
        type: String,
        maxlength: 15,
        trim: true
    },
    address: {
        type: String,
        maxlength: 2000,
        trim: true
    },
    personalEmail: {
        type: String,
        maxlength: 255,
        match: [/.+@.+\..+/, 'Invalid email address'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        default: null,
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
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true,
        trim: true,
        immutable: true,
        match: [/.+@.+\..+/, 'Invalid email address']
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 2000,
        trim: true
    },
    role: {
        type: String,
        enum: ['HR', 'MANAGER', 'LEAD', 'EMPLOYEE'],
        default: 'EMPLOYEE',
        immutable: true
    },
    profilePic: {
        type: String,
        default: '',
        trim: true
    },
    joiningDate: {
        type: Date
    },
    totalYearsExperience: {
        type: Number,
        min: 0,
        default: 0
    },
    employeeId: {
        type: Number,
        min: 1,
        unique: true
    },
    position: {
        type: String,
        minlength: 2,
        maxlength: 200,
        trim: true
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    personalInfo: PersonalInfo,
    paymentInfo: PaymentInfo
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;