import express from "express"
import { Review,getReviewByPlant,getAllReview,deleteReview, getReviewByUsername} from "../controllers/review.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();

router.post("/add",protectRoute,Review)
router.get("/getallreview",protectRoute,getAllReview)
router.get("/filter",protectRoute,getReviewByPlant)
router.get('/:username', protectRoute,adminRoute, getReviewByUsername); // Get reviews by plant ID
router.delete("/delete/:id",protectRoute,adminRoute,deleteReview)


export default router
