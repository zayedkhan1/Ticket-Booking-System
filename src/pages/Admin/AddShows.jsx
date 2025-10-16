// import React, { useEffect, useState } from 'react';
// import { dummyShowsData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import { kConverter } from '../../libraries/KConverter';
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { MdDelete } from 'react-icons/md';

// const AddShows = () => {
//     const currency=import.meta.env.VITE_CURRENCY
//     const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
//     const[selectedMovie,setSelectedMovie]=useState(null);
//     const [dateTimeSelection,setDateTimeSelection]=useState({});
//     const [dateTimeInput,setDateTimeInput]=useState("");
//     const[showPrice,setShowPrice]=useState("");

//     const fetchNowPlayingMovies=async()=>{
//         setNowPlayingMovies(dummyShowsData)
//     }

//     const handleDateTimeAdd=()=>{
//         if(!dateTimeInput) return;
//         const [date,time]=dateTimeInput.split("T")
//         if(!date || time) return;
//         setDateTimeSelection((prev)=>{

//             const times=prev[date] || [];
//             if(!times.includes(time)){
//                 return {...prev,[date]:[...times,time]}
//             }
//             return prev;
//         })
//     }


//     useEffect(()=>{
//     fetchNowPlayingMovies();
//     },[])

//     return nowPlayingMovies.length>0 ?(
//         <>
//             <h1>Add shows</h1>
//             <div>
//             <p>Now palying movies</p>
//             <div>
//                 {nowPlayingMovies.map((movie)=>(
//                     <div key={movie.id} onClick={()=>setSelectedMovie(movie.id)} >
//                         <div>
//                             <img src={movie.poster_path} alt="" />
//                         <div>
//                             <p>{movie.vote_average.toFixed(1)}</p>
//                              <p>{ kConverter(movie.vote_count)}</p>
//                         </div>
//                         </div>
//                         {selectedMovie === movie.id && (
//                             <div>
//                             <IoIosCheckmarkCircleOutline />
//                             </div>
//                         )}
//                         <p>{movie.title} </p>
//                         <p> {movie.release_date} </p>
                        
//                     </div>
//                 ))}
//             </div>


//             </div>

//         {/* show price input */}
//         <div>
//             <label>show Price</label>
//             <div>
//                 <p>{currency}</p>
//                 <input type="number" value={showPrice} onChange={(e)=>setShowPrice(e.target.value) } placeholder='Enter show price'/>
//             </div>
//         </div>
//         {/* Date and time */}
//         <div>
//             <label> select Date and Time</label>
//             <div>
//                 <input type="datetime-local" value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} />
//                 <button onClick={handleDateTimeAdd}>Add Time</button>
//             </div>
//         </div>
//         {/* Display selected times */}

//         {
//             Object.keys(dateTimeSelection).length>0 && (
//                 <div>
//                     <h2>Selected Date-Time</h2>
//                     <ul>
//                         {
//                             Object.entries(dateTimeSelection).map(([date,times])=>{
//                                 <li key={date}>
//                                     <div>{date}</div>
//                                     <div>
//                                         {
//                                             times.map((time)=>(
//                                                 <div key={time}>
//                                                     <span>{time}</span>
//                                                     <MdDelete
//                                                     onClick={()=>handleRemoveTime(date,time)}
//                                                     ></MdDelete>
//                                                  </div>
//                                             ))
//                                         }
//                                     </div>
//                                 </li>
//                             })
//                         }
//                     </ul>
//                 </div>
//             )
//         }
//         <button> Add SHow</button>        

// </>
//     ):(<Loading></Loading>)
// };

// export default AddShows;


























import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { kConverter } from '../../libraries/KConverter';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete, MdAdd, MdCalendarToday, MdAccessTime, MdAttachMoney } from 'react-icons/md';
import { FaFilm, FaPlus, FaCheck, FaClock, FaCalendarAlt } from 'react-icons/fa';
import BlurCircle from '../../components/BlurCircle';
import toast from 'react-hot-toast';

const AddShows = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setDateTimeSelection] = useState({});
    const [dateTimeInput, setDateTimeInput] = useState("");
    const [showPrice, setShowPrice] = useState("");
    const [activeTab, setActiveTab] = useState('selectMovie');

    const fetchNowPlayingMovies = async () => {
        setNowPlayingMovies(dummyShowsData);
    };

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return;
        const [date, time] = dateTimeInput.split("T");
        if (!date || !time) return;
        
        setDateTimeSelection((prev) => {
            const times = prev[date] || [];
            if (!times.includes(time)) {
                return { ...prev, [date]: [...times, time] };
            }
            return prev;
        });
        setDateTimeInput("");
    };

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            const times = prev[date].filter(t => t !== time);
            if (times.length === 0) {
                const { [date]: removed, ...rest } = prev;
                return rest;
            }
            return { ...prev, [date]: times };
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const showSuccess=()=>{
        toast('Show Addedd successfully')
    }

    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    return nowPlayingMovies.length > 0 ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 lg:p-8 relative overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaPlus className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            Add New Show
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Schedule a new movie show with date, time, and pricing
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        {[
                            { id: 'selectMovie', label: 'Select Movie', icon: FaFilm },
                            { id: 'setPrice', label: 'Set Price', icon: MdAttachMoney },
                            { id: 'schedule', label: 'Schedule', icon: FaCalendarAlt },
                            { id: 'review', label: 'Review', icon: FaCheck }
                        ].map((step, index) => (
                            <div key={step.id} className="flex items-center gap-3">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                    activeTab === step.id 
                                        ? 'bg-red-600 border-red-500 text-white' 
                                        : 'border-gray-600 text-gray-400'
                                }`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span className={`font-medium ${
                                    activeTab === step.id ? 'text-white' : 'text-gray-400'
                                }`}>
                                    {step.label}
                                </span>
                                {index < 3 && (
                                    <div className="hidden lg:block w-8 h-0.5 bg-gray-600 mx-4"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Movie Selection */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-600/20 p-2 rounded-lg">
                                    <FaFilm className="w-5 h-5 text-red-500" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">
                                    Select Movie
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {nowPlayingMovies.map((movie) => (
                                    <div 
                                        key={movie.id} 
                                        onClick={() => setSelectedMovie(movie.id)}
                                        className={`relative bg-gray-700/30 rounded-xl border-2 p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                            selectedMovie === movie.id 
                                                ? 'border-red-500 bg-red-600/20 shadow-lg shadow-red-600/30' 
                                                : 'border-gray-600 hover:border-red-400/50'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <img 
                                                src={movie.poster_path} 
                                                alt={movie.title}
                                                className="w-16 h-20 object-cover rounded-lg shadow-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold text-lg truncate">
                                                    {movie.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {new Date(movie.release_date).getFullYear()}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2 text-sm">
                                                    <div className="flex items-center gap-1 text-yellow-500">
                                                        <span>★</span>
                                                        <span>{movie.vote_average.toFixed(1)}</span>
                                                    </div>
                                                    <div className="text-gray-400">
                                                        {kConverter(movie.vote_count)} votes
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {selectedMovie === movie.id && (
                                            <div className="absolute top-3 right-3">
                                                <IoIosCheckmarkCircleOutline className="w-6 h-6 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Show Price */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-600/20 p-2 rounded-lg">
                                    <MdAttachMoney className="w-5 h-5 text-red-500" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">
                                    Set Show Price
                                </h2>
                            </div>

                            <div className="relative max-w-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 font-semibold">{currency}</span>
                                </div>
                                <input 
                                    type="number" 
                                    value={showPrice}
                                    onChange={(e) => setShowPrice(e.target.value)}
                                    placeholder="Enter show price"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        {/* Date and Time Selection */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-600/20 p-2 rounded-lg">
                                    <FaCalendarAlt className="w-5 h-5 text-red-500" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">
                                    Schedule Show Times
                                </h2>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <input 
                                        type="datetime-local" 
                                        value={dateTimeInput}
                                        onChange={(e) => setDateTimeInput(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    />
                                </div>
                                <button 
                                    onClick={handleDateTimeAdd}
                                    disabled={!dateTimeInput}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                                >
                                    <MdAdd className="w-5 h-5" />
                                    Add Time
                                </button>
                            </div>

                            {/* Selected Times */}
                            {Object.keys(dateTimeSelection).length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Selected Show Times</h3>
                                    <div className="space-y-4">
                                        {Object.entries(dateTimeSelection).map(([date, times]) => (
                                            <div key={date} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <MdCalendarToday className="w-4 h-4 text-red-500" />
                                                    <h4 className="text-white font-semibold">
                                                        {formatDate(date)}
                                                    </h4>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {times.map((time) => (
                                                        <div 
                                                            key={time} 
                                                            className="flex items-center gap-2 bg-gray-600/50 px-3 py-2 rounded-lg border border-gray-500/50"
                                                        >
                                                            <FaClock className="w-3 h-3 text-red-500" />
                                                            <span className="text-white text-sm">
                                                                {formatTime(time)}
                                                            </span>
                                                            <button 
                                                                onClick={() => handleRemoveTime(date, time)}
                                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                                            >
                                                                <MdDelete className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl sticky top-8">
                            <h3 className="text-xl font-bold text-white mb-6">Show Summary</h3>
                            
                            {selectedMovie && (
                                <div className="space-y-4">
                                    {/* Selected Movie */}
                                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                                        <img 
                                            src={nowPlayingMovies.find(m => m.id === selectedMovie)?.poster_path} 
                                            alt="Selected movie"
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-sm">
                                                {nowPlayingMovies.find(m => m.id === selectedMovie)?.title}
                                            </h4>
                                            <p className="text-gray-400 text-xs">
                                                Selected Movie
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    {showPrice && (
                                        <div className="p-3 bg-gray-700/30 rounded-lg">
                                            <div className="text-white font-semibold">
                                                {currency}{showPrice}
                                            </div>
                                            <p className="text-gray-400 text-xs">Show Price</p>
                                        </div>
                                    )}

                                    {/* Scheduled Times */}
                                    {Object.keys(dateTimeSelection).length > 0 && (
                                        <div className="p-3 bg-gray-700/30 rounded-lg">
                                            <div className="text-white font-semibold">
                                                {Object.values(dateTimeSelection).flat().length} show times
                                            </div>
                                            <p className="text-gray-400 text-xs">Across {Object.keys(dateTimeSelection).length} dates</p>
                                        </div>
                                    )}

                                    {/* Add Show Button */}
                                    <button 
                                    onClick={showSuccess}
                                        disabled={!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0}
                                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
                                    >
                                        <FaPlus className="w-4 h-4" />
                                        Create Show
                                    </button>
                                </div>
                            )}

                            {!selectedMovie && (
                                <div className="text-center py-8">
                                    <FaFilm className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400">Select a movie to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default AddShows;