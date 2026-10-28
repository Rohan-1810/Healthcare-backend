import { Router } from 'express';
import {
  assignDoctorToPatient,
  getMappings,
  getDoctorsByPatientId,
  removeMapping,
} from '../controllers/mappingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  createMappingValidator,
  patientMappingParamValidator,
  mappingIdParamValidator,
} from '../validators/mappingValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Protect all mapping routes with authentication
router.use(authenticateToken);

// Patient-Doctor mapping endpoints
router.post('/', createMappingValidator, validateRequest, assignDoctorToPatient);
router.get('/', getMappings);
router.get('/:patient_id', patientMappingParamValidator, validateRequest, getDoctorsByPatientId);
router.delete('/:id', mappingIdParamValidator, validateRequest, removeMapping);

export default router;
