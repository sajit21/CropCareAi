import  { useState } from 'react'
import toast from 'react-hot-toast';
import { usePredictStore } from '../store/usePredictStore';

const usePreviewImage = () => {
    const resetPrediction=usePredictStore((state)=>state.resetPrediction)
      const [imageUrl,setImageUrl]=useState(null);

      const handlePreviewImage=(e)=>{
        let file;
        if(e.dataTransfer && e.dataTransfer.files){
            file=e.dataTransfer.files[0];
        }
        else{
            file=e.target.files[0];
        }
        if(file && file.type.startsWith("image/")){
            const reader=new FileReader();
            
            reader.onloadend=()=>{
                setImageUrl(reader.result)
            }
            reader.readAsDataURL(file);
            resetPrediction();
        }
        else{
            toast.error("Invalid file type");
            setImageUrl(null);
            resetPrediction();
        }
        
      }

      return {imageUrl,handlePreviewImage,setImageUrl}
}

export default usePreviewImage