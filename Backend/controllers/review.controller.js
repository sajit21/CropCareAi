


import ReviewAdd from "../model/review.model.js";
import User from "../model/user.model.js";

export const Review=async(req , res) =>{

  const UserId=req.user._id; 
try{
        const {PlantName,Accuracy,Suggestion,ActionTook,DiseaseName}=req.body;

        if (!PlantName || !Accuracy || !Suggestion || !ActionTook || !DiseaseName) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }


        const createReview= await ReviewAdd.create({UserId, PlantName, Accuracy, Suggestion, ActionTook,DiseaseName })

        res.status(201).json({success:true, message:" review added successfully",
            data: createReview
        })
        
    } catch (error) {

        console.log("somethin went wrong",error.message)
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}

export const getAllReview=async(req,res) =>{

    try {
        const getreview=await ReviewAdd.find({}).populate('UserId', 'Photo Fullname');
        res.status(201).json({success:true,data:getreview})
        
    } catch (error) {
        console.log("cannot fetched products",error.message)
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}

export const getReviewByPlant=async(req,res)=>{
    try {
        const {PlantName}=req.query;
        let filter={}
        if(PlantName){
            filter.PlantName=PlantName
        }
         const filterReviews = await ReviewAdd.find(filter).populate('UserId','Photo Fullname');;
        res.status(200).json({ success: true, data: filterReviews });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch reviews", error: error.message });
    }
}

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ReviewAdd.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "reveiew not found" });
    }
    res.status(200).json({ success: true, message: "review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getReviewByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const users = await User.find({
      Fullname: { $regex: username, $options: 'i' }
    });

    if (!users.length) {
      return res.status(404).json({ success: false, message: "No matching users found" });
    }

    const userIds = users.map(user => user._id);

    // Find reviews from all matching users
    const reviews = await ReviewAdd.find({ UserId: { $in: userIds } })
      .populate('UserId', 'Photo Fullname');

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews", error: error.message });
  }
};


