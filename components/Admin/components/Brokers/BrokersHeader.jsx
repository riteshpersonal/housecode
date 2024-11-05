import Search from '@/components/Ui/Search'
import React from 'react'

const BrokersHeader = ({onAddUserClick,onClose}) => {
  return (
    <div className="p-4 block sm:flex items-center justify-between border-b border-gray-200  ">
    <div className="w-full mb-1">
      <div className="mb-4">
       
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
          All Brokers
        </h1>
      </div>
      <div className="sm:flex">
        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 ">
          <div className="lg:pr-3" action="#" method="GET">
            <label htmlFor="users-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 lg:w-64 xl:w-96">
             <Search/>
            </div>
          </div>
        
        </div>
        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
          <button
            type="button"
           onClick={onAddUserClick}
            className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto "
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add broker
          </button>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default BrokersHeader