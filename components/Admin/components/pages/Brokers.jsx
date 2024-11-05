"use client";
import React, { useState } from "react";

import BrokersHeader from "../Brokers/BrokersHeader";

import AddBrokerModal from "../Modal/AddBrokerModal";

const Brokers = () => {
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const handleCloseModal = () => {
    isAddUserModalOpen && setAddUserModalOpen(false);
    isEditModalOpen && setIsEditModalOpen(false);
  };


  return (
    <div>
      <BrokersHeader onAddUserClick={handleOpenAddUserModal} />

    
      {isAddUserModalOpen && (
        <AddBrokerModal onClose={handleCloseModal} />
      )}
    
    </div>
  );
};

export default Brokers;
