
// import React, { useEffect, useState } from 'react';
// import { dummyBookingData } from '../../assets/assets';
// import Loading from '../../components/Loading';
// import { dateFormate } from '../../libraries/DateFormate';

// const ListBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [bookings, setBookings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getAllBookings = async () => {
//     setBookings(dummyBookingData);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getAllBookings();
//   }, []);

//   return !isLoading ? (
//     <>
//       <h1>List Bookings</h1>
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Movie Name</th>
//               <th>Show Time</th>
//               <th>Seats</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.user.name}</td>
//                 <td>{item.show.movie.title}</td>
//                 <td>{dateFormate(item.show.showDateTime)}</td>
//                 <td>{Object.keys(item.bookedSeats).join(', ')}</td>
//                 <td>
//                   {currency} {item.amount}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   ) : (
//     <Loading />
//   );
// };

// export default ListBookings;







import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { dateFormate } from '../../libraries/DateFormate';
import { FaTicketAlt, FaUser, FaFilm, FaCalendarAlt, FaChair, FaDollarSign, FaSearch, FaEye, FaReceipt } from 'react-icons/fa';
import BlurCircle from '../../components/BlurCircle';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => 
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.show.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(booking => 
      statusFilter === 'all' || booking.isPaid === (statusFilter === 'paid')
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.user.name.localeCompare(b.user.name);
        case 'movie':
          return a.show.movie.title.localeCompare(b.show.movie.title);
        case 'amount':
          return b.amount - a.amount;
        case 'seats':
          return Object.keys(b.bookedSeats).length - Object.keys(a.bookedSeats).length;
        case 'date':
        default:
          return new Date(b.show.showDateTime) - new Date(a.show.showDateTime);
      }
    });

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
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
              All Bookings
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Manage and view all customer bookings and transactions
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by user or movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="movie">Sort by Movie</option>
                <option value="amount">Sort by Amount</option>
                <option value="seats">Sort by Seats</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-700/50 bg-gray-900/30">
            <div className="col-span-12 lg:col-span-4">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Booking Details</span>
            </div>
            <div className="col-span-4 lg:col-span-2 text-center">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Show Time</span>
            </div>
            <div className="col-span-4 lg:col-span-2 text-center">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Seats</span>
            </div>
            <div className="col-span-4 lg:col-span-2 text-center">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Amount</span>
            </div>
            <div className="col-span-12 lg:col-span-2 text-center">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Actions</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700/50">
            {filteredBookings.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-700/30 transition-all duration-300">
                {/* Booking Details */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={item.show.movie.poster_path} 
                      alt={item.show.movie.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <FaUser className="w-4 h-4 text-red-500" />
                          <h3 className="text-white font-semibold text-lg truncate">
                            {item.user.name}
                          </h3>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.isPaid 
                            ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                            : 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {item.isPaid ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaFilm className="w-3 h-3 text-red-500" />
                        <span className="truncate">{item.show.movie.title}</span>
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        Booking ID: <span className="text-gray-400 font-mono">#{index + 1}2345BD</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show Time */}
                <div className="col-span-4 lg:col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white font-semibold">
                      <FaCalendarAlt className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {dateFormate(item.show.showDateTime)}
                    </div>
                  </div>
                </div>

                {/* Seats */}
                <div className="col-span-4 lg:col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white font-semibold">
                      <FaChair className="w-4 h-4 text-red-500" />
                      {Object.keys(item.bookedSeats).length}
                    </div>
                    <div className="text-gray-400 text-xs mt-1 max-w-24 truncate">
                      {Object.keys(item.bookedSeats).join(', ')}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-4 lg:col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
                      <FaDollarSign className="w-4 h-4 text-green-500" />
                      {currency}{item.amount}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {item.isPaid ? 'Payment Complete' : 'Payment Pending'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-12 lg:col-span-2 flex items-center justify-center gap-2">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm">
                    <FaEye className="w-3 h-3" />
                    <span className="hidden lg:inline">View</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm">
                    <FaReceipt className="w-3 h-3" />
                    <span className="hidden lg:inline">Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTicketAlt className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'No bookings have been made yet'}
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-500">{filteredBookings.length}</div>
                <div className="text-gray-400 text-sm mt-1">Total Bookings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {filteredBookings.filter(b => b.isPaid).length}
                </div>
                <div className="text-gray-400 text-sm mt-1">Confirmed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {filteredBookings.filter(b => !b.isPaid).length}
                </div>
                <div className="text-gray-400 text-sm mt-1">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {filteredBookings.reduce((total, b) => total + Object.keys(b.bookedSeats).length, 0)}
                </div>
                <div className="text-gray-400 text-sm mt-1">Total Tickets</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {currency}{filteredBookings.reduce((total, b) => total + b.amount, 0).toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm mt-1">Total Revenue</div>
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

export default ListBookings;