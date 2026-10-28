import { body, param } from 'express-validator';

export const createMappingValidator = [
  body().custom((value, { req }) => {
    const patientId = req.body.patient_id || req.body.patientId;
    if (!patientId || !Number.isInteger(Number(patientId)) || Number(patientId) <= 0) {
      throw new Error('A valid positive patient_id (or patientId) is required');
    }
    const doctorId = req.body.doctor_id || req.body.doctorId;
    if (!doctorId || !Number.isInteger(Number(doctorId)) || Number(doctorId) <= 0) {
      throw new Error('A valid positive doctor_id (or doctorId) is required');
    }
    return true;
  }),
];

export const patientMappingParamValidator = [
  param('patient_id')
    .isInt({ min: 1 })
    .withMessage('patient_id parameter must be a valid positive integer'),
];

export const mappingIdParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Mapping ID must be a valid positive integer'),
];
