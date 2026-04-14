import express from 'express';
import { followUser } from '../controllers/followController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:id', protect, followUser);

export default router;