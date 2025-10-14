
import React from 'react';
import { FaArrowRight, FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import { dummyShowsData } from '../assets/assets';
import MovieCard from './MovieCard';

const FeaturedSection = () => {
    const navigate = useNavigate();
    
    return (
        <section className="relative py-10 lg:py-10 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 lg:mb-16'>
                    <div className='flex items-center gap-4 mb-6 lg:mb-0'>
                        {/* Premium Badge */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                                <FaFire className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                 <BlurCircle top='-5' right='-70px' />

                                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                                    Now Showing
                                </h2>
                                <p className="text-gray-400 text-sm lg:text-base mt-2">
                                    Latest blockbusters in theaters
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* View All Button */}
                    <button 
                        onClick={() => navigate('/movies')}
                        className="group relative bg-gradient-to-r from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-800 border border-gray-700 hover:border-red-500 text-white font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/30 cursor-pointer flex items-center gap-3"
                    >
                        <span className="text-sm lg:text-base">View All Movies</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
                    {dummyShowsData.slice(0, 8).map((show) => (
                        <MovieCard key={show._id} movie={show} />
                    ))}
                </div>

                {/* Show More Button */}
                <div className="text-center">
                    <button 
                        onClick={() => navigate('/movies')}
                        className="group relative bg-transparent hover:bg-red-600 text-white font-medium border-2 border-red-600 hover:border-red-700 px-8 lg:px-12 py-3 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-3 mx-auto shadow-lg hover:shadow-red-600/20"
                    >
                        <span className="text-base lg:text-lg">Show More Movies</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </section>
    );
};

export default FeaturedSection;