import React from 'react';
import { FaFilm } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
     
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black to-gray-900 border-b border-gray-800/50 backdrop-blur-xl">
  <div className="container mx-auto px-4 sm:px-6 ">
    <div className="flex items-center h-16 lg:h-20 
                    justify-center md:justify-between">
      {/* Logo */}
      <Link to='/' className="flex items-center 
                      justify-center md:justify-start">
       
        <div className="flex flex-col">
          <h1 className="text-xl lg:text-2xl font-bold text-white leading-tight">
            Quick<span className="text-red-600">Show</span>
          </h1>
          <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      </Link>

      {/* Right side - Empty for now but can add notifications/user menu later */}
      <div className="hidden md:block w-6"></div>
    </div>
  </div>

  {/* Subtle bottom shadow */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
</nav>

    );
};

export default AdminNavbar;