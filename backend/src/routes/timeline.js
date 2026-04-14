import express from 'express';
import { getTimeline } from '../controllers/timelineController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getTimeline);

export default router;