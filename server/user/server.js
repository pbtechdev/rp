import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCompany } from './controllers/company/create_company.js';
import { getCompany } from './controllers/company/get_company.js';
import { login } from './controllers/login.js';
import { uploadImage } from './controllers/upload.js';
import { errorHandler } from './middlewares/error_handler.mw.js';
import { upload } from './middlewares/upload_image.mw.js';
import { createUser } from '../user/controllers/user/create_user.js';
import { getUsers } from '../user/controllers/user/get_all_users.js'
import { createTeam } from './controllers/team/create_team.js';
import { getTeams } from './controllers/team/get_teams.js';

import {
    userQueryValidation,
    createUserValidation,
    createTeamValidation,
    createCompanyValidation,
    getTeamsValidation,
    getCompanyValidation,
    loginValidation,
    uploadImageValidation
} from './middlewares/validations.js'
import { validateReq } from './middlewares/validator.mw.js'

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
app.post('/upload_image', uploadImageValidation, validateReq, upload.single('image'), uploadImage)


/* ROUTES */

app.post('/log_in', loginValidation, validateReq, login);

app.post('/create_company', createCompanyValidation, validateReq, createCompany);
app.get('/get_company/:id', getCompanyValidation, validateReq, getCompany);


app.post('/create_user', userQueryValidation, validateReq, createUser);
app.get('/get_users', createUserValidation, validateReq, getUsers)

app.post('/create_team', createTeamValidation, validateReq, createTeam)
app.post('/get_teams', getTeamsValidation, validateReq, getTeams)



/* ERROR HANDLING */

app.use(errorHandler)

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 8081

mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running in PORT: ${PORT}`)))
    .catch((err) => console.log(err))

