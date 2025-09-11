import { Link } from 'react-router-dom'

const FeatureCard = ({ title, description, image, button,link }) => {
  return (
    <div className="w-full px-4 sm:px-6 py-5 bg-[#E8E8E8] rounded-md shadow-lg">
         <div className="w-full  flex flex-col sm:flex-row gap-10 md:gap-20 px-2 md:px-4">
               <div className="flex-shrink-0 w-full sm:w-72 aspect-video rounded-xl overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
               <div className="flex flex-col items-start justify-start gap-4 grow-1">
                 <h1 className="sm:text-3xl text-xl">{title}</h1>
                 <p className="text-sm lg:w-[60%]">{description}</p>
                 <Link to={link} className="px-4 py-2 cursor-pointer bg-gray-900 hover:bg-gray-700 text-white  rounded-lg shadow transition">
                   {button}
                 </Link>
               </div>
         </div>
       </div>
  )
}

export default FeatureCard