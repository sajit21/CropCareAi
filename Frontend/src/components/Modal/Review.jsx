import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReviewStore } from '../../store/useReviewStore';

const diseaseOptions = {
  Tomato: ['Leaf Curl', 'Early Blight', 'Fusarium Wilt'],
  Potato: ['Late Blight', 'Blackleg', 'Common Scab'],
  Lemon: ['Greening', 'Canker', 'Sooty Mold'],
  Apple: ['Apple Scab', 'Powdery Mildew', 'Fire Blight'],
  Rice: ['Blast', 'Brown Spot', 'Sheath Blight'],
};


const Review = ({ setReviewOpen }) => {

  const {isReviewUploading,addReview,isReviewAddedSuccess}=useReviewStore()
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [accuracy,setAccuracy]=useState('');
  const [improvement,setImprovement]=useState('');
  const [actionTook,setActionTook]=useState('')

  
  const handleReview=(e)=>{
    e.preventDefault()
    addReview({selectedPlant,selectedDisease,accuracy,improvement,actionTook})
    setSelectedPlant('');
    setSelectedDisease('');
    setAccuracy('');
    setImprovement('');
    setActionTook('');
  }
  useEffect(()=>{
    if(isReviewAddedSuccess){
      setReviewOpen(false);
    }
  },[isReviewAddedSuccess])


  return createPortal(
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
  <div className="bg-customBackground rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:px-10  sm:py-5 review-dialog relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-green-600 transition"
          onClick={() => setReviewOpen(false)}
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18" />
            <path d="M6 6 18 18" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Leave a Review</h2>
        <p className="text-gray-500 mb-6 text-sm">Your experience matters</p>

        <form onSubmit={handleReview} className="space-y-4">
          {/* Plant Dropdown */}
          <select
            className="w-full px-4 py-3 rounded-xl bg-white transition text-gray-700 font-medium appearance-none shadow-sm outline-none"
            required
            value={selectedPlant}
            onChange={(e) => {
              setSelectedPlant(e.target.value);
              setSelectedDisease('');
            }}
          >
            <option value="" disabled>Select Plant</option>
            {Object.keys(diseaseOptions).map((plant) => (
              <option key={plant} value={plant}>{plant}</option>
            ))}
          </select>

          {/* Disease Dropdown */}
          <select
            className="w-full px-4 py-3 rounded-xl bg-white transition text-gray-700 font-medium appearance-none shadow-sm outline-none"
            required
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            disabled={!selectedPlant}
          >
            <option value="" disabled>Select Disease</option>
            {selectedPlant &&
              diseaseOptions[selectedPlant].map((disease) => (
                <option key={disease} value={disease}>{disease}</option>
              ))}
          </select>

          <input
            className="w-full px-4 py-3 rounded-xl bg-white transition placeholder:text-gray-600 shadow-sm outline-none"
            placeholder="Accuracy of results"
            type="number"
            step="any"
            required
            value={accuracy}
            onChange={(e)=>setAccuracy(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-xl bg-white transition placeholder:text-gray-600 shadow-sm outline-none"
            placeholder="Suggestion for Improvement"
            value={improvement}
             onChange={(e)=>setImprovement(e.target.value)}

          />
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-white transition placeholder:text-gray-600 min-h-[80px] shadow-sm outline-none"
            placeholder="What action you took after the result"
            value={actionTook} 
             onChange={(e)=>setActionTook(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-400 text-white font-bold shadow-lg hover:from-green-600 hover:to-lime-500 transition text-lg tracking-wide"
          >
            {isReviewUploading ? (
						<div className='flex items-center justify-center gap-2'>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							<span>uploading...</span>
						</div>
					):"upload"}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('reviewPortal')
  );
};

export default Review;
