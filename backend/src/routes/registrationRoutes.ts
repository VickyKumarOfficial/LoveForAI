import { Router } from 'express';
import { RegistrationController } from '../controllers/registrationController';

const router = Router();
const registrationController = new RegistrationController();

// POST /api/registrations - Create new registration
router.post('/', (req, res) => registrationController.createRegistration(req, res));

// GET /api/registrations/:id - Get registration by ID
router.get('/:id', (req, res) => registrationController.getRegistrationById(req, res));

// GET /api/registrations - Get all registrations (admin)
router.get('/', (req, res) => registrationController.getAllRegistrations(req, res));

export default router;
