// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { dummyDateTimeData, dummyShowsData, images } from '../assets/assets';
// import Loading from '../components/Loading';
// import { CiClock1, CiLock } from 'react-icons/ci';
// import { isoTimeFormate } from '../libraries/ISOTimeFormate';
// import BlurCircle from '../components/BlurCircle';
// import toast from 'react-hot-toast';
// import { FaArrowRight } from 'react-icons/fa';

// const SeatLayout = () => {
//     const { id, date } = useParams();
//     const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

//     const [selectedSets, setSelectedSets] = useState([]);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [show, setShow] = useState(null);
//     const navigate = useNavigate();

//     const getShow = async () => {
//         const show = dummyShowsData.find(show => show._id === id)
//         if (show) {
//             setShow({
//                 movie: show,
//                 dateTime: dummyDateTimeData,
//             })
//         }
//     }

//     const handleSeatClick = (seatId) => {
//         if (!selectedTime) {
//             return toast('please select tiem first !')
//         }
//         if (!selectedSets.includes(seatId) && selectedSets.length > 4) {
//             return toast('You can only select 5 seats')
//         }
//         selectedSets(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
//     }

//     const renderSeats = (row, count = 9) => (
//         <div key={row} className='flex gap-2 mt-2'>
//             <div className='flex flex-wrap items-center justify-center gap-2'>
//                 {Array.from({ length: count }, (_, i) => {
//                     const seatId = `${row} ${i + 1}`;
//                     return (
//                         <button
//                             key={seatId}
//                             onClick={() => handleSeatClick(seatId)}
//                             className={`h-8 w-8 rounded border-red-500/60 cursor-pointer ${selectedSets.includes(seatId) && "bg-red-500 text-white"}`}>
//                             {seatId}
//                         </button>
//                     )
//                 })}
//             </div>

//         </div>
//     )

//     useEffect(() => {
//         getShow();

//     }, [id])

//     return show ? (
//         <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
//             {/* available timing */}
//             <div className='w-60 bg-red-500/10 border border-red-500 rounded-lg py-10 h-max md:sticky md:top-30'>
//                 <p className='text-lg font-semibold px-6'>Available Timing</p>
//                 <div className='mt-5 space-y-1 '>
//                     {
//                         show.dateTime[date].map((item) => (
//                             <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md coursor-pointer transition ${selectedTime?.time === item.time ? "bg-red-500 text-white" : "hover:bg-red-500/20"} `}>
//                                 <CiClock1 className='w-4 h-4'></CiClock1>
//                                 <p className='text-sm'> {isoTimeFormate(item.time)} </p>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//             {/* seat layout */}
//             <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
//                 <BlurCircle top='-100px' left='-100px'></BlurCircle>
//                 <BlurCircle bottom='0' left='0'></BlurCircle>
//                 <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
//                 <img src={images.screenImage} alt="screen" />
//                 <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
//                 <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
//                     <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
//                         {
//                             groupRows[0].map(row => renderSeats(row))
//                         }
//                     </div>

//                     <div className='grid grid-cols-2 gap-11'>
//                         {
//                             groupRows.slice(1).map((group, idx) => (
//                                 <div key={idx}>
//                                     {group.map(row => renderSeats(row))}
//                                 </div>
//                             ))
//                         }

//                     </div>

//                 </div>
//                 <button onClick={()=>navigate('/my-bookings')} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transiton rounded-full font-medium cursrsor-pointer active:scale-95'>
//                     Proceed to Checkout 
//                     <FaArrowRight strokeWidth={3} className='w-4 h-4'></FaArrowRight>
//                      </button>


//             </div>
//         </div>



//     ) : (<Loading></Loading>)
// };

// export default SeatLayout;








import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData, images } from '../assets/assets';
import Loading from '../components/Loading';
import { CiClock1, CiLock } from 'react-icons/ci';
import { FaArrowRight, FaChair, FaFilm, FaTicketAlt, FaUsers, FaWheelchair } from 'react-icons/fa';
import { isoTimeFormate } from '../libraries/ISOTimeFormate';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';

const SeatLayout = () => {
    const { id, date } = useParams();
    const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
    const [selectedSets, setSelectedSets] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [show, setShow] = useState(null);
    const navigate = useNavigate();

    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id);
        if (show) {
            setShow({
                movie: show,
                dateTime: dummyDateTimeData,
            });
        }
    };

    const handleSeatClick = (seatId) => {
        if (!selectedTime) {
            return toast.error('Please select a time first!');
        }
        if (!selectedSets.includes(seatId) && selectedSets.length >= 5) {
            return toast.error('You can only select up to 5 seats');
        }
        setSelectedSets(prev => 
            prev.includes(seatId) 
                ? prev.filter(seat => seat !== seatId) 
                : [...prev, seatId]
        );
    };

    const renderSeats = (row, count = 9) => (
        <div key={row} className='flex flex-col items-center gap-2'>
            <span className='text-gray-400 text-sm font-medium mb-2'>{row}</span>
            <div className='flex gap-1 lg:gap-2 flex-wrap justify-center'>
                {Array.from({ length: count }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isSelected = selectedSets.includes(seatId);
                    const isOccupied = Math.random() < 0.2; // Simulate occupied seats
                    
                    return (
                        <button
                            key={seatId}
                            onClick={() => !isOccupied && handleSeatClick(seatId)}
                            disabled={isOccupied}
                            className={`relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg border-2 transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${
                                isSelected 
                                    ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/50 scale-110' 
                                    : isOccupied 
                                        ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-50' 
                                        : 'bg-gray-800 border-gray-600 hover:border-red-400 hover:bg-gray-700'
                            }`}
                        >
                            {isOccupied && (
                                <CiLock className="absolute inset-0 m-auto w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    useEffect(() => {
        getShow();
    }, [id]);

    return show ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 mt-10 lg:py-12 relative overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            <BlurCircle bottom="20%" left="40%" color="red" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaChair className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            Select Your Seats
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Choose your perfect spot for {show.movie?.title}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Timing Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 lg:p-8 shadow-2xl lg:sticky lg:top-8">
                            {/* Movie Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-700/50">
                                <img 
                                    src={show.movie?.poster_path} 
                                    alt={show.movie?.title}
                                    className="w-16 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg line-clamp-2">
                                        {show.movie?.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(date).toLocaleDateString("en-US", { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Available Timing */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <CiClock1 className="w-5 h-5 text-red-500" />
                                    Available Timing
                                </h4>
                                <div className="space-y-2">
                                    {show.dateTime[date]?.map((item) => (
                                        <button
                                            key={item.time}
                                            onClick={() => setSelectedTime(item)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                                                selectedTime?.time === item.time 
                                                    ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30" 
                                                    : "bg-gray-700/50 border-gray-600 hover:border-red-400/50 hover:bg-gray-600/50"
                                            }`}
                                        >
                                            <CiClock1 className={`w-4 h-4 ${selectedTime?.time === item.time ? 'text-white' : 'text-red-400'}`} />
                                            <span className="text-sm font-medium">
                                                {isoTimeFormate(item.time)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Seats Summary */}
                            {selectedSets.length > 0 && (
                                <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
                                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                                        <FaUsers className="w-4 h-4 text-red-400" />
                                        Selected Seats ({selectedSets.length})
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSets.map(seat => (
                                            <span key={seat} className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm">
                                                {seat}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Total: ${(selectedSets.length * 12.99).toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Seat Layout */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 shadow-2xl">
                            {/* Screen */}
                            <div className="text-center mb-6 sm:mb-8">
                                <div className="relative mx-auto max-w-2xl">
                                    <img 
                                        src={images.screenImage} 
                                        alt="screen" 
                                        className="w-full h-10 sm:h-12 object-cover rounded-lg opacity-80"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm sm:text-lg bg-black/50 px-3 sm:px-4 py-1 rounded-full">
                                            SCREEN
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs sm:text-sm mt-2">All seats face this direction</p>
                            </div>

                            {/* Seat Legend */}
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-800 border-2 border-gray-600 rounded"></div>
                                    <span className="text-gray-400 text-xs sm:text-sm">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 border-2 border-red-500 rounded"></div>
                                    <span className="text-gray-400 text-xs sm:text-sm">Selected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-600 border-2 border-gray-500 rounded relative">
                                        <CiLock className="absolute inset-0 m-auto w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-400" />
                                    </div>
                                    <span className="text-gray-400 text-xs sm:text-sm">Occupied</span>
                                </div>
                            </div>

                            {/* Seat Grid - Properly Contained */}
                            <div className="flex justify-center overflow-hidden">
                                <div className="w-full max-w-4xl">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
                                        {groupRows.map((group, groupIndex) => (
                                            <div key={groupIndex} className="flex flex-col gap-4 sm:gap-6 w-full">
                                                {group.map(row => (
                                                    <div key={row} className="flex flex-col items-center gap-2 w-full">
                                                        <span className='text-gray-400 text-sm font-medium'>{row}</span>
                                                        <div className='flex gap-1 sm:gap-2 justify-center w-full flex-wrap'>
                                                            {Array.from({ length: 9 }, (_, i) => {
                                                                const seatId = `${row}${i + 1}`;
                                                                const isSelected = selectedSets.includes(seatId);
                                                                const isOccupied = Math.random() < 0.2;
                                                                
                                                                return (
                                                                    <button
                                                                        key={seatId}
                                                                        onClick={() => !isOccupied && handleSeatClick(seatId)}
                                                                        disabled={isOccupied}
                                                                        className={`relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg border-2 transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${
                                                                            isSelected 
                                                                                ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/50 scale-110' 
                                                                                : isOccupied 
                                                                                    ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-50' 
                                                                                    : 'bg-gray-800 border-gray-600 hover:border-red-400 hover:bg-gray-700'
                                                                        }`}
                                                                    >
                                                                        {isOccupied && (
                                                                            <CiLock className="absolute inset-0 m-auto w-3 h-3 text-gray-400" />
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700/50">
                                <button 
                                    onClick={() => navigate('/my-bookings')}
                                    disabled={selectedSets.length === 0 || !selectedTime}
                                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-red-600/30 mx-auto w-full sm:w-auto sm:min-w-64"
                                >
                                    <FaTicketAlt className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                    <span className="text-base sm:text-lg">
                                        {selectedSets.length > 0 
                                            ? `Proceed with ${selectedSets.length} Seat${selectedSets.length > 1 ? 's' : ''}`
                                            : 'Proceed to Checkout'
                                        }
                                    </span>
                                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                
                                {selectedSets.length > 0 && (
                                    <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
                                        Total: ${(selectedSets.length * 12.99).toFixed(2)} • {selectedSets.length} seat{selectedSets.length > 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default SeatLayout;