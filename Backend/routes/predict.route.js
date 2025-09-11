import express from 'express';
import { handlePrediction } from '../controllers/predict.controller.js';

const router = express.Router();

router.post('/predict', handlePrediction);


export default router;
