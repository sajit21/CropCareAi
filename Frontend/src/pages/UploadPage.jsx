import React, { useEffect, useRef, useState } from 'react';
import usePreviewImage from '../Hooks/usePreviewImage';
import { Camera, Loader, Star, X } from 'lucide-react';
import { usePredictStore } from '../store/usePredictStore';
import { useUserStore } from '../store/useUserStore';
import TypingEffect from '../components/TypingEffect';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GuidelinesModal from '../components/GuidelinesModal';

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11z" transform="translate(0 -3)" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l-2.5 2.5M12 8l2.5 2.5" transform="translate(0 -3)" />
    <circle cx="12" cy="12" r="3.5" fill="#FF6B6B" opacity="0.3" transform="translate(0 -3)" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5v3" stroke="#FF6B6B" strokeWidth="1.5" transform="translate(0 -3)" />
  </svg>
);


const FileTypeIcon = ({ type, colorClass }) => {
  let icon;
  switch (type.toLowerCase()) {
    case 'jpeg':
    case 'png':
    case 'gif':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 sm:h-8 sm:w-8 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
      break;
    case 'pdf':
    case 'doc':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 sm:h-8 sm:w-8 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-6 4h6m2-8H9" />
        </svg>
      );
      break;
    default:
      icon = <div className={`h-6 w-6 sm:h-8 sm:w-8 border-2 ${colorClass.replace('text-', 'border-')} rounded`} />;
  }





  return (
    <div className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-md w-16 h-16 sm:w-20 sm:h-20 bg-opacity-20 ${colorClass.replace('text-', 'bg-').replace('-500', '-100').replace('-600', '-100')}`}>
      {icon}
      <span className={`mt-1 text-xs sm:text-sm font-medium ${colorClass}`}>{type.toUpperCase()}</span>
    </div>
  );
};


const DecorativeLine = ({ color = 'orange-400' }) => (
  <span className={`hidden sm:inline-block text-xs tracking-widest text-${color}`}>···</span>
);

const DecorativeThickLine = ({ color = 'orange-400' }) => (
  <span className={`hidden sm:inline-block text-xs font-bold px-1 text-${color}`}>===</span>
);

const UploadPage = () => {
  const { t } = useTranslation('upload');
  const { predictDisease, prediction, isPredictionLoading, isPredictionSuccess, isPredictionError } = usePredictStore()
  const user = useUserStore((state) => state.user)
  console.log(user)
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { imageUrl, handlePreviewImage, setImageUrl } = usePreviewImage();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };


  const handleScrollIntoResult = () => {
    const resultElement = document.getElementById('result-section');
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handlePreviewImage(e);
  };



  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };


  const handleSaveFiles = () => {
    predictDisease({ image: imageUrl, userId: user?._id })
  };

  const fileTypes = [
    { name: 'JPEG', colorClass: 'text-orange-500' },
    { name: 'PNG', colorClass: 'text-yellow-500' },
  ];
  const [isPhotoGuidelinesOpen, setIsPhotoGuidelinesOpen] = useState(false);

  console.log(isPredictionSuccess)
  console.log(prediction)

  return (
    <div className='max-w-screen-2xl mx-auto px-4 py-6 lg:py-8 w-full'>
      <div className="text-center flex flex-col items-center gap-1 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 ">Photo Guidelines for Best Results</h2>
        <p className="text-slate-600 mt-2">Follow these tips to improve prediction accuracy.</p>
        <button className='bg-green-500 hover:bg-green-700 transition-colors duration-500 flex gap-2 items-center text-white px-4  py-2 rounded-md' onClick={() => setIsPhotoGuidelinesOpen(true)}>View Guidelines <Camera size={20} /></button>
      </div>
      {isPhotoGuidelinesOpen ? <GuidelinesModal closeModal={() => setIsPhotoGuidelinesOpen(false)} /> : null}
      <div className='w-full flex  items-center justify-center'>
        <div className="bg- rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl relative font-sans">

          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="absolute top-2 right-7 w-1 h-1 bg-red-400 rounded-full opacity-70"></div>
            <div className="absolute top-3 right-8 w-0.5 h-0.5 bg-red-400 rounded-full opacity-70"></div>
            <div className="absolute top-7 right-2 w-1 h-1 bg-red-400 rounded-full opacity-70"></div>
            <div className="absolute top-8 right-3 w-0.5 h-0.5 bg-red-400 rounded-full opacity-70"></div>
          </div>


          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center">
              <DecorativeLine color="orange-400" />
              <DecorativeThickLine color="orange-400" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-500 px-2 sm:px-3">
                {t('upload.title')}
              </h1>
              <DecorativeThickLine color="orange-400" />
              <DecorativeLine color="orange-400" />
            </div>
          </div>

          {/* Drag and Drop Area */}
          {imageUrl ? (<div className='w-full h-auto sm:h-auto rounded-xl overflow-hidden relative '>
            <X className='absolute top-2 right-2 cursor-pointer text-white mix-blend-difference' onClick={() => setImageUrl(null)} />
            <img src={imageUrl} alt="postImage" className='w-full h-full object-cover' />
          </div>) : (<div
            className={` border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors duration-200 ease-in-out
                      ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePreviewImage}
              className="hidden"
              multiple // Allow multiple file selection
            />
            <div className="flex flex-col items-center justify-center">
              <UploadIcon />
              <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-1">{t('upload.drag_drop')}</p>
              <p className="text-sm sm:text-base text-gray-500 mb-4">
                {t('upload.your_files_here')} <span
                  className="text-orange-500 font-medium cursor-pointer hover:underline"
                  onClick={triggerFileSelect}
                >
                  {t('upload.click_browse')}
                </span> {t('upload.to_upload')}
              </p>
            </div>
            <p className="text-sm sm:text-base text-blue-600 font-medium mb-4">
              {t('upload.accept_formats')}
            </p>

            {/* File Type Icons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
              {fileTypes.map((fileType) => (
                <FileTypeIcon key={fileType.name} type={fileType.name} colorClass={fileType.colorClass} />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              {t('upload.max_size')} <a href="#" className="text-orange-500 font-medium hover:underline">{t('upload.click_here')}</a>.
            </p>
          </div>)}


          {/* predict Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="flex items-center justify-center">
              <DecorativeLine color="blue-400" />
              <DecorativeThickLine color="blue-400" />
              <button
                onClick={() => {
                  handleSaveFiles();
                  if (imageUrl) {
                    handleScrollIntoResult();
                  }
                }}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg flex items-center "
              >
                {isPredictionLoading && imageUrl ? (
                  <>
                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                    <span>{t('upload.predicting')}</span>
                  </>
                ) : t('upload.predict')}
              </button>
              <DecorativeThickLine color="blue-400" />
              <DecorativeLine color="blue-400" />
            </div>
          </div>
        </div>


      </div>
      <div className={`${isPredictionLoading && imageUrl ? 'h-auto' : 'h-0 overflow-hidden'}w-full pt-5 lg:pt-10 flex justify-center`} id='result-section'>
        <div className="max-w-xl grow-1 flex items-start justify-center flex-col animate-pulse">
          {/* <div className="bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer"></div> */}
          {/* <div className="bg-gray-700 rounded-md w-full h-96 mb-4 shimmer"></div> */}
          <div className="bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer"></div>
          <div className="bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer"></div>
          {/* <div className="bg-gray-700 rounded-md w-full h-24 shimmer"></div> */}
        </div>
      </div>
      {isPredictionError && imageUrl && (
        <div className='w-full flex max-w-4xl  justify-center pb-10 shadow-lg mx-auto' id='result-section'>
          <div className="max-w-xl grow-1 flex items-start justify-center flex-col ">
            <div><span className="text-gray-700 font-light"><span className="text-red-700 font-bold">{'Error:'}</span> <TypingEffect text={'Uploaded image is not a leaf. Please upload a clear leaf image.'} /></span></div>
          </div>
          <div className="flex justify-center items-center bg-gray-100">
            <Link
              to={'/review'}
              className="relative flex items-center cursor-pointer px-8 py-3 bg-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <Star className="mr-2" size={20} />
              {t('upload.review')}
              <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-50 transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      )}
      {isPredictionSuccess && !isPredictionLoading && imageUrl && (
        <div className='w-full flex max-w-4xl justify-center pb-10 shadow-lg mx-auto' id='result-section'>
          <div className="max-w-xl grow-1 flex items-start justify-center flex-col gap-2 ">
            <div><span className="text-gray-700 font-light"><span className="text-gray-700 font-semibold">{t('upload.disease')}</span> <TypingEffect text={prediction.disease} /></span></div>
            <div>
              <span className="text-gray-700 font-light">
                <span className="text-gray-700 font-semibold">Confidence Score:</span>{' '}
                {(prediction.confidence * 100).toFixed(2)}%
              </span>
            </div>
            <div><span className="text-gray-700 font-light"><span className="text-gray-700 font-semibold">{t('upload.remedy')}</span> <TypingEffect text={prediction.remedy} /></span></div>
            {prediction.remedyUrl.length > 0 && (
              <div className='pt-5 flex flex-col gap-4 items-start justify-start'>
                <h1 className='text-green-500 text-2xl'>For More Information visit below Links</h1>
                {prediction.remedyUrl.map((link, index) => (
                  <div key={index} className='text-blue-500'>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            )}

          </div>
          <div className="flex justify-center items-center bg-gray-100">
            {user && <Link
              to={'/review'}
              className="relative flex items-center cursor-pointer px-8 py-3 bg-blue-500 text-white font-semibold text-lg rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <Star className="mr-2" size={20} />
              {t('upload.review')}
              <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-50 transition-all duration-300"></span>
            </Link>}

          </div>

        </div>
      )}
    </div>
  );
};

export default UploadPage;