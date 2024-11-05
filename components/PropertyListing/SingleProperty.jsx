"use client";
import Link from "next/link";
import React, { useState } from "react";
import DeletePropertyModal from "../Admin/components/Modal/DeletePropertyModal";
import EditPropertyForm from "../Admin/components/Modal/EditPrpertyForm";
import { Toaster } from "sonner";
const SingleProperty = ({ property, broker = false, user }) => {
  console.log(user,"user")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [propertyData, setPropertyData] = useState(property);

  const handleDeleteProperty = () => {
    setShowDeleteModal(true);
  };

  const handleEditProperty = () => {
    setShowEditModal(true);
  };

  // Callback to update property after editing
  const handleUpdateProperty = (updatedProperty) => {
    setPropertyData(updatedProperty);
  };

  // Function to force refresh on delete
  const handleDeleteRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="overflow-hidden transition-all duration-150 ease-out bg-white border border-neutral-50 rounded-lg hover:shadow-xl hover:shadow-gray-200">
        <div className="relative">
          <div className="aspect-[3/2] relative z-auto">
            <div data-rmiz-wrap="visible" className="w-full h-full">
              <span className="absolute inset-0 box-border p-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover overflow-hidden bg-none">
                <img
                  alt="Property Photo"
                  sizes="100vw"
                  src={
                    propertyData?.properties?.images[0] ||
                    "https://greenhome-next.vercel.app/_next/image?url=%2Fphotos%2Fproperty1.jpg&w=3840&q=75"
                  }
                  className="absolute inset-0 box-border p-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover"
                />
              </span>
              <button aria-label="Zoom image" data-rmiz-btn-open="true"></button>
            </div>
          </div>
          <div className="absolute inset-0">
            <div className="flex flex-col justify-between h-full px-5 py-5 bg-gradient-to-t from-transparent-5 to-transparent">
             {user && <div className="flex items-center justify-between flex-wrap">
                <button
                  onClick={handleEditProperty}
                  className="px-3 py-1 text-xs font-semibold cursor-pointer tracking-wider text-white uppercase bg-primary hover:bg-primary/80 rounded-full bg-opacity-90"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteProperty}
                  className="px-3 cursor-pointer py-1 text-xs font-semibold tracking-wider text-white uppercase bg-red-500 hover:bg-red-600 rounded-full bg-opacity-90"
                >
                  Delete
                </button>
              </div>}
              <span className="text-2xl font-semibold text-white">
                ${propertyData?.properties?.listingPrice}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="px-5 py-5">
            <h3 className="text-lg font-semibold">{propertyData?.properties?.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{propertyData?.properties?.address?.city}</p>
          </div>
          <div className="flex text-sm border-t border-neutral-300 divide-x divide-neutral-300">
            <div className="flex items-center justify-center flex-1 px-2 py-3 text-gray-500">
              {propertyData?.properties?.bhk}bhk
            </div>
            <div className="flex items-center justify-center flex-1 px-2 py-3 text-gray-500">
              {propertyData?.properties?.furnishingStatus}
            </div>
            <div className="items-center justify-center flex-1 hidden px-2 py-3 text-gray-500 sm:flex">
              {propertyData?.properties?.type}
            </div>
            <div className="flex items-center justify-end flex-1 h-full py-3 pr-4 ">
              <button className="px-3 py-1.5 text-xs font-medium ml-3 text-cyan-500 bg-cyan-100 rounded-full focus:outline-none">
                Details
              </button>
            </div>
          </div>
          <Link className="absolute inset-0" href={`/property/${propertyData?._id}`}>
            <span className="sr-only">Click to open</span>
          </Link>
        </div>
      </div>
      {showDeleteModal && (
        <DeletePropertyModal
          broker={broker}
          propertyId={propertyData?._id}
          setShowDeleteModal={setShowDeleteModal}
          onDelete={handleDeleteRefresh}
        />
      )}
      {showEditModal && (
        <EditPropertyForm
          broker={broker}
          propertyData={propertyData}
          setShowEditModal={setShowEditModal}
          onUpdate={handleUpdateProperty}
        />
      )}
    </>
  );
};

export default SingleProperty;
