import { Router } from 'express';
import { getMenuByName } from '../controllers/menus';

const router = Router();

// GET /api/menus/:name
router.get('/:name', getMenuByName);

export default router;
