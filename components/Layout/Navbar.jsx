"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev)
  }

  return (
    <div className=" py-2 w-full bg-white">
      <nav className="max-w-6xl mx-auto">
        <div className=" mx-auto flex flex-wrap items-center justify-between px-2 sm:px-10">
          <Link href="/" className="flex -ml-6">
            <Image src="/logo.png" alt="logo" width="500" height="500" className="h-12 w-40 object-cover" />
          </Link>
          <button
            onClick={toggleMenu}
            data-collapse-toggle="mobile-menu"
            type="button"
            className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-2"
            aria-expanded={openMenu}
          >
            <span className="sr-only">Open main menu</span>
            {openMenu ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <div
            className={`${
              openMenu ? 'block' : 'hidden'
            } md:block w-full md:w-auto transition duration-300 ease-in-out`}
            id="mobile-menu"
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="#" className="bg-primary md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-primary md:p-0 rounded focus:outline-none" aria-current="page">
                  Home
                </a>
              </li>
          
              <li>
                <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-primary md:p-0">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-primary md:p-0">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-primary md:p-0">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <Link href={"/find-property"} className="hidden md:block px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg">
            Find your home
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
