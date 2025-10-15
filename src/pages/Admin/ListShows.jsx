// import React, { useEffect, useState } from 'react';
// import { dummyShowsData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import { dateFormate } from '../../libraries/DateFormate';

// const ListShows = () => {
//     const currency = import.meta.env.VITE_CURRENCY;

//     const [shows,setShows]=useState([])
//     const [loading,setLoading]=useState(true);
//     const getAllShows=async()=>{
//         try{
//             setShows([{
//                 movie:dummyShowsData[0],
//                 showDateTime:"2025-06-30T03:30:00.000Z",
//                 showPrice:59,
//                 occupiedSeats:{
//                     A1:"user_1",
//                     B1:"user_2",
//                     C1:"user_3",
//                 }
//             }]);
               
//              setLoading(false)
//         }catch(err){
//             console.log(err)
//         }
//     }
    
    
//     useEffect(()=>{
//   getAllShows();
//     },[]);


//     return !loading ? (
//         <>
//             <h1>List shows</h1>
//             <div>
//                 <table>
//                    <thead>
//                      <tr>
//                         <th>Movie Name</th>
//                         <th>Show Time</th>
//                         <th>Total Bookings</th>
//                         <th>Earnings</th>
//                     </tr>
//                    </thead>
//                    <tbody>
//                     {
                       
//                         shows.map((show, index) => {
//                                    return (
//                                     <tr key={index}>
//                                     <td>{show.movie.title}</td>
//                                     <td>{dateFormate(show.showDateTime)}</td>
//                                     <td>{Object.keys(show.occupiedSeats).length}</td>
//                                     <td>{currency}{Object.keys(show.occupiedSeats).length * show.showPrice}</td>
//                                       </tr>
//                                                  );
//                                                 })

//                     }
//                    </tbody>
//                 </table>
//             </div>






//         </>
//     ):(<Loading></Loading>)
// };

// export default ListShows;



import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { dateFormate } from '../../libraries/DateFormate';
import { FaFilm, FaCalendarAlt, FaUsers, FaDollarSign, FaEye, FaEdit, FaTrash, FaTicketAlt } from 'react-icons/fa';
import BlurCircle from '../../components/BlurCircle';

const ListShows = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const getAllShows = async () => {
        try {
            // Generate multiple show entries for demo
            const showData = Array.from({ length: 8 }, (_, index) => ({
                _id: `show_${index + 1}`,
                movie: dummyShowsData[index % dummyShowsData.length],
                showDateTime: new Date(Date.now() + (index * 24 * 60 * 60 * 1000)).toISOString(),
                showPrice: 59 + (index * 5),
                occupiedSeats: {
                    A1: "user_1",
                    B1: "user_2",
                    C1: "user_3",
                    ...(index > 2 && { D1: "user_4", E1: "user_5" }),
                    ...(index > 4 && { F1: "user_6", G1: "user_7" })
                }
            }));
            setShows(showData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Filter and sort shows
    const filteredShows = shows
        .filter(show => 
            show.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.movie.title.localeCompare(b.movie.title);
                case 'bookings':
                    return Object.keys(b.occupiedSeats).length - Object.keys(a.occupiedSeats).length;
                case 'earnings':
                    return (Object.keys(b.occupiedSeats).length * b.showPrice) - (Object.keys(a.occupiedSeats).length * a.showPrice);
                case 'date':
                default:
                    return new Date(a.showDateTime) - new Date(b.showDateTime);
            }
        });

    useEffect(() => {
        getAllShows();
    }, []);

    return !loading ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 lg:p-8 relative overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            
            <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaTicketAlt className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            Manage Shows
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        View and manage all scheduled movie shows
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search shows..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                            />
                            <FaFilm className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {/* Sort & Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="bookings">Sort by Bookings</option>
                                <option value="earnings">Sort by Earnings</option>
                            </select>
                            
                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                                <FaCalendarAlt className="w-4 h-4" />
                                Add New Show
                            </button>
                        </div>
                    </div>
                </div>

                {/* Shows Table */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-700/50 bg-gray-900/30">
                        <div className="col-span-4 lg:col-span-5">
                            <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Movie & Show</span>
                        </div>
                        <div className="col-span-3 lg:col-span-2 text-center">
                            <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Bookings</span>
                        </div>
                        <div className="col-span-3 lg:col-span-2 text-center">
                            <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Earnings</span>
                        </div>
                        <div className="col-span-2 lg:col-span-3 text-center">
                            <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Actions</span>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-700/50">
                        {filteredShows.map((show) => (
                            <div key={show._id} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-700/30 transition-all duration-300">
                                {/* Movie & Show Info */}
                                <div className="col-span-4 lg:col-span-5">
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src={show.movie.poster_path} 
                                            alt={show.movie.title}
                                            className="w-12 h-16 object-cover rounded-lg shadow-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold text-lg truncate">
                                                {show.movie.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
                                                <FaCalendarAlt className="w-3 h-3 text-red-500" />
                                                <span>{dateFormate(show.showDateTime)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-red-500 text-sm font-medium">
                                                    {currency}{show.showPrice}
                                                </span>
                                                <span className="text-gray-500">•</span>
                                                <span className="text-yellow-500 text-sm">
                                                    ★ {show.movie.vote_average.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bookings */}
                                <div className="col-span-3 lg:col-span-2 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
                                            <FaUsers className="w-4 h-4 text-red-500" />
                                            {Object.keys(show.occupiedSeats).length}
                                        </div>
                                        <div className="text-gray-400 text-xs mt-1">seats booked</div>
                                    </div>
                                </div>

                                {/* Earnings */}
                                <div className="col-span-3 lg:col-span-2 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
                                            <FaDollarSign className="w-4 h-4 text-green-500" />
                                            {currency}{(Object.keys(show.occupiedSeats).length * show.showPrice).toFixed(2)}
                                        </div>
                                        <div className="text-gray-400 text-xs mt-1">total revenue</div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 lg:col-span-3 flex items-center justify-center gap-2">
                                    <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110">
                                        <FaEye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110">
                                        <FaEdit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-110">
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredShows.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTicketAlt className="w-8 h-8 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Shows Found</h3>
                            <p className="text-gray-400">
                                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first show'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Summary Stats */}
                {filteredShows.length > 0 && (
                    <div className="mt-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-red-500">{filteredShows.length}</div>
                                <div className="text-gray-400 text-sm mt-1">Total Shows</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-500">
                                    {filteredShows.reduce((total, show) => total + Object.keys(show.occupiedSeats).length, 0)}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Total Bookings</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-500">
                                    {currency}{filteredShows.reduce((total, show) => total + (Object.keys(show.occupiedSeats).length * show.showPrice), 0).toFixed(2)}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Total Revenue</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-500">
                                    {currency}{(filteredShows.reduce((total, show) => total + (Object.keys(show.occupiedSeats).length * show.showPrice), 0) / filteredShows.length).toFixed(2)}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">Avg per Show</div>
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

export default ListShows;