import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const getConfidenceBadge = (score) => {
  if (score > 90) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
  }
  if (score > 70) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  }
  return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
};

const RecentUploads = ({ data  }) => {
  const { t } = useTranslation('recentUploads');
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? data : data?.slice(0, 8);
   console.log(displayedData)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('recentUploads.header')}</h3>
        {data?.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showAll ? t('recentUploads.showLess') : t('recentUploads.seeAll')}
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[3fr_1fr_2fr_2fr_1.5fr_1.5fr] gap-4 px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>{t('recentUploads.user')}</span>
            <span>{t('recentUploads.plantImage')}</span>
            <span>{t('recentUploads.plantName')}</span>
            <span>{t('recentUploads.diseaseDiagnosed')}</span>
            <span className="text-center">{t('recentUploads.confidence')}</span>
            <span className="text-right">{t('recentUploads.date')}</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayedData?.map((upload) => (
              <div
                key={upload?._id}
                className="grid grid-cols-[3fr_1fr_2fr_2fr_1.5fr_1.5fr] gap-4 items-center px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={upload?.user?.Photo || 'https://i.pravatar.cc/150?u=a042581f4e29026712d'}
                    alt={upload?.user?.Fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900 dark:text-white truncate">{upload?.user?.Fullname}</span>
                </div>
                <div className="flex justify-center">
                   <img
                    src={upload?.imageUrl}
                    alt={t('recentUploads.plantImageAlt')}
                    className="w-16 h-12 object-cover rounded-md"
                   />
                </div>
                <span className="text-gray-700 dark:text-gray-300 truncate">{upload?.disease?.split('-')[0]}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{upload?.disease}</span>
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getConfidenceBadge(upload?.confidence)}`}>
                    {(upload?.confidence * 100).toFixed(2)}%
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-right truncate">{upload?.uploadedAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUploads;