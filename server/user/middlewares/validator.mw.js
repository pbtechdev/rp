import { validationResult } from "express-validator";

export const validateReq = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array();
        const modifiedMsgs = messages?.map(item => item?.msg)
        return next({ status: 400, message: modifiedMsgs });
    }

};