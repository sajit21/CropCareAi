import PageBreadcrumb from './PageBreadCrumb'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import ReviewCard from '../../components/ReviewCard';
import { useTranslation } from 'react-i18next';
import { useReviewStore } from '../../store/useReviewStore';

const ReviewAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
  

    const { t } = useTranslation('review');
      const {reviews,fetchReviews,getReviewByFilter,getReviewByName,isReviewFetching,resetReviewAddedSuccess}=useReviewStore()
      const [selectedPlant, setSelectedPlant] = useState('');

      useEffect(()=>{
        if(selectedPlant==="" || selectedPlant===t('review.all_plants')){  
        fetchReviews();
      }
      else{
        getReviewByFilter(selectedPlant);
        setIsFilterOpen(false);
      }
    },[fetchReviews,getReviewByFilter,selectedPlant,t])


     useEffect(() => {
        if (searchTerm.trim() !== '') {
          getReviewByName(searchTerm);
        }
        if(searchTerm.trim() === ''){
          fetchReviews();
        }
      }, [searchTerm]);
    

     useEffect(() => {
        const handleClickOutside = (event) => {
          if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
  return (
    <div>
      <PageBreadcrumb pageTitle={t('review.breadcrumb')} />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full md:flex-grow">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative w-full md:w-auto" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 w-full justify-center md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span className="font-semibold text-gray-700 dark:text-gray-200">Filter</span>
          </button>
          {isFilterOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-4 z-20 border dark:border-gray-600 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plant</label>
                  <select  onChange={(e) => setSelectedPlant(e.target.value)} className="w-full border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="all">All Plants</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Apple">Apple</option>
                    <option value="Lemon">Lemon</option>
                    <option value="Rice">Rice</option>

                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* review data */}
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
    </div>
  )
}

export default ReviewAdmin