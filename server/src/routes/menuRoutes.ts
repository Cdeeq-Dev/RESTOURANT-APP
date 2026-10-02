import { Router } from 'express';
import {
  getMenuItems,
  getFeaturedItems,
  getMenuItemBySlug,
} from '../controllers/menuController';

const router = Router();

// GET /api/menu (with optional ?category=slug & ?featured=true)
router.get('/', getMenuItems);

// GET /api/menu/featured (MUST come before /:slug)
router.get('/featured', getFeaturedItems);

// GET /api/menu/:slug
router.get('/:slug', getMenuItemBySlug);

export default router;
