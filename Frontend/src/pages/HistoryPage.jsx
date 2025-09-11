import React, { useEffect } from 'react'
import HistoryCard from '../components/HistoryCard';
import { useHistoryStore } from '../store/useHistoryStore';
import { useTranslation } from 'react-i18next';

const HistoryPage = () => {
  const { t } = useTranslation('history');
  const {history,getHistory,isHistoryLoading}=useHistoryStore()

  useEffect(()=>{
    getHistory()
  },[getHistory])
  if(isHistoryLoading){
    return (
       <div className='max-w-screen-2xl mx-auto  gap-4 px-2 md:px-6 lg:px-8 py-10'>
        <h1 className='w-full text-center text-primary text-2xl  lg:text-4xl font-extrabold tracking-wider mb-5'>{t('history.title')}</h1>
        <div className='w-full flex flex-col items-center justify-start gap-4 animate-pulse'>
       {Array.from({length:5},(_,index)=>(
           <div className='w-full  flex  items-center justify-start gap-4 flex-col sm:flex-row '>
        <div className="bg-gray-700 rounded-md w-full sm:w-[40%] h-64 shimmer"></div>
        <div className="bg-gray-700 rounded-md w-full h-64 shimmer"></div>
        </div>
       ))}
       </div>
       </div>
    )  
  }

  return (
    <div className='max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8 py-10 md:py-10'>
        <h1 className='w-full text-center text-primary text-2xl  lg:text-4xl font-extrabold tracking-wider mb-5'>{t('history.title')}</h1>
         <div className='max-w-6xl mx-auto w-full flex flex-col items-center justify-start gap-4 '>
          {history.length>0?history.map((historyItem)=><HistoryCard key={historyItem._id} {...historyItem} />):(
            <div className='w-full text-center min-h-[20vh] text-gray-500'>{t('history.no_history')}</div>
          )}
         </div>
    </div>
  )
}

export default HistoryPage