import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
import {redis} from "../lib/redis.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";
import { oauth2Client } from "../lib/googleClient.js";
import axios from "axios";
import crypto from 'crypto';
import { sendForgetPasswordEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../nodemailer/email.js";


const generateToken=(userId)=>{ 
  const accessToken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"3h"
  })

  const refreshToken=jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"7d",
  })

  return {accessToken,refreshToken}
}


const storeRefreshToken=async(userId,refreshToken)=>{
  await redis.set(`redis_token:${userId}`,refreshToken,"Ex",15*60*60*1000)
}

  const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV=="production",
      sameSite:process.env.NODE_ENV=="production"? "strict":"lax", 
      maxAge: 3 * 60 * 60 * 1000 
    })
    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV=="production",
      sameSite:process.env.NODE_ENV=="production"? "strict":"lax", 
      maxAge:7*24*60*60*1000
    })
  }


export const SignUp = async (req, res) => {

  const { Photo,Fullname, Email, Password } = req.body;
  try {
    if (!Fullname || !Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are requied" });
    }

    const userExist = await User.findOne({ Email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: " User already Exists" });
    }

    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(Password)){
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });

    }
    const user = await User.create({Photo,Fullname, Email, Password });

    const { accessToken, refreshToken } = generateToken(user._id);  
        await storeRefreshToken(user._id,refreshToken)
        setCookies(res, accessToken, refreshToken);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        await sendWelcomeEmail(user.Email, user.Fullname);

    res.status(201).json({
      success:true,
      accessToken,
      refreshToken,
      user:{...user._doc,
      _id: user._id,
      Photo: user.Photo,
      Fullname: user.Fullname,
      Password: user.Password,
      Email: user.Email,
    role: user.role,
    verificationToken: verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }
    });
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(401)
        .json({ success: false, message: "All field are required" });
    }
    const user = await User.findOne({ Email });
    if (user && (await user.comparePassword(Password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      res.status(200).json({
        succes:true,
        accessToken,
      refreshToken,
      user:{...user._doc,
        _id: user._id,
        Email: user.Email,
        Password: user._Password,
        role: user.role,
        Fullname: user.Fullname,
        Photo: user.Photo,
        role: user.role
      }
      });
    } else {
      res.status(400).json({success:false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const Logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile=async(req,res)=>{
    try{
       

    const userId = req.user._id;
    const user = await User.findById(userId).select("-Password");
    res.json( user );
    }catch(err){
        console.log('Error in getProfile Controller',err.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const updateProfile=async(req,res)=>{
  try{
    const userId=req.user._id;
    const {userName,userProfileImg,bio,currentPassword,newPassword}=req.body;
    if(!userName && !userProfileImg && !bio && !currentPassword && !newPassword ){
      res.status(400).json({error:"atleast one field required"});
      return;
    }
    let cloudinaryResponse=null;
    const user=await User.findById(userId);
    if(!user){
      res.status(400).json({error:"user not found"});
      return;
    }
   
    if(newPassword && newPassword.length<6 && newPassword.length>12){
      res.status(400).json({error:"Password should be between 6 to 12 characters"});
      return
    }
    if(newPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(newPassword)===false){
      res.status(400).json({error:"Password should contain atleast one uppercase letter,one lowercase letter,one special character and one number"});
      return
    }
    if(currentPassword || newPassword){
        const validPassword=await bcrypt.compare(currentPassword,user.Password);
        console.log(currentPassword,user.Password)
        console.log(validPassword)
        if(!validPassword){
          res.status(400).json({error:"Invalid Password"});
          return;
        }
       
      }
      if(userProfileImg){
        try{
          if(user.Photo){
          const publicId=user.Photo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`ProfilePictures/${publicId}`);
          }
            cloudinaryResponse= await cloudinary.uploader.upload(userProfileImg,{folder:'ProfilePictures', 
  transformation: [
    { quality: "auto" }
  ]
        });
        }catch(err){
            console.log('errror checking image in cloudinary',err.message);
        }
      }

      user.Fullname=userName || user.Fullname;
    user.Photo=cloudinaryResponse?.secure_url || user.Photo;
    user.Email=user.Email
    user.Password=newPassword || user.Password;
    await user.save();
    const data=user._doc;
    delete data.password;
    res.status(200).json({message:"profile updated successfully",user:data});

  }catch(error){
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }
    console.log("error in updateProfile controller",error);
    res.status(500).json({error:"internal server error"});
  }}

  export const googleSignUp=async (req,res)=>{
    try{
      const {code}=req.query;
      const googleRes=await oauth2Client.getToken(code);
         const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
let user = await User.findOne({Email:email });
        if(!user){
           user = await User.create({
               Fullname: name,
                Email:email,
                Photo:picture,
                Password: bcrypt.hashSync(email, 10) 
              });
              await sendWelcomeEmail(user.Email, user.Fullname);
          }
         const { accessToken, refreshToken } = generateToken(user._id); 
         const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        await storeRefreshToken(user._id,refreshToken)
        setCookies(res, accessToken, refreshToken);
        res.status(201).json({
      success:true,
      accessToken,
      refreshToken,
      user:{...user._doc,
      _id: user._id,
      Photo: user.Photo,
      Fullname: user.Fullname,
      Password: user.Password,
      Email: user.Email,
    role: user.role,
   verificationToken: verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
  }
    });
    }catch(err){
        console.log('error in oAuthGoogleSignUp controller',err.message);
        res.status(500).json({error:"Internal Server Error"})
    }
  }

export const verifyEmail=async(req,res)=>{
  try{
    const {code}=req.body;
    const user=await User.findOne({'verificationToken':code,'verificationTokenExpiresAt':{$gt:new Date()}});
    if(!user) return res.status(400).json({error:'Token has been expired ..invalid'});
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;
    await user.save()
    const userDetail=user._doc;
    delete userDetail.Password;
    res.status(200).json({message:"user verified successfully",user:userDetail});
  }catch(err){
    console.log('error in verifyEmail controller',err.message);
    res.status(500).json({error:"Internal Server Error"});
  }
}


export const forgetPassword=async(req,res)=>{
      try{
        const {email}=req.body;
        const user=await User.findOne({Email:email});
        if(!user){
          res.status(400).json({error:"Email not found"});
          return;
        }
        const resetToken=crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt=Date.now()+24*60*60*1000;

        user.passwordResetToken=resetToken;
        user.PasswordResetTokenExpiresAt=resetTokenExpiresAt;
        await user.save();
        await sendForgetPasswordEmail(user.Email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({message:"reset password link sent to your email"});
      }catch(error){
        console.log("error in forgetPassword controller",error.message);
        res.status(500).json({error:"internal server"});
      }
}

export const resetPassword=async(req,res)=>{
  try{
    const {newPassword}=req.body;
    const {token}=req.params;
    const user=await User.findOne({passwordResetToken:token});
    if(!user){
      res.status(400).json({error:"user not found"});
      return;
    }
    if(user.PasswordResetTokenExpiresAt<Date.now()){
      res.status(400).json({error:"reset token expired"});
      return;
      }
    // const salt=await bcrypt.genSalt(10);
    // const hashPassword=await bcrypt.hash(newPassword,salt);
      user.Password= newPassword;
      await sendPasswordResetSuccessEmail(user.Email);
      user.passwordResetToken=undefined;
      user.PasswordResetTokenExpiresAt=undefined;
      await user.save();
       res.status(200).json({message:"password reset successfully"});
  }catch(error){
    console.log("error in resetPassword controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}

export const verifyEmailLink=async(req,res)=>{
  try{
    const userId= req.user._id; 
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user=await User.findByIdAndUpdate(userId,{ verificationToken: verificationToken,
    verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)},{ new: true });
    if(!user){
      return res.status(400).json({error:"user not found"});
    }
    await sendVerificationEmail(req.user.Email, verificationToken);
    res.status(200).json({message:"verification link sent to your email",success:true});
  }catch(err){
    console.log('error in verifyEmailLink controller',err.message);
    res.status(500).json({error:"Internal Server Error"});
  }
}
