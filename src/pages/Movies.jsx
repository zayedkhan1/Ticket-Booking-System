import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';

const Movies = () => {
    return dummyShowsData.length > 0 ? (
        <div className='relative my-40 mb-60 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
            <h1 className='text-lg font-medium my-4'>Now Showing</h1>
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
                {dummyShowsData.map((movie) => (
                   <MovieCard key={movie._id} movie={movie}></MovieCard>
                ))}
            </div>
        </div>
    )
    :
    (
        <div>
            <h2 className='text-center text-3xl font-semibold mt-20'>No Movies Available</h2>
        </div>
    )
};

export default Movies;