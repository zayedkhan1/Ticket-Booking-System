// import React, { useEffect, useState } from 'react';
// import { dummyBookingData } from '../assets/assets';
// import Loading from '../components/Loading';
// import BlurCircle from '../components/BlurCircle';
// import { timeFormat } from '../libraries/TimeFormate';
// import { dateFormate } from '../libraries/DateFormate';

// const MyBookings = () => {
//     const currency =import.meta.env.VITE_CURRENCY 
//     const [bookings,setBookings]=useState([])
//     const [isLoading,setIsLoading]=useState(true)
   
//     const getMyBooking=async()=>{
//         setBookings(dummyBookingData)
//         setIsLoading(false)
//     }
//     useEffect(()=>{
//        getMyBooking()
//     },[])
   
//     return !isLoading ? (
//         <div>
//             <BlurCircle top="100px" left='100px'></BlurCircle>
//        <div>
//                     <BlurCircle top="0px" left='600px'></BlurCircle>

//        </div>
//        <h1>My Bookings</h1>
//        {
//         bookings.map((item,index)=>(
//             <div key={index} >
//             <div>
//                 <img src={item.show.movie.poster_path} alt="" />
//                 <div>
//                     <p>{item.show.movie.title}</p>
//                     <p>{ timeFormat( item.show.movie.runtime)}</p>
//                     <p>{ dateFormate(  item.show.movie.showDateTime)}</p>
//                 </div>
//             </div>
//             <div>
//                 <p >{currency}{item.amount} </p>
//                  {
//                     !item.isPaid && <button>Pay Now</button>
//                  }
//             </div>
//             <div>
//                 <p>
//                     <span>
//                         Total Tickets: {item.bookedSeats.length}
//                     </span>
//                 </p>

//                   <p>
//                     <span>
//                         Seat Number: {item.bookedSeats.join(", ")}
//                     </span>
//                 </p>
//             </div>

//             </div>
          
//         ))
//        }
//         </div>
//     ):(<Loading></Loading>)
// };

// export default MyBookings;















import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../assets/assets';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import { timeFormat } from '../libraries/TimeFormate';
import { dateFormate } from '../libraries/DateFormate';
import { FaTicketAlt, FaCalendar, FaClock, FaUsers, FaChair, FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    const getMyBooking = async () => {
        setBookings(dummyBookingData);
        setIsLoading(false);
    };

    useEffect(() => {
        getMyBooking();
    }, []);

    return !isLoading ? (
        <div className="min-h-screen mt-10 bg-gradient-to-br from-black via-gray-900 to-black py-8 lg:py-12 relative overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            <BlurCircle bottom="20%" left="40%" color="red" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaTicketAlt className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            My Bookings
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Manage your movie tickets and upcoming shows
                    </p>
                </div>

                {/* Bookings Grid */}
                <div className="space-y-6 lg:space-y-8">
                    {bookings.length > 0 ? (
                        bookings.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8 shadow-2xl hover:shadow-red-900/20 transition-all duration-300"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                                    {/* Movie Poster */}
                                    <div className="lg:col-span-2 flex justify-center lg:justify-start">
                                        <img 
                                            src={item.show.movie.poster_path} 
                                            alt={item.show.movie.title}
                                            className="w-32 h-48 lg:w-40 lg:h-56 object-cover rounded-xl shadow-2xl"
                                        />
                                    </div>

                                    {/* Movie Details */}
                                    <div className="lg:col-span-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                                                {item.show.movie.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="w-4 h-4 text-red-500" />
                                                    <span className="text-sm">{timeFormat(item.show.movie.runtime)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendar className="w-4 h-4 text-red-500" />
                                                    <span className="text-sm">{dateFormate(item.show.movie.showDateTime)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/30">
                                                <FaUsers className="w-5 h-5 text-red-500" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Total Tickets</div>
                                                    <div className="text-white font-semibold">{item.bookedSeats.length}</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/30">
                                                <FaChair className="w-5 h-5 text-red-500" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Seat Numbers</div>
                                                    <div className="text-white font-semibold text-sm">
                                                        {item.bookedSeats.join(", ")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2">
                                            {item.isPaid ? (
                                                <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                                                    <FaCheckCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Paid</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
                                                    <FaTimesCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Pending Payment</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Payment Section */}
                                    <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                                        <div className="text-right">
                                            <div className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                                {currency}{item.amount}
                                            </div>
                                            <div className="text-gray-400 text-sm">Total Amount</div>
                                        </div>

                                        {!item.isPaid && (
                                            <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/30 w-full lg:w-auto">
                                                <FaCreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                Pay Now
                                            </button>
                                        )}

                                        {/* Additional Actions */}
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 text-sm">
                                                View Details
                                            </button>
                                            <button className="flex-1 bg-gray-700 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking ID */}
                                <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                                    <div className="text-gray-400 text-sm">
                                        Booking ID: <span className="text-white font-mono">#{index + 1}23456</span>
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Booked on: <span className="text-white">{dateFormate(new Date().toISOString())}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16 lg:py-24">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-2xl mx-auto">
                                <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaTicketAlt className="w-8 h-8 text-red-400" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                    No Bookings Yet
                                </h2>
                                <p className="text-gray-400 text-lg mb-6">
                                    You haven't made any bookings yet. Start exploring our amazing movie collection!
                                </p>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    Browse Movies
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Stats */}
                {bookings.length > 0 && (
                    <div className="mt-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-red-500">{bookings.length}</div>
                                <div className="text-gray-400 text-sm mt-1">Total Bookings</div>
                            </div>
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-red-500">
                                    {bookings.filter(b => b.isPaid).length}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Confirmed</div>
                            </div>
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-red-500">
                                    {bookings.filter(b => !b.isPaid).length}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Pending</div>
                            </div>
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-red-500">
                                    {currency}{bookings.reduce((total, b) => total + b.amount, 0).toFixed(2)}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Total Spent</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default MyBookings;