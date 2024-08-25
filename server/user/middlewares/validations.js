import { query, body, param } from 'express-validator';

export const userQueryValidation = [
    query('linkedCompanyId').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid company ID format'),
    query('teamId').optional({ checkFalsy: true }).isString().trim(),
    query('page').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional({ checkFalsy: true }).isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
];

export const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('teamId').isMongoId().withMessage('Invalid team ID format'),
    body('linkedCompanyId').isMongoId().withMessage('Invalid company ID format'),
    body('role').optional({ checkFalsy: true }).isString().withMessage('Role must be a string'),
    body('profilePic').optional({ checkFalsy: true }).isString().withMessage('Profile pic must be a string'),
    body('joiningDate').optional({ checkFalsy: true }).isISO8601().withMessage('Joining date must be a valid date'),
    body('totalYearsExperience').optional({ checkFalsy: true }).isNumeric().withMessage('Total years of experience must be a number'),
    body('employeeId').optional({ checkFalsy: true }).isString().withMessage('Employee ID must be a string'),
    body('position').optional({ checkFalsy: true }).isString().withMessage('Position must be a string'),
    body('personalInfo').optional({ checkFalsy: true }).isObject().withMessage('Personal info must be an object'),
    body('paymentInfo').optional({ checkFalsy: true }).isObject().withMessage('Payment info must be an object')
];

export const createTeamValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('linkedCompanyId').notEmpty().isMongoId().withMessage('Invalid company ID format'),
    body('teamLeadName').optional({ checkFalsy: true }).isString().withMessage('Team lead name must be a string')
];

export const getTeamsValidation = [
    query('linkedCompanyId').notEmpty().withMessage('Company ID is required').bail().isMongoId().withMessage('company ID not valid')
];

export const createCompanyValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('userId').notEmpty().withMessage('User ID is required').bail().isMongoId().withMessage('Invalid User ID format'),
    body('industryType').optional({ checkFalsy: true }).isString().withMessage('Industry Type must be a string'),
    body('companyLogo').optional({ checkFalsy: true }).isString().withMessage('Company Logo must be a string'),
    body('linkedIn').optional({ checkFalsy: true }).isURL().withMessage('LinkedIn must be a valid URL'),
    body('facebook').optional({ checkFalsy: true }).isURL().withMessage('Facebook must be a valid URL'),
    body('twitter').optional({ checkFalsy: true }).isURL().withMessage('Twitter must be a valid URL'),
    body('portfolioSite').optional({ checkFalsy: true }).isURL().withMessage('Portfolio Site must be a valid URL')
]

export const getCompanyValidation = [
    param('id').notEmpty().withMessage('Company ID is required').bail().isMongoId().withMessage('Invalid company ID format')
];

export const loginValidation = [
    body('userName').notEmpty().withMessage('Username is required').bail().isEmail().withMessage('Username must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

export const uploadImageValidation = [
    body('userId').notEmpty().withMessage('User ID is required').bail().isMongoId().withMessage('Invalid company ID format'),
    body('saveAsProfile').notEmpty().withMessage('Save as profile flag is required')
]

export const updateCompanyValidation = [
    param('id').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid company ID format'),

    body('name').optional({ checkFalsy: true }).isString().withMessage('Name must be a string'),
    body('industryType').optional({ checkFalsy: true }).isString().withMessage('Industry type must be a string'),
    body('companyLogo').optional({ checkFalsy: true }).isString().withMessage('Company logo must be a string URL'),
    body('linkedIn').optional({ checkFalsy: true }).isURL().withMessage('LinkedIn URL must be valid'),
    body('facebook').optional({ checkFalsy: true }).isURL().withMessage('Facebook URL must be valid'),
    body('twitter').optional({ checkFalsy: true }).isURL().withMessage('Twitter URL must be valid'),
    body('portfolioSite').optional({ checkFalsy: true }).isURL().withMessage('Portfolio site URL must be valid'),
];