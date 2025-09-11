
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageBreadcrumb from './PageBreadCrumb';
import usePreviewImage from '../../Hooks/usePreviewImage';
import { Loader, X } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import {toast} from 'react-hot-toast';

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StethoscopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125h-7.5c-.621 0-1.125.504-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125zM10.875 8.625l.472.355a.75.75 0 001.006-.044l.472-.66a.75.75 0 00-.502-1.21_L_10.875 7.5v1.125zM10.875 12l.472.355a.75.75 0 001.006-.044l.472-.66a.75.75 0 00-.502-1.21_L_10.875 11.25v.75zM10.875 15.375l.472.355a.75.75 0 001.006-.044l.472-.66a.75.75 0 00-.502-1.21_L_10.875 14.625v.75z" />
    </svg>
);


const AddCatalog = () => {
  const { t } = useTranslation('addCatalog');
  const {addCatalog,isCatalogAdding,getUpdateCatalog,setUpdateCatalog,isCatalogEditing,isCatalogUpdating,editCatalog} = useCatalogStore();
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [currentDisease, setCurrentDisease] = useState('');

  useEffect(()=>{
     if(isCatalogEditing && getUpdateCatalog) {
         setPlantName(getUpdateCatalog.plantName);
         setDescription(getUpdateCatalog.description);
         setDiseases(getUpdateCatalog.diseases);
         setImageUrl(getUpdateCatalog.image);
     }
  },[isCatalogEditing,getUpdateCatalog])

  const {imageUrl,handlePreviewImage,setImageUrl}=usePreviewImage();

  const handleAddDisease = () => {
    const trimmedDisease = currentDisease.trim();
    if (trimmedDisease && !diseases.includes(trimmedDisease)) {
      setDiseases([...diseases, trimmedDisease]);
      setCurrentDisease('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDisease();
    }
  };

  const handleRemoveDisease = (diseaseToRemove) => {
    setDiseases(diseases.filter(disease => disease !== diseaseToRemove));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   const response= await addCatalog({ plantName, image: imageUrl, description, diseases });
   if(response?.status === 201) {
      toast.success(t('addCatalog.success'));
      setPlantName('');
      setDescription('');
      setDiseases([]);
      setImageUrl(null);
   }else{
       toast.error(response?.response?.data?.message || t('addCatalog.error'));
   }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await editCatalog(getUpdateCatalog._id, { plantName, image: imageUrl, description, diseases });
    if (response?.status === 200) {
      toast.success(t('addCatalog.updateSuccess'));
      setPlantName('');
      setDescription('');
      setDiseases([]);
      setImageUrl(null);
      setUpdateCatalog({});
    } else {
      toast.error(response?.response?.data?.message || t('addCatalog.updateError'));
    }
  };

  return (
    <div className='w-full'>
        <PageBreadcrumb pageTitle={t('addCatalog.breadcrumb')} />
      <div className=" min-h-screen p-4 sm:p-4 lg:p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">
            {t('addCatalog.header')}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('addCatalog.subheader')}
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="plantName" className="text-sm font-bold text-gray-700 block mb-2">{t('addCatalog.plantNameLabel')}</label>
            <input type="text" id="plantName" value={plantName} onChange={(e) => setPlantName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" placeholder={t('addCatalog.plantNamePlaceholder')} required />
          </div>
          <div>
            <label htmlFor="imageUpload" className="text-sm font-bold text-gray-700 block mb-2">{t('addCatalog.imageLabel')}</label>
            <input type="file" id="imageUpload" accept="image/*" onChange={handlePreviewImage} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" required />
            {imageUrl && (<div className="mt-4 relative"><X size={24} onClick={() => setImageUrl(null)} className='cursor-pointer absolute right-2 top-2 text-white' /><img src={imageUrl} alt={t('addCatalog.imagePreviewAlt')} className="w-full h-auto object-cover rounded-lg shadow-md" /></div>)}
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-bold text-gray-700 block mb-2">{t('addCatalog.descriptionLabel')}</label>
            <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" placeholder={t('addCatalog.descriptionPlaceholder')} required/>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
                <StethoscopeIcon />
                <h3 className="text-lg font-bold text-gray-800">{t('addCatalog.commonDiseases')}</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
              <input
                type="text"
                value={currentDisease}
                onChange={(e) => setCurrentDisease(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder={t('addCatalog.diseaseInputPlaceholder')}
              />
              <button
                type="button"
                onClick={handleAddDisease}
                className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shrink-0"
              >
                {t('addCatalog.addDiseaseBtn')}
              </button>
            </div>
            {diseases?.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
                {diseases?.map((disease, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    <span>{disease}</span>
                    <button type="button" onClick={() => handleRemoveDisease(disease)} className="text-blue-500 hover:text-blue-800">
                      <CrossIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isCatalogEditing?(<button type="button" onClick={handleEdit} className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300">
                       {isCatalogUpdating ? (
                        <div className='flex items-center justify-center gap-2'>
                          <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                          <span>{t('addCatalog.updating')}</span>
                        </div>
                      ):t('addCatalog.edit')}
          </button>):( <button type="button" onClick={handleSubmit} className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300">
          {isCatalogAdding ? (
                        <div className='flex items-center justify-center gap-2'>
                          <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                          <span>{t('addCatalog.saving')}</span>
                        </div>
                      ):t('addCatalog.save')} 
          </button> )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCatalog;