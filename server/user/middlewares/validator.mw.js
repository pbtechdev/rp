import { validationResult } from "express-validator";

export const validateReq = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next({ status: 400, message: errors.array() });
    }

};