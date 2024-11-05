"use client"
import ArrowLeft from "@/Icons/ArrowLeft";
import ArrowRight from "@/Icons/ArrowRight";
import CompressArrows from "@/Icons/CompressArrows";
import ExpandArrows from "@/Icons/ExpandArrows";
import MinusIcon from "@/Icons/MinusIcon";
import PlusIcon from "@/Icons/PlusIcon";
import React, { useState } from "react";
// import { FaArrowLeft, FaArrowRight, FaExpandArrowsAlt, FaCompressArrowsAlt, FaPlus, FaMinus } from "react-icons/fa";

const PropertyDetailView = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };
  const propertyData = {
    title: "Luxurious Beachfront Villa",
    price: "$2,500,000",
    description: "Experience the epitome of luxury living in this stunning beachfront villa. Boasting panoramic ocean views and exquisite design, this property offers the perfect blend of comfort and sophistication.",
    photos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    virtualTour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { title: "Bedrooms", value: "5", description: "Spacious bedrooms with en-suite bathrooms" },
      { title: "Bathrooms", value: "6", description: "Luxurious bathrooms with high-end fixtures" },
      { title: "Square Feet", value: "5,000", description: "Generous living space with open floor plan" },
      { title: "Garage", value: "3 cars", description: "Ample parking space with electric car charging" },
      { title: "Pool", value: "Yes", description: "Infinity pool overlooking the ocean" },
      { title: "Year Built", value: "2022", description: "Modern construction with state-of-the-art amenities" }
    ]
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? propertyData.photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === propertyData.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };



  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-10  py-12">
     <div className="flex items-start justify-between">
        <div>
        <h1 className="text-4xl font-bold mb-4">{propertyData.title}</h1>
      <p className="text-2xl font-semibold text-primary mb-6">{propertyData.price}</p>

        </div>
        <div className="hidden sm:block">
        <button className="px-8 py-2.5 bg-black text-lg text-white font-semibold  rounded-lg">Book</button>
        </div>
     </div>
      {/* Photo Gallery */}
      <div className="relative mb-8">
        <img
          src={propertyData.photos[currentPhotoIndex]}
          alt={`Property photo ${currentPhotoIndex + 1}`}
          className={`w-full h-[600px] object-cover rounded-lg ${isFullScreen ? 'fixed inset-0 z-40' : ''}`}
        />
        <button
          className="absolute top-4 right-4 bg-white z-50 p-2 rounded-full shadow-md"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <CompressArrows /> : <ExpandArrows />}
        </button>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={handlePrevPhoto}
        >
          <ArrowLeft />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
onClick={handleNextPhoto}
        >
          <ArrowRight />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
          {currentPhotoIndex + 1} / {propertyData.photos.length}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p
        className={`text-gray-700 ${expanded ? '' : 'line-clamp-2'}`}
      >
        {propertyData.description}
      </p>
      {propertyData.description.length > 50 && (
        <button
          className="text-blue-600 hover:underline mt-2"
          onClick={toggleDescription}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
      </div>

      {/* Floor Plan */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Floor Plan</h2>
        <div className="relative">
          <img
            src={propertyData.floorPlan}
            alt="Floor Plan"
            className="w-full h-auto rounded-lg"
            style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: 'top left' 
              }}
              
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="bg-white p-2 rounded-full shadow-md"
              onClick={handleZoomIn}
            >
              <PlusIcon />
            </button>
            <button
              className="bg-white p-2 rounded-full shadow-md"
              onClick={handleZoomOut}
            >
              <MinusIcon />
            </button>
          </div>
        </div>
      </div> */}

      {/* Virtual Tour */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Virtual Tour</h2>
        <div className="aspect-w-16 aspect-h-9 h-96">
          <iframe
            src={propertyData.virtualTour}
            title="Virtual Tour"
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Property Features */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyData.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-2xl font-bold text-primary mb-2">{feature.value}</p>
              <p
                className={`text-gray-700 ${expandedFeatures.includes(index) ? '' : 'line-clamp-2'}`}
              >
                {feature.description}
              </p>
              {feature.description.length > 100 && (
                <button
                  className="text-blue-600 hover:underline mt-2"
                  onClick={() => toggleFeatureExpansion(index)}
                >
                  {expandedFeatures.includes(index) ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;