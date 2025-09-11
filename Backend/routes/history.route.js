
import express from "express"
import { Gethistory,deleteHistory } from "../controllers/history.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();


router.get("/getHistory",protectRoute,Gethistory)
router.delete("/delete/:id",protectRoute,deleteHistory)
export default router
