import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, Loader, Loader2, Trash2 } from 'lucide-react';
import PageBreadcrumb from './PageBreadCrumb';
import { useCatalogStore } from '../../store/useCatalogStore';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';



const Catalog = () => {
  const { t } = useTranslation('admincatalog');
  const {catalog,getCatalog,isCatalogLoading,deleteCatalog,isCatalogDeleting,setUpdateCatalog} = useCatalogStore();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteCatalog(id);
    toast.success(t('admincatalog.deleteSuccess'));
    setDeletingId(null);
  }

  useEffect(()=>{
   getCatalog();
  },[getCatalog])
  if(isCatalogLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );
  }

  return (
    <div className='w-full bg-gray-50 min-h-screen'>
      <PageBreadcrumb pageTitle={t('admincatalog.breadcrumb', 'Plant Catalog')} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          {t('admincatalog.header')}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('admincatalog.subheader', "From lush indoor foliage to vibrant outdoor blooms, discover a collection that brings nature's beauty into your home and garden.")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalog.map((category) => (
            <div 
              key={category._id} 
              className="bg-white relative rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Delete Icon */}
              <button
                onClick={() => handleDelete(category._id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                title="Delete"
              >
               {deletingId === category._id ? (
    <Loader2 className="animate-spin h-5 w-5 mix-blend-difference" />
  ) : (
    <Trash2 size={20} className="mix-blend-difference hover:text-red-500" />
  )}
              </button>
              <button
                onClick={() =>{ setUpdateCatalog(category);navigate('new' )}}
                className="absolute top-3 right-10 text-gray-400 hover:text-red-500 transition"
                title="Edit"
              >
    <Edit2 size={20} className="mix-blend-difference hover:text-red-500" />
              </button>

              <div className="w-full h-56">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  {category.description}
                </p>

                <Link
                  to={`/catalog`}
                  className="mt-auto self-start inline-block bg-green-600 text-white font-bold py-2 px-5 rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  {t('admincatalog.exploreBtn', 'Explore Collection')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
