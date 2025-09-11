import fs from 'fs';
import cloudinary from '../lib/cloudinary.js';
import { predictDisease } from '../lib/predictService.js';
import ImageRecord from '../model/imageRecord.model.js';
import axios from 'axios'


export const handlePrediction = async (req, res) => {
  try {
    const {image,userId}=req.body

    if(!image){
     return res.status(400).json({ message: 'image missing' });
    }

    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: 'plant_diseases'
    });
    
    const imageUrl = uploadRes.secure_url; 
    
    const prediction = await predictDisease(imageUrl);
    
  //   if(userId){

  //   if(!prediction.error){
  //     const topTwoLinks=await getTopGoogleLinks(prediction.disease)

  //   const newRecord = await ImageRecord.create({
  //     user: userId,
  //     imageUrl: imageUrl,
  //     disease: prediction.disease,
  //     remedy: prediction.remedy,
  //     confidence:prediction.confidence,
  //     remedyUrl:topTwoLinks
  //   });

  //  return res.status(200).json({
  //     message: 'Prediction successful',
  //     data: newRecord
  //   });
  //  }
  // }

  if(!prediction.error){
    const topTwoLinks=await getTopGoogleLinks(prediction.disease)
  return res.status(200).json({
      message: 'Prediction successful',
      data: {
      disease: prediction.disease,
      remedy: prediction.remedy,
      confidence:prediction.confidence,
      remedyUrl:topTwoLinks
      }
    });
  }
    

  res.status(400).json({
    message:"Uploaded image is not a leaf. Please upload a clear leaf image."
  })

    

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Prediction failed', error: err.message });
  }
};



// for google search link result

const getTopGoogleLinks = async (diseaseName) => {
  const params = {
    engine: 'google',
    q: `how to treat ${diseaseName}`,
    api_key: process.env.SERPAPI_KEY, 
    num: 5
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { params });
    const results = response.data.organic_results;
    const links = results.slice(0, 2).map(result => result.link);
    return links;
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    return [];
  }
};


