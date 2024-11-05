import React from "react";

const Dashboard = () => {
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center p-6 pt-10">
      {/* Header Section */}

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Here&apos;s a quick overview of your account and activities.
      </p>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="flex items-center bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
          <svg
            className="text-blue-500 w-8 h-8 mr-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
          </svg>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
            <p className="text-gray-500">
              Manage your personal information and settings.
            </p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="flex items-center bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
          <svg
            className="text-green-500 w-8 h-8 mr-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 13h4v8H3zm7-5h4v13h-4zm7-6h4v19h-4z" />
          </svg>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Analytics</h2>
            <p className="text-gray-500">
              Manage all your properties at one place.
            </p>
          </div>
        </div>
        {/* Notifications Section */}
        <div className="flex items-center bg-yellow-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
          <svg
            className="text-yellow-500 w-8 h-8 mr-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C7.58 2 4 5.58 4 10v6H2v2h20v-2h-2v-6c0-4.42-3.58-8-8-8zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
          </svg>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Bookings</h2>
            <p className="text-gray-500">
              Stay updated with the latest bookings.
            </p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="flex items-center bg-red-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
          <svg
            className="text-red-500 w-8 h-8 mr-4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.39.11-.6l-1.92-3.32c-.12-.21-.37-.3-.6-.22l-2.39.96a8.038 8.038 0 0 0-1.63-.94l-.36-2.55c-.05-.23-.25-.4-.49-.4h-3.84c-.24 0-.44.17-.49.4l-.36 2.55c-.6.22-1.17.53-1.63.94l-2.39-.96c-.22-.09-.47 0-.6.22l-1.92 3.32c-.12.21-.07.46.11.6l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.39-.11.6l1.92 3.32c.12.21.37.3.6.22l2.39-.96c.46.41 1.02.73 1.63.94l.36 2.55c.05.23.25.4.49.4h3.84c.24 0 .44-.17.49-.4l.36-2.55c.6-.22 1.17-.53 1.63-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32c.12-.21.07-.46-.11-.6l-2.03-1.58zm-7.14 2.56c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
            <p className="text-gray-500">Create and Manage borkers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
