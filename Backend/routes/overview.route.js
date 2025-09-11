import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getAdminOverview } from '../controllers/overview.controller.js';

const router= express.Router();


router.get('/',protectRoute,adminRoute,getAdminOverview);


export default router;