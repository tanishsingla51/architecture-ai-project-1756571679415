import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Protect the route to ensure user is authenticated
router.get('/', protectRoute, getUsersForSidebar);

export default router;