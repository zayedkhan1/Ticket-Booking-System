import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
import { images } from "../assets/assets";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthProvider";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user,   SignOut}=useContext(AuthContext)
  const handleLogOut=()=>{
      SignOut()
      .then(()=>{
        alert('logout successfully')
      })
      .catch(error=>{
        console.error(error)
      })
      
    }
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full  text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link to='/' className="text-2xl font-bold tracking-wide cursor-pointer">
             <img src={images.logo} alt="" />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 font-medium p-2 rounded-3xl bg-white/30 backdrop-blur-md">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition  ${
                    isActive ? "text-red-400" : "hover:text-red-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] bg-red-400 transition-all duration-300 group-hover:w-full`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Right: Search & Login (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 w-35 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-100"
            />
          </div>

        {
          user? 
             <Link onClick={handleLogOut}  className="flex  items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full  hover:bg-green-500 transition">
                <IoLogOutOutline  className="text-xl" /> Logout
              </Link>
          
          :
          
          <>
          
           <Link to='/login' className="flex items-center gap-2 bg-red-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition">
                <FaUser /> Login
              </Link>
            <Link to='/register' className="flex items-center gap-2 bg-red-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition">
                <FaUser /> Register
              </Link>
          </>
        }
             
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-md px-6 pb-5 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block text-lg transition font-medium ${
                  isActive ? "text-red-400" : "text-white hover:text-red-400"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mt-3">
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 w-full rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800"
              />
            </div>
            <button className="flex items-center justify-center gap-2 w-full bg-red-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition">
              <FaUser /> Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
