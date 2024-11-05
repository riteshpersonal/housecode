"use client";
import { UpdateAdmin } from "@/app/api/postApi/broker";
import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const Profile = ({user}) => {

  const [state, formAction] = useFormState(UpdateAdmin, null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create a FormData object to collect form data
    const formData = new FormData(e.target);
  
    // Call formAction with the formData object
    await formAction(formData);
  
    // Refresh the page after form submission
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 space-y-6 md:px-6 py-6">
      <header className="space-y-1.5">
        <div className="flex items-center space-x-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold">{user.name}</h1>
          </div>
        </div>
      </header>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={name} // Bind to state
                onChange={(e) => setName(e.target.value)} // Update state on change
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={email} // Bind to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="new-password"
                name="new-password"
                placeholder="Enter your new password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="confirm-password"
                placeholder="Confirm your new password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              <label htmlFor="show-password" className="ml-2 text-sm">
                Show Passwords
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Profile;
