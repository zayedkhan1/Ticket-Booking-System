import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaFilm, 
    FaTachometerAlt, 
    FaVideo, 
    FaUsers, 
    FaTicketAlt, 
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { images } from '../../assets/assets';

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const user={
        firstName:'Admin',
        lastName:'user',
        imageUrl:images.profile,
    }

    const navItems = [
        { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/admin/add-shows', icon: FaFilm, label: 'Add Shows ' },
        { path: '/admin/list-shows', icon: FaCalendarAlt, label: 'List Shows' },
        { path: '/admin/list-bookings', icon: FaTicketAlt, label: 'List Bookings' },

    ];

    return (
        <>
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:sticky top-0 left-0 h-screen z-50 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/50
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-20' : 'w-64'}
                backdrop-blur-xl
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                   
                    
                   

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex items-center justify-center w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                    >
                        {isCollapsed ? (
                            <FaChevronRight className="w-4 h-4 text-white" />
                        ) : (
                            <FaChevronLeft className="w-4 h-4 text-white" />
                        )}
                    </button>
                </div>
                
                {/* user profile */}
                  

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-2">
                    <div className='flex flex-col items-center justify-start md:justify-center'>
                    <img className='w-10 h-10 rounded-full  ' src={user.imageUrl} alt="" />
                   <p className='text-gray-300'>{user.firstName} {user.lastName} </p>
                </div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105
                                ${isActive 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`} />
                            {!isCollapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer - Logout */}
                {/* <div className="p-4 border-t border-gray-800/50">
                    <button className={`
                        flex items-center gap-3 w-full p-3 text-gray-400 hover:text-white hover:bg-red-600/20 rounded-xl
                        transition-all duration-300 transform hover:scale-105
                        ${isCollapsed ? 'justify-center' : ''}
                    `}>
                        <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="font-medium">Logout</span>
                        )}
                    </button>
                </div> */}

                {/* Collapse Hint for Mobile */}
                <div className="lg:hidden p-4 border-t border-gray-800/50">
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="flex items-center justify-center w-full p-2 text-gray-500 hover:text-white transition-colors"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Mobile Toggle Button when collapsed */}
            {isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="fixed bottom-4 left-4 z-50 lg:hidden w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110"
                >
                    <FaChevronRight className="w-4 h-4 text-white" />
                </button>
            )}
        </>
    );
};

export default AdminSidebar;