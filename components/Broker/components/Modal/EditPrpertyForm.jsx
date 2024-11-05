"use client";
import { addProperty, updateProperty } from "@/app/api/postApi/properties";
import Loader from "@/common/Loader";
import Cancel from "@/Icons/Cancel";
import uploadPic from "@/utils/uploadPicToCloudinary";
import React, { useState } from "react";
import { toast } from "sonner";

const EditPropertyForm = ({ propertyData, setShowEditModal }) => {
  const [formData, setFormData] = useState({
    title: propertyData?.properties?.title || "",
    description: propertyData?.properties?.description || "",
    type: propertyData?.properties?.type || "",
    street: propertyData?.properties?.address?.street || "",
    city: propertyData?.properties?.address?.city || "",
    state: propertyData?.properties?.address?.state || "",
    zipCode: propertyData?.properties?.address?.zipCode || "",
    listingPrice: propertyData?.properties?.listingPrice || "",
    depositAmount: propertyData?.properties?.depositAmount || "0",
    bhk: propertyData?.properties?.bhk || "",
    amenities: propertyData?.properties?.amenities || [],
    furnishingStatus: propertyData?.properties?.furnishingStatus || "",
    videoTourLink: propertyData?.properties?.videoTourLink || "",
    ownerAuthorization: propertyData?.properties?.ownerAuthorization || false,
    legalDisclosures: propertyData?.properties?.legalDisclosures || "",
    specialNotes: propertyData?.properties?.specialNotes || "",
  });

  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState(
    propertyData?.properties?.images || []
  );
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    propertyData?.properties?.images || []
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setNewImages([...newImages, ...files]);
  };

  // Cancel image preview
  const handleImageCancel = (index) => {
    if (index < existingImages.length) {
      // Cancel an existing image
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Cancel a new image
      const newImageIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const uploadedImageUrls = [...existingImages]; // Start with existing images

      for (let file of newImages) {
        const url = await uploadPic(file);
        if (url) uploadedImageUrls.push(url);
      }

      await updateProperty(propertyData?._id, {
        ...formData,
        images: uploadedImageUrls,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      });
      toast.success("successfully updated!");
      // Reset form and image states
      setFormData({
        title: "",
        description: "",
        type: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        listingPrice: "",
        depositAmount: "0",
        bhk: "",
        amenities: [],
        furnishingStatus: "",
      });
      setExistingImages([]);
      setNewImages([]);
      setImagePreviews([]);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("error updating");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed left-0 right-0 z-50 flex items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-screen sm:h-full bg-black/60 backdrop-blur-sm"
      id="edit-property-modal"
    >
      <div className="relative bg-white w-full h-[90%] sm:h-4/5 rounded-md overflow-y-scroll shadow max-w-7xl px-4 ">
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-hide="delete-user-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit Property</h3>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Studio">Studio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="bhk"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  BHK
                </label>
                <input
                  type="text"
                  name="bhk"
                  id="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="street"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="zipCode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ZipCode
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="listingPrice"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Listing Price
                </label>
                <input
                  type="text"
                  name="listingPrice"
                  id="listingPrice"
                  value={formData.listingPrice}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="depositAmount"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Deposit Amount
                </label>
                <input
                  type="text"
                  name="depositAmount"
                  id="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="amenities"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Amenities
                </label>
                <input
                  type="text"
                  name="amenities"
                  id="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter amenities separated by commas"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="furnishingStatus"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Furnishing Status
                </label>
                <select
                  name="furnishingStatus"
                  id="furnishingStatus"
                  value={formData.furnishingStatus}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                >
                  <option value="">Select Furnishing</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div className="col-span-6 ">
                <div className="col-span-6">
                  <label
                    htmlFor="images"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Upload Images
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
                {/* Image previews */}
                <div className="col-span-6 flex flex-wrap gap-2">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageCancel(index)}
                        className="absolute top-0 right-0 p-1.5 bg-black/60 text-white rounded-full text-xs"
                      >
                        <Cancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="videoTourLink"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Video Tour Link
                </label>
                <input
                  type="text"
                  name="videoTourLink"
                  id="videoTourLink"
                  value={formData.videoTourLink}
                  onChange={handleChange}
                  placeholder="Enter youtube video link of your property"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  "
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="ownerAuthorization"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Owner Authorization
                </label>
                <input
                  type="checkbox"
                  name="ownerAuthorization"
                  id="ownerAuthorization"
                  checked={formData.ownerAuthorization}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="legalDisclosures"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Legal Disclosures
                </label>
                <textarea
                  name="legalDisclosures"
                  id="legalDisclosures"
                  value={formData.legalDisclosures}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  "
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="specialNotes"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Special Notes
                </label>
                <textarea
                  name="specialNotes"
                  id="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  "
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 bg-primary text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save Property
            </button>
          </form>
        </div>
      </div>

      {loading && <Loader />}
      
    </div>
  );
};

export default EditPropertyForm;
