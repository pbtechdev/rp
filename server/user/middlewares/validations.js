import { query } from 'express-validator';

export const userQueryValidation = [
    query('linkedCompanyId').optional().isMongoId().withMessage('Invalid company ID format'),
    query('teamId').optional().isString().trim(),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
];

export const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('teamId').isMongoId().withMessage('Invalid team ID format'),
    body('linkedCompanyId').isMongoId().withMessage('Invalid company ID format'),
    body('role').optional().isString().withMessage('Role must be a string'),
    body('profilePic').optional().isString().withMessage('Profile pic must be a string'),
    body('joiningDate').optional().isISO8601().withMessage('Joining date must be a valid date'),
    body('totalYearsExperience').optional().isNumeric().withMessage('Total years of experience must be a number'),
    body('employeeId').optional().isString().withMessage('Employee ID must be a string'),
    body('position').optional().isString().withMessage('Position must be a string'),
    body('personalInfo').optional().isObject().withMessage('Personal info must be an object'),
    body('paymentInfo').optional().isObject().withMessage('Payment info must be an object')
];

export const createTeamValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('linkedCompanyId').notEmpty().isMongoId().withMessage('Invalid company ID format'),
    body('teamLeadName').optional().isString().withMessage('Team lead name must be a string')
];

export const getTeamsValidation = [
    query('linkedCompanyId').notEmpty().withMessage('Company ID is required').isMongoId().withMessage('company ID not valid')
];

export const createCompanyValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),
    body('industryType').optional().isString().withMessage('Industry Type must be a string'),
    body('companyLogo').optional().isString().withMessage('Company Logo must be a string'),
    body('linkedIn').optional().isURL().withMessage('LinkedIn must be a valid URL'),
    body('facebook').optional().isURL().withMessage('Facebook must be a valid URL'),
    body('twitter').optional().isURL().withMessage('Twitter must be a valid URL'),
    body('portfolioSite').optional().isURL().withMessage('Portfolio Site must be a valid URL')
]

export const getCompanyValidation = [
    param('id').notEmpty().withMessage('Company ID is required').isMongoId().withMessage('Invalid company ID format')
];

export const loginValidation = [
    body('userName')
        .notEmpty().withMessage('Username is required')
        .isEmail().withMessage('Username must be a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required')
];

export const uploadImageValidation = [
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid company ID format'),
    body('saveAsProfile')
        .notEmpty().withMessage('Save as profile flag is required')
]