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
      <div className="flex flex-wrap items-center justify-center gap-6">
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

        
      </div>
    </div>
  );
};

export default Dashboard;
