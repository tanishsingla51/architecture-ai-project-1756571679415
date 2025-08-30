import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// All routes here are protected
router.use(protectRoute);

router.get('/:id', getMessages);
router.post('/send/:id', sendMessage);

export default router;