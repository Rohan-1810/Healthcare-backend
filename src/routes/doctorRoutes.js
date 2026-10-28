import { Router } from 'express';
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  createDoctorValidator,
  updateDoctorValidator,
  doctorIdParamValidator,
} from '../validators/doctorValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Protect all doctor routes with authentication
router.use(authenticateToken);

// Doctor CRUD endpoints
router.post('/', createDoctorValidator, validateRequest, createDoctor);
router.get('/', getDoctors);
router.get('/:id', doctorIdParamValidator, validateRequest, getDoctorById);
router.put('/:id', updateDoctorValidator, validateRequest, updateDoctor);
router.delete('/:id', doctorIdParamValidator, validateRequest, deleteDoctor);

export default router;
