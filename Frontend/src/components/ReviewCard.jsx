import { useState } from 'react';
import { useReviewStore } from '../store/useReviewStore';
import { useUserStore } from '../store/useUserStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';


const ReviewCard = ({ userImage,reviewId, userName, plant, accuracy, suggestion, action, disease, onDelete }) => {
  const {user}=useUserStore();
  const {deleteReview}=useReviewStore();
  const [deletingId, setDeletingId] = useState(null);
    const handleDelete = async () => {
      setDeletingId(reviewId);
      await deleteReview(reviewId);
      // toast.success("Review deleted successfully");
      setDeletingId(null);
    }
  return (
    <div className="relative flex items-start gap-[2rem] bg-white rounded-2xl shadow-lg p-5 sm:p-6 w-full max-w-xl mx-auto">
      
      {user?.role === 'admin' && 
      deletingId === reviewId ? (
          <Loader2 className="animate-spin h-5 w-5 mix-blend-difference" />
        ) : 
      user?.role==='admin'?(
        <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        aria-label="Delete review"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
        </svg>
      </button>
      ):null}

      {/* User Image */}
      <div className="flex-shrink-0">
        <img
          src={userImage}
          alt={userName}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-green-200 shadow"
        />
      </div>
      
      {/* Review Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
          <span className="font-semibold text-gray-800 text-base sm:text-lg">{userName}</span>
          <span className="text-xs sm:text-sm text-green-600 bg-green-50 rounded px-2 py-0.5 font-medium">{plant}</span>
        </div>
        {disease && (
          <div className="mb-1">
            <span className="text-sm text-gray-600">Disease: <span className="text-gray-800">{disease}</span></span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm text-gray-500">Accuracy: <span className="font-semibold text-green-700">{accuracy} %</span></span>
        </div>
        {suggestion && (
          <div className="mb-1">
            <span className="text-sm text-gray-600">Suggestion: <span className="text-gray-800">{suggestion}</span></span>
          </div>
        )}
        {action && (
          <div>
            <span className="text-sm text-gray-600">Action Taken: <span className="text-gray-800">{action}</span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;