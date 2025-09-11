import ImageRecord from "../model/imageRecord.model.js";

export const Gethistory= async(req ,res)=>{

try {

    const userId= req.user._id; 
    const history =await ImageRecord.find({user: userId}).sort({ uploadedAt: -1 }); 
    res.status(200).json({success:true,data:history})
    
} catch (error) {
    console.log("somthing went wrong",error.message)
    res.status(500).json({success:false,message:"failed to get data",error:error.message})
    
}
}


export const deleteHistory = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { id } = req.params;  

    const deleted = await ImageRecord.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "History not found or not authorized" });
    }
    res.json({ success: true, message: "History deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete history", error: error.message });
  }
};




