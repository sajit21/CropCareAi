import {  MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";



const PlantCatalogCard = ({plant}) => {
  return (
    <div className=" w-full mx-auto p-4 sm:p-6 bg-white  rounded-xl shadow-lg space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">{plant.plantName}</h1>
        <Link title="Upload Plant Image" to='/upload' className="h-8 bg-customBackground cursor-pointer w-8 rounded-full flex items-center justify-center"><MoveRight  size={20}/></Link></div>

      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-md">
        <img
          src={plant.image} 
          alt={plant.plantName}
          className="h-48 sm:h-64 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Description */}
        <p>
          {plant.description}
        </p>


      {/* Common Diseases */}
      <div className="bg-white rounded-xl p-5  ">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          🩺 Common Diseases
        </h2>
        <div className="flex flex-wrap gap-3">
          {plant?.diseases?.map((disease, index) => (
            <span
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-sm shadow-sm `}
            >   
              {disease}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantCatalogCard;
