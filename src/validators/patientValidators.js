import { body, param } from 'express-validator';

export const createPatientValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Patient name must be between 2 and 100 characters'),
  body('age')
    .optional({ nullable: true, checkFalsy: false })
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be an integer between 0 and 150'),
  body('dateOfBirth')
    .optional({ nullable: true, checkFalsy: false })
    .isISO8601()
    .withMessage('Date of birth must be a valid date in YYYY-MM-DD format'),
  body('gender')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage('Gender cannot exceed 30 characters'),
  body('contact')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Contact cannot exceed 50 characters'),
  body('address')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address cannot exceed 500 characters'),
];

export const updatePatientValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Patient ID must be a valid positive integer'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Patient name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Patient name must be between 2 and 100 characters'),
  body('age')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be an integer between 0 and 150'),
  body('dateOfBirth')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('Date of birth must be a valid date in YYYY-MM-DD format'),
  body('gender')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage('Gender cannot exceed 30 characters'),
  body('contact')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Contact cannot exceed 50 characters'),
  body('address')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address cannot exceed 500 characters'),
];

export const patientIdParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Patient ID must be a valid positive integer'),
];
