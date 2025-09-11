import mongoose from "mongoose";

const reviewschema= new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    PlantName:{
        type:String,
        required:[true, "PlantName is required"]
    },
    DiseaseName:{
        type:String,
        required:[true,'Disease is required']
    },
    Accuracy:{
        type:String,
        required:[true,"Accuracy is required"]   
    },
    Suggestion:{
        type:String,
        required:[false , "add suggestion"]
    },
    ActionTook:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    }
)

const ReviewAdd=mongoose.model("ReviewAdd",reviewschema)
export default ReviewAdd



