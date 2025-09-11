import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema({
    Photo: {
        type:String,
        default:"https://ui-avatars.com/api/?name=User"
    },
    Fullname:{
        type:String,
        required:[true,"Fullname is required"],
        // unique:[true," username must be unique"],
        trim:true,
    },
    Password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be at least 6 character"]
        

    },
    Email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
     isVerified:{
        type:Boolean,
        default:false
    },
    lastLogin:{
    type:Date,
    default:()=>Date.now()
    },
    passwordResetToken:String,
    PasswordResetTokenExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date
},
{
timestamps:true
})
userSchema.pre("save", async function (next) {        
	if (!this.isModified("Password")) return next();     
	try {
		const salt = await bcrypt.genSalt(10);
		this.Password = await bcrypt.hash(this.Password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (Password) { 
	return bcrypt.compare(Password, this.Password);
};

const User=mongoose.model("User",userSchema)
export default User;

