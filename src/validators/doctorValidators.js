import { body, param } from 'express-validator';

export const createDoctorValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Doctor name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Doctor name must be between 2 and 100 characters'),
  body('specialization')
    .trim()
    .notEmpty()
    .withMessage('Specialization is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Specialization must be between 2 and 100 characters'),
  body('email')
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid doctor email address')
    .normalizeEmail(),
  body('contact')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Contact number cannot exceed 50 characters'),
  body('address')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address cannot exceed 500 characters'),
];

export const updateDoctorValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a valid positive integer'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Doctor name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Doctor name must be between 2 and 100 characters'),
  body('specialization')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Specialization cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Specialization must be between 2 and 100 characters'),
  body('email')
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid doctor email address')
    .normalizeEmail(),
  body('contact')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Contact number cannot exceed 50 characters'),
  body('address')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address cannot exceed 500 characters'),
];

export const doctorIdParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a valid positive integer'),
];
