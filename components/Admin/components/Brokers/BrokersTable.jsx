"use client";
import React, { useState } from "react";
import EditBrokerModal from "../Modal/EditBrokerModal";
import { BrokerBlockStatus } from "@/app/api/postApi/broker";
import Link from "next/link";
import UserIcon from "@/Icons/UserIcon";
import { toast } from "sonner";
const BrokersTable = ({ user }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user); // Local state for user

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleBlock = async (user) => {
   try {
    setLoading(true);
    const action = user.isBlocked ? "unblock" : "block";
    const res = await BrokerBlockStatus(user._id, action);
    toast.success(res.message)
    
    // Optionally update the user state with the new status
    setCurrentUser((prev) => ({ ...prev, isBlocked: !prev.isBlocked }));
   } catch (error) {
    console.log(error)
    toast.error("failed to update")
   }finally{
    setLoading(false);

   }
  };

  return (
    <>
      {isEditModalOpen && (
        <EditBrokerModal
          users={currentUser} // Pass currentUser to the modal
          onClose={handleCloseModal}
          setCurrentUser={setCurrentUser} // Callback to update user on edit
        />
      )}

      <tr className="hover:bg-gray-100 ">
        <td className="flex items-center p-4 space-x-6 whitespace-nowrap">
          <UserIcon className="w-10 h-10 rounded-full" />
          <div className="text-sm font-normal text-gray-500 ">
            <Link href={`/admin/brokerproperties/${currentUser._id}`}>
              <div className="text-base font-semibold text-gray-900 ">
                {currentUser.name}
              </div>
            </Link>

            <div className="text-sm font-normal text-gray-500 ">
              {currentUser.email}
            </div>
          </div>
        </td>

        <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap ">
          <div className="flex items-center">
            {currentUser.isBlocked ? (
              <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>
            ) : (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
            )}
           {currentUser.isBlocked ? "Blocked" : "Active"}
          </div>
        </td>
        <td className="p-4 space-x-2 whitespace-nowrap">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-primary "
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              ></path>
            </svg>
            Edit broker
          </button>
          <button
            type="button"
            onClick={() => handleBlock(currentUser)} // Use currentUser for blocking
            className="inline-flex items-center justify-center w-20 px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 "
          >
            {currentUser.isBlocked ? "unblock" : "block"}
          </button>
        </td>
      </tr>
      
    </>
  );
};

export default BrokersTable;
