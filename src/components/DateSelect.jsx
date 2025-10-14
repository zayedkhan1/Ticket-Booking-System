// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { MdArrowForwardIos } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// const DateSelect = ({dateTime,id}) => {
//     const [selected,setSelected]=useState(null)
//     const navigate=useNavigate();
//     const onBookHandler=()=>{
//         if(!selected){
//             return toast('please select date !')
//         }
//         navigate(`/movies/${id}/${selected}`)


//     }
//     return (
//         <div id='dateSelect' >
//             <div>
//                 <p>Choose date</p>
//                 <div className='flex items-center gap-6 text-sm mt-5'>
             
//                       <MdKeyboardArrowLeft />
//                      <span  className='grid grid-cols-3 md:flex flex-wrep md:max-w-lg'>
//                        {Object.keys(dateTime).map((date)=>(
//                         <button onClick={()=>setSelected(date)} key={date} className={`felx flex-col items-center jusify-center h-14 w-14 aspect-square rounded cursor-pointer
//                         ${selected == date ? 'bg-red-500 text-white':"border border-red-500"}
//                         `} >
//                                 <span> {new Date(date).getDate()}</span>
//                                 <span> {new Date(date).toLocaleDateString("en-Us",{month:"short"})}</span>
//                         </button>
//                        ))}
//                      </span>
//                     <MdArrowForwardIos />
//                 </div>
//             </div>
//             <button
//             onClick={onBookHandler}
//             className='p-2 bg-red-500 rounded'>Book Now</button>
            
//         </div>
//     );
// };

// export default DateSelect;






import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendarAlt, FaTicketAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';

const DateSelect = ({ dateTime, id }) => {
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    
    const dates = Object.keys(dateTime);
    const datesPerPage = 7;
    const totalPages = Math.ceil(dates.length / datesPerPage);
    const currentDates = dates.slice(
        currentPage * datesPerPage,
        (currentPage + 1) * datesPerPage
    );

    const onBookHandler = () => {
        if (!selected) {
            return toast.error('Please select a date first!');
        }
        navigate(`/movies/${id}/${selected}`);
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const formatDay = (date) => {
        return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    };

    const formatDate = (date) => {
        return new Date(date).getDate();
    };

    const formatMonth = (date) => {
        return new Date(date).toLocaleDateString("en-US", { month: "short" });
    };

    return (
        <div id='dateSelect' className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            {/* Background Elements */}
            <BlurCircle top="-50px" right="-50px" color="red" size="sm" />
            
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                        <FaCalendarAlt className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Select Date</h3>
                </div>
                <p className="text-gray-400">Choose your preferred show date</p>
            </div>

            <div className="space-y-6">
                {/* Date Selection */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span>Available Dates</span>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </h4>
                        
                        {/* Navigation Controls */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 0}
                                className="p-2 bg-gray-800 hover:bg-red-600 disabled:bg-gray-800 disabled:opacity-30 rounded-lg transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100"
                            >
                                <MdKeyboardArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            
                            <span className="text-sm text-gray-400 min-w-12 text-center">
                                {currentPage + 1} / {totalPages}
                            </span>
                            
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages - 1}
                                className="p-2 bg-gray-800 hover:bg-red-600 disabled:bg-gray-800 disabled:opacity-30 rounded-lg transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100"
                            >
                                <MdKeyboardArrowRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                        {currentDates.map((date) => (
                            <button
                                key={date}
                                onClick={() => setSelected(date)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                    selected === date
                                        ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/30 scale-105 text-white'
                                        : 'bg-gray-800/50 border-gray-600 hover:border-red-400/50 hover:bg-gray-700/50 text-gray-300'
                                }`}
                            >
                                <span className={`text-xs font-medium transition-colors ${
                                    selected === date ? 'text-white' : 'text-gray-400'
                                }`}>
                                    {formatDay(date)}
                                </span>
                                <span className={`text-lg font-bold transition-colors ${
                                    selected === date ? 'text-white' : 'text-white'
                                }`}>
                                    {formatDate(date)}
                                </span>
                                <span className={`text-xs transition-colors ${
                                    selected === date ? 'text-white' : 'text-red-400'
                                }`}>
                                    {formatMonth(date)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Date Info */}
                {selected && (
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="text-white font-semibold">Selected Date</h5>
                                <p className="text-gray-300 text-sm">
                                    {new Date(selected).toLocaleDateString("en-US", { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-sm">Available Shows</p>
                                <p className="text-red-500 font-semibold">
                                    {dateTime[selected]?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Book Now Button */}
                <div className="pt-4 border-t border-gray-700/50">
                    <button
                        onClick={onBookHandler}
                        disabled={!selected}
                        className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-red-600/30"
                    >
                        <FaTicketAlt className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-lg">Continue to Seat Selection</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            <span>Available</span>
                        </div>
                    </div>
                    <span>{currentDates.length} dates shown</span>
                </div>
            </div>
        </div>
    );
};

export default DateSelect;