import { Schema, model } from "mongoose";

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    teamSize: {
        type: Number,
        default: 0,
        min: 0
    },
    teamLeadName: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    linkedCompanyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
}, { timestamps: true });

const Team = model("Team", TeamSchema);

export default Team;