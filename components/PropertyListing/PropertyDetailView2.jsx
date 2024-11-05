"use client";
import ArrowLeft from "@/Icons/ArrowLeft";
import ArrowRight from "@/Icons/ArrowRight";
import ExpandArrows from "@/Icons/ExpandArrows";
import MinusIcon from "@/Icons/MinusIcon";
import PlusIcon from "@/Icons/PlusIcon";
import React, { useState } from "react";
import PropertyInfo from "./PropertyInfo";

const PropertyDetailView2 = ({ propertyData }) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const getVideoIdFromUrl = (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url?.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePhotoNavigation = (direction) => {
    if (direction === "next") {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === propertyData.images.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? propertyData.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleZoom = (direction) => {
    setZoomLevel((prevZoom) =>
      direction === "in" ? prevZoom * 1.2 : prevZoom / 1.2
    );
  };
  const data = {
    type: propertyData?.type || "N/A",
    listingPrice: `$ ${propertyData?.listingPrice}` || "N/A",
    depositAmount: `$ ${propertyData?.listingPrice}`|| "N/A",
    bhk: propertyData?.bhk || "N/A",
    furnishingStatus: propertyData?.furnishingStatus || "N/A",
    ownerAuthorization: propertyData?.ownerAuthorization ? "Yes" : "No" || "N/A",
    street:propertyData?.address.street || "N/A",
    city:propertyData?.address.city || "N/A",
    state:propertyData?.address.state || "N/A",
    zipcode:propertyData?.address.zipCode || "N/A",
    
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 capitalize">{propertyData.title}</h1>

      <div className="flex flex-col  gap-8">
        <div className="">
          <div className="bg-white rounded-lg shadow-lg md:p-6 mb-8">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "photos"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("photos")}
              >
                Photos
              </button>
              {/* <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "floorPlan"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("floorPlan")}
              >
                Floor Plan
              </button> */}
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "virtualTour"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTabChange("virtualTour")}
              >
                Virtual Tour
              </button>
            </div>

            {activeTab === "photos" && (
              <div className="relative">
                <img
                  src={propertyData.images[currentPhotoIndex]}
                  alt={`Property photo ${currentPhotoIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => handlePhotoNavigation("prev")}
                >
                  <ArrowLeft className="text-gray-800" />
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={() => handlePhotoNavigation("next")}
                >
                  <ArrowRight className="text-gray-800" />
                </button>
              </div>
            )}

            {/* {activeTab === "floorPlan" && (
              <div className="relative">
                <img
                  src={propertyData.floorPlan}
                  alt="Floor Plan"
                  className="w-full h-96 object-contain rounded-lg"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    className="bg-white rounded-full p-2 shadow-md"
                    onClick={() => handleZoom("in")}
                  >
                    <PlusIcon className="text-gray-800" />
                  </button>
                  <button
                    className="bg-white rounded-full p-2 shadow-md"
                    onClick={() => handleZoom("out")}
                  >
                    <MinusIcon className="text-gray-800 transform rotate-90" />
                  </button>
                </div>
              </div>
            )} */}

            {activeTab === "virtualTour" && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoIdFromUrl(
                    propertyData.videoTourLink
                  )}`}
                  title="Virtual Tour"
                  className="w-full h-96 rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 text-base">{propertyData.description}</p>
          </div>
        </div>
            <PropertyInfo data={data} />
        <div className="">
          <div className=" mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <ul className="flex  items-center gap-4">
              {propertyData.amenities[0].split(",").map((feature, index) => (
                <li key={index} className="flex items-center text-sm sm:text-base">
                  {/* <span className="text-primary">{feature.icon}</span> */}
                  <span className="border border-neutral-300 rounded-md p-1 px-2 text-neutral-600 capitalize">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={propertyData.images[currentPhotoIndex]}
              alt={`Property photo ${currentPhotoIndex + 1}`}
              className="max-w-full max-h-screen"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setIsLightboxOpen(false)}
            >
              &times;
            </button>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => handlePhotoNavigation("prev")}
            >
              <ArrowLeft className="text-gray-800" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => handlePhotoNavigation("next")}
            >
              <ArrowRight className="text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailView2;
