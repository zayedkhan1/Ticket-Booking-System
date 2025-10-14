
import React, { useState } from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { FaFilter, FaSort, FaSearch, FaFire, FaFilm } from 'react-icons/fa';

const Movies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [selectedGenre, setSelectedGenre] = useState('all');

    // Extract unique genres
    const genres = ['all', ...new Set(dummyShowsData.flatMap(movie => 
        movie.genres?.map(genre => genre.name) || []
    ))];

    // Filter and sort movies
    const filteredMovies = dummyShowsData
        .filter(movie => 
            movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedGenre === 'all' || movie.genres?.some(genre => genre.name === selectedGenre))
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.release_date) - new Date(a.release_date);
                case 'rating':
                    return b.vote_average - a.vote_average;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 lg:py-28 overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            <BlurCircle bottom="20%" left="30%" color="red" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaFire className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                            Now Showing
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto">
                        Discover the latest blockbusters and cinematic masterpieces in theaters near you
                    </p>
                </div>

                {/* Controls Section */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8 lg:mb-12">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        {/* Filters and Sort */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Genre Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaFilter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                                >
                                    {genres.map(genre => (
                                        <option key={genre} value={genre} className="bg-gray-800">
                                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort By */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSort className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                                >
                                    <option value="latest" className="bg-gray-800">Latest</option>
                                    <option value="rating" className="bg-gray-800">Top Rated</option>
                                    <option value="title" className="bg-gray-800">A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {searchTerm && (
                            <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30">
                                Search: "{searchTerm}"
                                <button onClick={() => setSearchTerm('')} className="hover:text-red-300">×</button>
                            </span>
                        )}
                        {selectedGenre !== 'all' && (
                            <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30">
                                Genre: {selectedGenre}
                                <button onClick={() => setSelectedGenre('all')} className="hover:text-red-300">×</button>
                            </span>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400">
                        Showing <span className="text-red-500 font-semibold">{filteredMovies.length}</span> of{' '}
                        <span className="text-white font-semibold">{dummyShowsData.length}</span> movies
                    </p>
                    <div className="flex items-center gap-2 text-gray-400">
                        <FaFilm className="w-4 h-4" />
                        <span className="text-sm">Premium Collection</span>
                    </div>
                </div>

                {/* Movies Grid */}
                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {filteredMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    /* No Results State */
                    <div className="text-center py-16 lg:py-24">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                No Movies Found
                            </h2>
                            <p className="text-gray-400 text-lg mb-6">
                                We couldn't find any movies matching your criteria. Try adjusting your search or filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedGenre('all');
                                    setSortBy('latest');
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Load More Section (if needed) */}
                {filteredMovies.length > 0 && filteredMovies.length < dummyShowsData.length && (
                    <div className="text-center mt-12 lg:mt-16">
                        <button className="bg-transparent hover:bg-red-600 text-white font-semibold border-2 border-red-600 hover:border-red-700 py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                            Load More Movies
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Movies;