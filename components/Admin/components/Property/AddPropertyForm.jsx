"use client";
import { addProperty } from "@/app/api/postApi/properties";
import Loader from "@/common/Loader";
import Cancel from "@/Icons/Cancel";
import uploadPic from "@/utils/uploadPicToCloudinary";
import React, { useState } from "react";
import { toast } from "sonner";

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    brokername: "",
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
    images: [],
    videoTourLink: "",
    ownerAuthorization: false,
    legalDisclosures: [],
    specialNotes: "",
  });
  // const [imageFiles, setImageFiles] = useState([]); // To store selected images
  // const [imagePreviews, setImagePreviews] = useState([]); // To store preview URLs
  const [loading, setLoading] = useState(false);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const maxImages = 5;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // if (formData.images.length + files.length > maxImages) {
    //   alert(`You can only upload a maximum of ${maxImages} images.`);
    //   return;
    // }
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const handleImageCancel = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const uploadedImageUrls = [];
      for (let file of formData.images) {
        const url = await uploadPic(file); // Upload each image
        if (url) uploadedImageUrls.push(url);
      }

      await addProperty({
        ...formData,
        images: uploadedImageUrls,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      });
      toast.success("added successfully!");
      setFormData({
        brokername: "",
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
        images: [],
        videoTourLink: "",
        ownerAuthorization: false,
        legalDisclosures: [],
        specialNotes: "",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("failed to add!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Add New Property</h3>
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

              <div className="col-span-6">
                <label
                  htmlFor="images"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Images
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  onChange={handleImageChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
                <div className="flex space-x-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded-md"
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
              className="mt-5 bg-blue-500 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add Property
            </button>
          </form>
        </div>
      </div>

      {loading && <Loader />}
      
    </>
  );
};

export default AddPropertyForm;
