
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { timeFormat } from '../libraries/TimeFormate';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-900/20 border border-gray-700 hover:border-red-600/30 w-full max-w-sm mx-auto">
            {/* Image Section */}
            <div 
                onClick={() => navigate(`/movies/${movie._id}`)}
                className="relative overflow-hidden cursor-pointer group"
            >
                <img
                    src={movie?.backdrop_path} 
                    alt={movie?.title} 
                    className='w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500'
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-4 sm:p-5">
                {/* Movie Title */}
                <h3 
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className='font-bold text-white text-lg sm:text-xl mb-2 line-clamp-2 hover:text-red-400 transition-colors duration-200 cursor-pointer'
                >
                    {movie?.title}
                </h3>

                {/* Movie Details */}
                <div className='text-gray-300 text-sm sm:text-base mb-3 space-y-1'>
                    <p className="flex flex-wrap items-center gap-1">
                        <span>{new Date(movie?.release_date).getFullYear()}</span>
                        <span className="text-red-500">•</span>
                        <span className="line-clamp-1">
                            {movie?.genres.slice(0, 2).map(genre => genre.name).join(" | ")}
                        </span>
                        <span className="text-red-500">•</span>
                        <span>{timeFormat(movie?.runtime)}</span>
                    </p>
                </div>

                {/* Action Section */}
                <div className='flex items-center justify-between mt-auto pt-3 border-t border-gray-700'>
                    {/* Buy Tickets Button */}
                    <button
                        onClick={() => navigate(`/movies/${movie._id}`)}
                        className='px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-red-600/30 cursor-pointer'
                    >
                        Buy Tickets
                    </button>
                    
                    {/* Rating */}
                    <div className='flex items-center gap-1.5 text-gray-300'>
                        <CiStar className='w-5 h-5 text-red-500 fill-red-500' />
                        <span className='font-semibold text-white text-sm sm:text-base'>
                            {movie?.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;