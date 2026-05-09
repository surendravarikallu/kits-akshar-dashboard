import { Router } from 'express';
import { getPageBySlug, updatePageSection } from '../controllers/pages';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/pages/:slug
router.get('/:slug', getPageBySlug);

// PUT /api/pages/sections/:id
router.put('/sections/:id', authenticateToken, updatePageSection);

export default router;
