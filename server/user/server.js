import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerCompany, login } from './controllers/auth.js';
import { uploadImage } from './controllers/upload.js'
import { errorHandler } from './middlewares/errorHandler.mw.js'
import { upload } from './middlewares/upload_image.mw.js';

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(cors());

app.use("/public/assets", express.static(path.join(__dirname, 'public/assets')));

/* ROUTES WITH FILES */
app.post('/upload_image', upload.single('image'), uploadImage)


/* ROUTES */
app.post('/log_in', login);
app.post('/register_company', registerCompany);

/* ERROR HANDLING */

app.use(errorHandler)

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 8081

mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running in PORT: ${PORT}`)))
    .catch((err) => console.log(err))

