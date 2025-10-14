import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { FaArrowRight, FaCalendar, FaClock, FaFilm, FaHeart, FaPlayCircle, FaStar, FaTicketAlt, FaUsers } from 'react-icons/fa';
import { timeFormat } from '../libraries/TimeFormate';
import { CiHeart } from 'react-icons/ci';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const MovieDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const navigate = useNavigate();

    const getShow = async () => {

        const show = dummyShowsData.find((show) => show._id == id);
        if(show){
             setShow({
            movie: show,
            dateTime: dummyDateTimeData,
        });
        }
       
    }

    useEffect(() => {
        getShow();
    }, [id]);
    return show ? (
        <div>
            {/* <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
                <img src={show.movie?.poster_path} alt="" />
            
              <div className='relative flex flex-col gap-3'>
                <BlurCircle top='-100px' left='-100px'></BlurCircle>
                <p>ENGLISH</p>
                <h1>{show.movie?.title}</h1>
                 <div>
                      <FaStar className='w-5 h-5 text-red-500 fill-red-500'></FaStar>
                     {show.movie?.vote_average.toFixed(1)} User Rating
                 </div>
                 <p> {show.movie?.overview} </p>
                 <p>
                    {timeFormat(show.movie?.runtime)} . {show.movie?.genres.map(genre=> genre?.name).join(",")} {show.moive?.release_date.split("-")[0]}
                 </p>
                 <div>
                    <button>
                        <FaPlayCircle></FaPlayCircle>
                        Watch Trailer</button>
                    <a href="">Buy Tickets</a>
                    <button> <CiHeart></CiHeart> </button>
                 </div>
              </div>
             </div> */}

            <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 lg:py-20 overflow-hidden">
                {/* Background Elements */}
                <BlurCircle top="10%" left="-5%" color="red" />
                <BlurCircle top="60%" right="-5%" />
                <BlurCircle bottom="20%" left="40%" color="red" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
                        {/* Movie Poster - Left Side */}
                        <div className="lg:w-2/5 xl:w-1/3 flex justify-center lg:justify-start">
                            <div className="relative group">
                                <img
                                    src={show.movie?.poster_path}
                                    alt={show.movie?.title}
                                    className="w-80 h-[480px] lg:w-96 lg:h-[560px] rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500 border-2 border-gray-700/50"
                                />
                                {/* Premium Badge */}
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-bold px-4 py-2 rounded-full shadow-2xl z-10">
                                    PREMIUM
                                </div>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>

                        {/* Movie Details - Right Side */}
                        <div className="lg:w-3/5 xl:w-2/3 relative">
                            <BlurCircle top='-80px' left='-80px' size="lg" />

                            <div className="flex flex-col gap-6 lg:gap-8 text-white">
                                {/* Language Tag */}
                                <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full border border-red-500/30 w-fit">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className="text-sm font-semibold uppercase tracking-wide">{show.movie?.original_language || 'ENGLISH'}</span>
                                </div>

                                {/* Movie Title */}
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                                    {show.movie?.title}
                                    <span className="block text-red-500 text-xl lg:text-2xl mt-2">
                                        {show.movie?.tagline}
                                    </span>
                                </h1>

                                {/* Rating Section */}
                                <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                                    <div className="flex items-center gap-2">
                                        <FaStar className='w-6 h-6 text-red-500 fill-red-500' />
                                        <span className="text-2xl font-bold text-white">
                                            {show.movie?.vote_average?.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="h-6 w-px bg-gray-600"></div>
                                    <div className="text-gray-300">
                                        <span className="font-semibold">User Rating</span>
                                        <span className="text-gray-400 text-sm block">Based on {show.movie?.vote_count} reviews</span>
                                    </div>
                                </div>

                                {/* Overview */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-red-400">Synopsis</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                                        {show.movie?.overview}
                                    </p>
                                </div>

                                {/* Movie Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                                    <div className="flex items-center gap-3">
                                        <FaClock className="w-5 h-5 text-red-500" />
                                        <div>
                                            <div className="text-sm text-gray-400">Duration</div>
                                            <div className="text-white font-semibold">{timeFormat(show.movie?.runtime)}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaFilm className="w-5 h-5 text-red-500" />
                                        <div>
                                            <div className="text-sm text-gray-400">Genres</div>
                                            <div className="text-white font-semibold">
                                                {show.movie?.genres?.map(genre => genre?.name).join(", ")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaCalendar className="w-5 h-5 text-red-500" />
                                        <div>
                                            <div className="text-sm text-gray-400">Release Year</div>
                                            <div className="text-white font-semibold">
                                                {show.movie?.release_date?.split("-")[0]}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/30 flex-1">
                                        <FaPlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Watch Trailer
                                    </button>

                                    <a
                                        href="#dateSelect"
                                        className="group flex items-center justify-center gap-3 bg-transparent hover:bg-red-600 text-white font-semibold border-2 border-red-600 hover:border-red-700 py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex-1"
                                    >
                                        <FaTicketAlt className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Buy Tickets
                                    </a>

                                    <button className="group flex items-center justify-center gap-3 bg-gray-800 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-red-500">
                                        <CiHeart className="w-6 h-6 group-hover:scale-110 transition-transform group-hover:fill-red-500" />
                                        <span className="sm:hidden lg:inline">Favorite</span>
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-10 left-10 w-24 h-24 bg-red-600/5 rounded-full blur-2xl"></div>

                <div className="relative py-12 lg:py-16 bg-gradient-to-b from-gray-900 to-black">


                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Section Header */}
                        <div className="text-start mb-12 lg:mb-16">
                            <div className="flex items-start  gap-4 mb-4">
                                <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                                    <FaUsers className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                                    Star Cast
                                </h2>
                            </div>
                            <p className="text-gray-400  mx-auto">
                                Meet the talented ensemble behind this cinematic masterpiece
                            </p>
                        </div>

                        {/* Cast Row - 12 in one row - HIDDEN SCROLLBAR */}
                        <div className="flex justify-center items-center gap-4 lg:gap-6 xl:gap-8 overflow-x-auto pb-8 scrollbar-hide">
                            {show.movie.casts.slice(0, 12).map((cast, index) => (
                                <div
                                    key={index}
                                    className="group flex-shrink-0 text-center transition-all duration-300 transform hover:scale-110"
                                >
                                    {/* Round Cast Image */}
                                    <div className="relative mx-auto mb-4">
                                        <div className="relative w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-red-500 transition-all duration-300 shadow-2xl group-hover:shadow-red-900/30">
                                            <img
                                                src={cast.profile_path}
                                                alt={cast.name}
                                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Hover Effect Ring */}
                                            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-red-400/50 transition-all duration-300"></div>
                                        </div>

                                        {/* Character Badge */}
                                        {cast.character && (
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                                as {cast.character.length > 15 ? cast.character.substring(0, 15) + '...' : cast.character}
                                            </div>
                                        )}
                                    </div>

                                    {/* Cast Name */}
                                    <div className="space-y-1">
                                        <h3 className="text-white font-semibold text-sm lg:text-base leading-tight group-hover:text-red-400 transition-colors duration-200 max-w-24 lg:max-w-28 truncate">
                                            {cast.name}
                                        </h3>

                                        {/* Department */}
                                        {cast.known_for_department && (
                                            <p className="text-red-500 text-xs font-medium uppercase tracking-wide">
                                                {cast.known_for_department}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
                <DateSelect dateTime={show.dateTime} id={id}></DateSelect>


                {/* <p>You may also like</p>
<div className='flex flex-wrap max-sm:justify-center gap-8'>
 {dummyShowsData.slice(0,4).map((movie,index)=>(
    <MovieCard key={index} movie={movie}></MovieCard>
 ))}
</div>
<div>
    <button onClick={()=>navigate('/movies')}>Show more</button>
</div> */}

            </div>
<div className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
    {/* Background Elements */}
    <BlurCircle top="10%" left="-5%" color="red" />
    <BlurCircle top="60%" right="-5%" />
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                    <FaHeart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                    You May Also Like
                </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover more cinematic masterpieces that match your taste
            </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {dummyShowsData.slice(0, 4).map((movie, index) => (
                <MovieCard key={movie._id || index} movie={movie} />
            ))}
        </div>

        {/* Show More Button */}
        <div className="text-center">
            <button 
                onClick={() => navigate('/movies')}
                className="group relative bg-transparent hover:bg-red-600 text-white font-semibold border-2 border-red-600 hover:border-red-700 py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-3 mx-auto shadow-lg hover:shadow-red-600/20"
            >
                <span className="text-lg">Explore All Movies</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
        </div>

       
    </div>

    {/* Bottom Gradient */}
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
</div>



        </div>
    ) : <Loading></Loading>
};

export default MovieDetails;