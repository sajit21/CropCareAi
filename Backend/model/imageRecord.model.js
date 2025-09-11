import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',         
    required: true
  },
  imageUrl: String,
  disease: String,
  remedy: String,
  confidence: {
    type: Number,
    min: 0,
    max: 1,
  },
  remedyUrl:{
    type: [String],
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const ImageRecord = mongoose.model('ImageRecord', imageSchema);
export default ImageRecord;
