import multer from 'multer';

const MAX_SIZE_1MB = 10048576;
const ALLOWEDFORMATS = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        const { userId } = req.body;
        cb(null, userId + file.originalname);
    }
})

const fileFormatFilter = (req, file, cb) => {
    const { userId } = req.body;
    if (!userId) {
        const err = new Error('Unable to find the user');
        err.status = 400;
        return cb(err, false);
    }

    if (!file.mimetype.startsWith('image/')) {
        const err = new Error('Please upload an image');
        err.status = 400;
        return cb(err, false);
    }

    if (!ALLOWEDFORMATS.includes(file.mimetype)) {
        const err = new Error('File type not allowed');
        err.status = 400
        return cb(err, false);
    }

    cb(null, true)
}

export const upload = multer({
    storage,
    limits: {
        fileSize: MAX_SIZE_1MB
    },
    fileFilter: fileFormatFilter
});