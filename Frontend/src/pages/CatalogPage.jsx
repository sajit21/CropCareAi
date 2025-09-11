import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import PlantCatalogCard from '../components/plantCatalogCard'
import { useCatalogStore } from '../store/useCatalogStore';


const CatalogPage = () => {
  const { t } = useTranslation('catalog');
  const {catalog,isCatalogLoading,getCatalog} = useCatalogStore();
  useEffect(()=>{
    getCatalog()
  },[])

  if(isCatalogLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  // const plantCatalog = [
  //   {
  //     title: t('catalog.tomato_title'),
  //     description: t('catalog.tomato_desc'),
  //     image: "/catalog/tomato.png",
  //     diseases: [
  //       { name: t('catalog.tomato_diseases.Early Blight'), icon: "🌿" },
  //       { name: t('catalog.tomato_diseases.Late Blight'), icon: "🌧️" },
  //       { name: t('catalog.tomato_diseases.Leaf Spot'), icon: "🍃" },
  //       { name: t('catalog.tomato_diseases.Bacterial Wilt'), icon: "🦠" },
  //       { name: t('catalog.tomato_diseases.Mosaic Virus'), icon: "🧬" },
  //     ],
  //   },
  //   {
  //     title: t('catalog.potato_title'),
  //     description: t('catalog.potato_desc'),
  //     image: "/catalog/potato.png",
  //     diseases: [
  //       { name: t('catalog.potato_diseases.Late Blight'), icon: "🌧️" },
  //       { name: t('catalog.potato_diseases.Early Blight'), icon: "🌿" },
  //       { name: t('catalog.potato_diseases.Bacterial Wilt'), icon: "🦠" },
  //       { name: t('catalog.potato_diseases.Black Scurf'), icon: "⚫" },
  //     ],
  //   },
  //   {
  //     title: t('catalog.apple_title'),
  //     description: t('catalog.apple_desc'),
  //     image: "/catalog/apple.png",
  //     diseases: [
  //       { name: t('catalog.apple_diseases.Apple Scab'), icon: "🍏" },
  //       { name: t('catalog.apple_diseases.Powdery Mildew'), icon: "🌫️" },
  //       { name: t('catalog.apple_diseases.Fire Blight'), icon: "🔥" },
  //       { name: t('catalog.apple_diseases.Bitter Rot'), icon: "🍎" },
  //     ],
  //   },
  //   {
  //     title: t('catalog.rice_title'),
  //     description: t('catalog.rice_desc'),
  //     image: "/catalog/rice.png",
  //     diseases: [
  //       { name: t('catalog.rice_diseases.Blast'), icon: "💥" },
  //       { name: t('catalog.rice_diseases.Brown Spot'), icon: "🟤" },
  //       { name: t('catalog.rice_diseases.Bacterial Leaf Blight'), icon: "🦠" },
  //       { name: t('catalog.rice_diseases.Sheath Blight'), icon: "🌾" },
  //     ],
  //   },
  //   {
  //     title: t('catalog.lemon_title'),
  //     description: t('catalog.lemon_desc'),
  //     image: "/catalog/lemon.png",
  //     diseases: [
  //       { name: t('catalog.lemon_diseases.Citrus Canker'), icon: "🍋" },
  //       { name: t('catalog.lemon_diseases.Gummosis'), icon: "💧" },
  //       { name: t('catalog.lemon_diseases.Greening Disease'), icon: "🟢" },
  //       { name: t('catalog.lemon_diseases.Anthracnose'), icon: "⚫" },
  //     ],
  //   },
  // ];
  return (
     <div className="w-full max-w-7xl bg-pink-200 mx-auto bg-customBackground px-4 sm:px-6 lg:px-8">
      <div className='w-full grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10'>
      {catalog?.map((plant) => (
        <PlantCatalogCard key={plant._id} plant={plant} />
      ))}
      </div>
    </div>
    
  )
}

export default CatalogPage