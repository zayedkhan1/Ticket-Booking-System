
// import React, { useState } from "react";
// import { dummyTrailers } from "../assets/assets";
// import BlurCircle from "./BlurCircle";
// import ReactPlayer from "react-player";
// import { FaPlayCircle } from "react-icons/fa";

// const TrailerSection = () => {
//   const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
//   console.log(dummyTrailers[0]);
//   console.log(currentTrailer.videoUrl);


//   return (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
//       <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">Trailers</p>
//         <div className="relative mt-6">
//          <BlurCircle top="-100px" right="-100px" />
//           <ReactPlayer url={currentTrailer.videoUrl} controls={true}
//           className="mx-auto max-w-full " width="960px" height="540px"
//           />
//         </div>
//         <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
//             {dummyTrailers.map((trailer) => (
//                <div key={trailer.image} className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer "
//                 onClick={()=>setCurrentTrailer(trailer)}
//                >
//                 <img src={trailer.image} alt="trailer" className="rounded-lg w-full h-full object-cover brightness-75" />
//                 <FaPlayCircle strokeWidth={1.6} 
//                 className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
//                 ></FaPlayCircle>
//                </div>
//             ))}
//         </div>

//     </div>
//   );
// };

// export default TrailerSection;













import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import ReactPlayer from "react-player";
import { FaPlayCircle, FaFilm, FaClock } from "react-icons/fa";

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

    return (
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
            {/* Background Elements */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 relative z-10">
                {/* Header */}
                <div className="text-center lg:text-left mb-12 lg:mb-16">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaFilm className="w-6 h-6 text-white" />
                        </div>
                        <BlurCircle top="0" left="5px" />

                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            Latest Trailers
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0">
                        Watch the newest movie trailers and exclusive content
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                    {/* Main Video Player */}
                    <div className="xl:flex-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700">
                            <div className="aspect-video w-full">
                                <ReactPlayer
                                    url={currentTrailer.videoUrl}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    className="react-player"
                                    playing={false}
                                    light={currentTrailer.image}
                                    playIcon={
                                        <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl">
                                            <FaPlayCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white fill-white" />
                                        </div>
                                    }
                                />
                            </div>

                            {/* Video Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-2">
                                    {currentTrailer.title || "Movie Trailer"}
                                </h3>
                                <p className="text-gray-300 text-sm lg:text-base line-clamp-2">
                                    {currentTrailer.description || "Latest official trailer"}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-2 text-red-400">
                                        <FaClock className="w-4 h-4" />
                                        <span className="text-sm font-medium">{currentTrailer.duration || "2:30"}</span>
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {currentTrailer.views || "1.2M"} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trailers Thumbnail Grid */}
                    <div className="xl:w-96 2xl:w-108">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
                            <h4 className="text-lg lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <span>More Trailers</span>
                                <span className="text-red-500 text-sm bg-red-500/10 px-2 py-1 rounded-full">
                                    {dummyTrailers.length}
                                </span>
                            </h4>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4 max-h-96 xl:max-h-120 overflow-y-auto custom-scrollbar pr-2">
                                {dummyTrailers.map((trailer, idx) => (
                                    <div
                                        key={trailer.image + idx}
                                        className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${currentTrailer.videoUrl === trailer.videoUrl
                                                ? 'ring-2 ring-red-500 scale-105 shadow-lg shadow-red-500/20'
                                                : 'hover:ring-2 hover:ring-red-400/50 hover:scale-105'
                                            }`}
                                        onClick={() => setCurrentTrailer(trailer)}
                                    >
                                        <div className="relative aspect-video">
                                            <img
                                                src={trailer.image}
                                                alt={trailer.title || "Trailer"}
                                                className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                                            {/* Play Button */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/40 group-hover:bg-red-600 rounded-full p-2 transform group-hover:scale-110 transition-all duration-300">
                                                    <FaPlayCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-white" />
                                                </div>
                                            </div>

                                            {/* Selected Indicator */}
                                            {currentTrailer.videoUrl === trailer.videoUrl && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                        Playing
                                                    </div>
                                                </div>
                                            )}

                                            {/* Duration Badge */}
                                            <div className="absolute bottom-2 left-2">
                                                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
                                                    {trailer.duration || "2:30"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trailer Info */}
                                        <div className="p-3 bg-gray-900/80 group-hover:bg-gray-900 transition-all duration-300">
                                            <h5 className="text-white font-semibold text-sm line-clamp-1">
                                                {trailer.title || "Movie Trailer"}
                                            </h5>
                                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                                {trailer.description || "Official trailer"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.8);
        }
      `}</style>
        </section>
    );
};

export default TrailerSection;
