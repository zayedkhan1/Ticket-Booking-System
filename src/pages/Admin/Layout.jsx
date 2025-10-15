
import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Fixed Navbar */}
      <AdminNavbar />

      {/* Main Area */}
      <div className="relative flex pt-20">
        {/* Fixed Sidebar */}
        <div
          className="
            fixed top-0 left-0 h-full 
            z-50 lg:z-40   /* higher on small screens, normal on large */
          "
        >
          <AdminSidebar />
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 w-full p-6 lg:p-8 lg:ml-64">
          <main className="transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;







