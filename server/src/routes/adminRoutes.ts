import { Router } from 'express';
import { getCurrentAdmin, loginAdmin } from '../controllers/adminAuthController';
import { authenticateAdminToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticateAdminToken, getCurrentAdmin);

export default router;
