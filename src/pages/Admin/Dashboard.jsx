// import React, { useEffect, useState } from 'react';
// import { dummyDashboardData } from '../../assets/assets';
// import { FaChartLine, FaRegPlayCircle, FaUser, FaUsers } from 'react-icons/fa';
// import { CiBadgeDollar } from 'react-icons/ci';
// import Loading from '../../components/Loading';
// import BlurCircle from '../../components/BlurCircle';
// import { dateFormate } from '../../libraries/DateFormate';

// const Dashboard = () => {
//     const currency=import.meta.env.VITE_CURRENCY
//     const [dashboardData,setDashboardData]=useState({
//         totalBookings:0,
//         totalRevenue:0,
//         activeShows:[],
//         totalUser:0,
//     });
//     const [loading,setLoading]=useState(true);
//     const dashboardCards=[
//         {title:'Total Bookings',value: currency+dummyDashboardData.totalBookings || "0",icon:<FaChartLine></FaChartLine> },
//         {title:'Total Revenue',value: currency+dummyDashboardData.totalBookings || "0",icon:<CiBadgeDollar></CiBadgeDollar> },
//         {title:'Active Shows',value:currency+dummyDashboardData.totalBookings || "0",icon:<FaRegPlayCircle></FaRegPlayCircle> },
//         {title:'Total Users',value:currency+dummyDashboardData.totalBookings || "0",icon:<FaUsers></FaUsers> },
//     ]

//     const fetchDashboardData=async()=>{
//         setDashboardData(dummyDashboardData)
//         setLoading(false)
//     };

//     useEffect(()=>{
//         fetchDashboardData();
//     },[])

//     return !loading ?(
//         <>
//             <h1 >Admin dashboard</h1>
//             <div>
//                 <BlurCircle top='-100px' left='0'></BlurCircle>
//                 <div>
//                     {
//                         dashboardCards.map((card,idx)=>(
//                             <div key={idx}>
//                                 <div>
//                                     <h1> {card.title}</h1>
//                                     <p>{card.value}</p>
//                                 </div>
                                
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         <p>Active shows</p>
//         <div>
//             <BlurCircle top='100px' left='-10%'></BlurCircle>
//             {
//                 dashboardData.activeShows.map((show)=>(
//                      <div key={show._id}>
//                         <img src={show.movie.poster_path} alt="" />
//                         <p>{show.movie.title}</p>
//                         <div>
//                             <p>{currency} {show.showPrice} </p>
//                             <p>{show.movie.vote_average.toFixed(1)}</p>
//                         </div>
//                         <p> {dateFormate(show.showDateTime)} </p>
//                      </div>
//                 ))
//             }
//         </div>
//         </>
//     ):(<Loading></Loading>)
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import { FaChartLine, FaPlayCircle, FaUsers, FaTicketAlt, FaFilm, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { CiBadgeDollar } from 'react-icons/ci';
import Loading from '../../components/Loading';
import BlurCircle from '../../components/BlurCircle';
import { dateFormate } from '../../libraries/DateFormate';

const Dashboard = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0,
    });
    const [loading, setLoading] = useState(true);

    const dashboardCards = [
        { 
            title: 'Total Bookings', 
            value: dummyDashboardData.totalBookings || "0", 
            icon: <FaTicketAlt className="w-6 h-6" />,
            change: '+12%',
            trend: 'up',
            color: 'from-blue-600 to-blue-800'
        },
        { 
            title: 'Total Revenue', 
            value: currency + (dummyDashboardData.totalRevenue || "0"), 
            icon: <CiBadgeDollar className="w-6 h-6" />,
            change: '+18%',
            trend: 'up',
            color: 'from-green-600 to-green-800'
        },
        { 
            title: 'Active Shows', 
            value: dummyDashboardData.activeShows?.length || "0", 
            icon: <FaPlayCircle className="w-6 h-6" />,
            change: '+5%',
            trend: 'up',
            color: 'from-purple-600 to-purple-800'
        },
        { 
            title: 'Total Users', 
            value: dummyDashboardData.totalUser || "0", 
            icon: <FaUsers className="w-6 h-6" />,
            change: '+8%',
            trend: 'up',
            color: 'from-orange-600 to-orange-800'
        },
    ];

    const fetchDashboardData = async () => {
        setDashboardData(dummyDashboardData);
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return !loading ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 lg:p-8 relative overflow-hidden">
            {/* Background Elements */}
            <BlurCircle top="10%" left="-5%" color="red" />
            <BlurCircle top="60%" right="-5%" />
            <BlurCircle bottom="20%" left="40%" color="red" />
            
            <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-xl shadow-2xl">
                            <FaChartLine className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                            Admin Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Welcome back! Here's what's happening with your cinema today.
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-12">
                    {dashboardCards.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg`}>
                                    {card.icon}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${
                                    card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {card.trend === 'up' ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                                    {card.change}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                                    {card.title}
                                </h3>
                                <p className="text-2xl lg:text-3xl font-bold text-white">
                                    {card.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Active Shows Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                    {/* Active Shows */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-r from-red-600 to-red-800 p-2 rounded-lg">
                                    <FaFilm className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl lg:text-2xl font-bold text-white">
                                    Active Shows
                                </h2>
                            </div>
                            <span className="text-gray-400 text-sm">
                                {dashboardData.activeShows?.length || 0} shows
                            </span>
                        </div>

                        <div className="space-y-4">
                            {dashboardData.activeShows?.map((show) => (
                                <div 
                                    key={show._id}
                                    className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-red-500/30 transition-all duration-300 transform hover:scale-105"
                                >
                                    <img 
                                        src={show.movie.poster_path} 
                                        alt={show.movie.title}
                                        className="w-16 h-20 object-cover rounded-lg shadow-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-lg truncate">
                                            {show.movie.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <CiBadgeDollar className="w-4 h-4 text-green-500" />
                                                {currency}{show.showPrice}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaChartLine className="w-4 h-4 text-yellow-500" />
                                                {show.movie.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-2">
                                            {dateFormate(show.showDateTime)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-red-400 text-sm font-medium">Live</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(!dashboardData.activeShows || dashboardData.activeShows.length === 0) && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaFilm className="w-8 h-8 text-gray-500" />
                                </div>
                                <p className="text-gray-400">No active shows at the moment</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats & Actions */}
                    <div className="space-y-8">
                        {/* Recent Activity */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8 shadow-2xl">
                            <h3 className="text-lg lg:text-xl font-bold text-white mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm">New booking received</p>
                                            <p className="text-gray-400 text-xs">2 minutes ago</p>
                                        </div>
                                        <span className="text-green-400 text-sm font-medium">+{currency}25</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8 shadow-2xl">
                            <h3 className="text-lg lg:text-xl font-bold text-white mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                    Add Movie
                                </button>
                                <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                    Schedule Show
                                </button>
                                <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                    View Reports
                                </button>
                                <button className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                                    Manage Users
                                </button>
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

export default Dashboard;

