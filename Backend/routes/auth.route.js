import express from "express";
import passport from "passport";
// import "../lib/passport.js"

import { SignUp, Login, Logout, getProfile,googleSignUp,updateProfile, verifyEmail, forgetPassword, resetPassword, verifyEmailLink} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.get("/logout",Logout)
router.get('/profile',protectRoute,getProfile)
router.post("/Uprofile", protectRoute, updateProfile);

router.get('/verify-emailLink',protectRoute,verifyEmailLink)
router.post('/verify-email',verifyEmail)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

router.get("/googleUp",googleSignUp)


router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("google callback hit user:" ,req.user)
        res.send("Google login successful!"); 

    
  }
);


export default router;
