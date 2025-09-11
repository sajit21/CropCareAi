import mongoose from "mongoose";

const catalogSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: [true, "include plantName"]
  },
  image: {
    type: String,
    required: [true, "Add Image of Plant"]
  },
  description: {
    type: String,
    required: [true, "write description"]
  },
  diseases: {
    type: [String],
    required: [true, "add diseases"]
  }
}, {
  timestamps: true 
});

const catalog = mongoose.model("catalog", catalogSchema); 
export default catalog;