import { Trash } from "lucide-react";
import { formatMongoDate } from "../lib/DateFormat";
import { useHistoryStore } from "../store/useHistoryStore";

const HistoryCard = ({
  _id,
  imageUrl,
  altText = "Diseased plant leaf", 
  uploadedAt,
  disease,
  remedy
}) => {
  const {deleteHistory,isHistoryDeleting}= useHistoryStore()
  return (
    <div className='w-full p-1 sm:p-4 '> 
      <div className="bg-green-50 md:relative rounded-xl p-4 sm:p-6 shadow-lg flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        {/* Image  section part */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-48 md:h-auto md:max-h-60 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text info Section part */}
        <div className="relative md:static flex-grow space-y-2 md:space-y-3 text-gray-700">
          <div className='flex items-start justify-start gap-2'>
            <span className="font-semibold text-gray-800">Date: </span>
            <span>{formatMongoDate(uploadedAt)}</span>
          </div>
          <div className='flex items-start justify-start gap-2'>
            <span className="font-semibold text-gray-800">Plant: </span>
            <span>{"tomato"}</span>
          </div>
          <div className='flex items-start justify-start gap-2'>
            <span className="font-semibold text-gray-800">Disease: </span>
            <span>{disease}</span>
          </div>
          <div className='flex items-start justify-start gap-2'>
            <span className="font-semibold text-gray-800 block mb-1">Remedy:</span>
            <p className="text-sm leading-relaxed ">
              {remedy}
            </p>
          </div>
            <button title="delete" className="absolute cursor-pointer right-2 top-0 md:right-5 md:top-5 z-10 text-red-500 hover:text-red-700">
      <Trash className="w-5 h-5" onClick={()=>{deleteHistory(_id)}} />
    </button>
        </div>
    
      </div>
    </div>
  );
};

export default HistoryCard;