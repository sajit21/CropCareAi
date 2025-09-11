import {create} from 'zustand';
import axios from '../lib/axios'
import toast from 'react-hot-toast';


export const usePredictStore = create((set) => ({
    prediction: null,
    isPredictionLoading: false,
    isPredictionError: null,
    isPredictionSuccess:false,
    resetPrediction: () => set({
    prediction: null,
    isPredictionLoading: false,
    isPredictionError: null,
    isPredictionSuccess: false,
  }),

    predictDisease:async({image,userId})=>{
        set({ isPredictionLoading: true ,prediction:null,  isPredictionSuccess:false });
        try{
            const response=await axios.post('/detect/predict', { image, userId });
            console.log(response)
            set({ prediction: response.data.data, isPredictionLoading: false, isPredictionSuccess: true });
            toast.success("Prediction successful");
        }catch(error){
            set({ isPredictionError: error, isPredictionLoading: false, isPredictionSuccess: false });
            toast.error(error?.response?.data?.message || "Prediction failed");
        }
    }
}));


