import { Router } from 'express';
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from '../controllers/patientController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  createPatientValidator,
  updatePatientValidator,
  patientIdParamValidator,
} from '../validators/patientValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Protect all patient routes with authentication
router.use(authenticateToken);

// Patient CRUD endpoints
router.post('/', createPatientValidator, validateRequest, createPatient);
router.get('/', getPatients);
router.get('/:id', patientIdParamValidator, validateRequest, getPatientById);
router.put('/:id', updatePatientValidator, validateRequest, updatePatient);
router.delete('/:id', patientIdParamValidator, validateRequest, deletePatient);

export default router;
