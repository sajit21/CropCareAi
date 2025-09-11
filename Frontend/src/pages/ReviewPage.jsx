import { PlusIcon } from 'lucide-react'
import ReviewCard from '../components/ReviewCard'
import { useEffect, useState } from 'react';
import Review from '../components/Modal/review';
import { useReviewStore } from '../store/useReviewStore';
import { useTranslation } from 'react-i18next';

const ReviewPage = () => {
  const { t } = useTranslation('review');
  const {reviews,fetchReviews,getReviewByFilter,isReviewFetching,resetReviewAddedSuccess}=useReviewStore()
  const [reviewOpen,setReviewOpen]=useState(false);
  const [selectedPlant, setSelectedPlant] = useState('');
  const FilterOptions = ['Tomato', 'Potato', 'Lemon', 'Apple', 'Rice'];
  useEffect(()=>{
    if(selectedPlant==="" || selectedPlant===t('review.all_plants')){  
    fetchReviews();
    
  }
  else{
    getReviewByFilter(selectedPlant);
  }
},[fetchReviews,getReviewByFilter,selectedPlant,t])
  return (
    <div className='max-w-screen-2xl mx-auto w-full px-2 md:px-6 lg:px-8 py-10 relative'>
  {/* Centered Heading */}
  <h1 className="text-3xl font-bold text-center mb-4 sm:mb-0">{t('review.user_reviews')}</h1>

  {/* Right-Aligned Dropdown */}
  <div className="flex justify-center sm:justify-end mb-6">
    <select
      name="filter"
      id="filter"
      className="border border-gray-300 rounded-md p-2 px-4"
      value={selectedPlant}
      onChange={(e)=>setSelectedPlant(e.target.value)}
    >
      <option value="">{t('review.all_plants')}</option>
      {FilterOptions.map(plant => (
        <option key={plant} value={plant}>{t(`review.filter_options.${plant}`)}</option>
      ))}
    </select>
</div>


       <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {reviews && reviews?.length>0 ?reviews.map((review) => (
          <ReviewCard key={review?._id}
          reviewId={review?._id}
            userImage={review?.UserId?.Photo}
            userName={review?.UserId?.Fullname}
            plant={review?.PlantName}
            accuracy={review?.Accuracy}
            suggestion={review?.Suggestion}
            action={review?.ActionTook}
            disease={review?.DiseaseName}
          />
        )):<p className='w-full col-start-1 sm:col-start-2 text-center pt-4'>{t('review.no_reviews')}</p>}
       </div>
       <div onClick={()=>{resetReviewAddedSuccess(),setReviewOpen(true)}} className='absolute bottom-5 right-5 border border-green-500 px-2 py-4 cursor-pointer rounded hover:bg-green-500  transition-colors duration-200  flex items-center justify-center group'> <span className='text-green-500 group-hover:text-white'>{t('review.add_review')}</span><PlusIcon className='text-green-500 group-hover:text-white' size={16}/></div>
       {reviewOpen &&<Review setReviewOpen={setReviewOpen} />}
    </div>
  )
}

export default ReviewPage