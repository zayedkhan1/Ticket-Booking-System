import React from 'react';
import bgImg from '../assets/images/backgroundImage.png';
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import marvelLogo from '../assets/images/marvelLogo.svg'

const Hero = () => {
    const navigate = useNavigate();
    
    return (
        <div 
            className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
          
            
            {/* Content Container - Aligned to left */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl lg:max-w-3xl  text-left">
                    
                    {/* Marvel Logo - Left aligned */}
                    <div className="mb-2 sm:mb-2 lg:mb-4 flex justify-start">
                        <img 
                            src={marvelLogo} 
                            alt="marvel logo" 
                            className="w-32 h-auto sm:w-36 lg:w-40"
                        />
                    </div>

                    {/* Main Title - Left aligned */}
                    <h1 className="text-4xl sm:text-4xl lg:text-6xl xl:text-6xl font-bold text-white mb-2 sm:mb-2 leading-tight">
                        Guardians <br /> 
                        <span className="text-red-600">of the Galaxy</span>
                    </h1>

                    {/* Movie Details - Left aligned */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 text-white">
                        {/* Genre */}
                        <span className="text-lg sm:text-medium font-medium">
                            Action | Adventure | Sci-Fi
                        </span>
                        
                        {/* Year */}
                        <div className="flex items-center gap-2 text-lg sm:text-xl">
                            <SlCalender className="text-red-600 text-sm" />
                            <span>2018</span>
                        </div>
                        
                        {/* Duration */}
                        <div className="flex items-center gap-2 text-lg sm:text-xl">
                            <CiClock2 className="text-red-600 text-sm" />
                            <span>2h 1m</span>
                        </div>
                    </div>

                    {/* Description - Left aligned */}
                    <p className="text-gray-300 text-base sm:text-lg lg:text-sm mb-8 sm:mb-8 lg:mb-8 leading-relaxed max-w-xl">
                      Guardians of the Galaxy is a sci-fi action-adventure film about a group of unlikely heroes — Peter Quill, Gamora, Drax, Rocket, and Groot — who team up to stop a powerful villain from destroying the galaxy. 
                    </p>

                    {/* CTA Button - Left aligned */}
                    <button 
                        onClick={() => navigate('/movies')}
                        className="group bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-red-600/30 w-fit"
                    >
                        Explore Movies
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Optional: Decorative element on the right for balance */}
            <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-64 bg-gradient-to-l from-red-600 to-transparent opacity-20"></div>
        </div>
    );
};

export default Hero;