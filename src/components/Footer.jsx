import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaPlayCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import { images } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Link to='/' className=" p-2 rounded-lg">
                <img src={images.logo} alt="" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience the magic of cinema with the latest blockbusters, exclusive content, and premium streaming quality. Your ultimate movie destination.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                { icon: FaTwitter, color: 'hover:bg-blue-400' },
                { icon: FaInstagram, color: 'hover:bg-pink-600' },
                { icon: FaYoutube, color: 'hover:bg-red-600' },
                { icon: SiImdb, color: 'hover:bg-yellow-500' }
              ].map((SocialIcon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-gray-800 hover:bg-red-600 ${SocialIcon.color} rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 group`}
                >
                  <SocialIcon.icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
         <div className='flex justify-start md:justify-center items-center '>
             <div className="lg:col-span-1  ">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span>Quick Links</span>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {['Now Showing', 'Coming Soon', 'Special Screenings', 'IMAX Experience', '4DX Theaters'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 text-red-600 transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         </div>

         

          {/* Contact Info */}
        <div className='flex justify-start md:justify-center items-center '>
              <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span>Contact Us</span>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-400 text-sm">
                  123 Cinema Street<br />
                  Movie City, MC 12345
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-400 text-sm">support@cinemax.com</p>
              </div>
            </div>

     
          </div>

        </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © {new Date().getFullYear()} CineMax. All rights reserved. | Premium Movie Experience
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-red-600/10 rounded-full blur-xl"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-red-600/5 rounded-full blur-lg"></div>
    </footer>
  );
};

export default Footer;