import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favourite from './pages/Favourite';
import { Toaster } from 'react-hot-toast';
import Login from './Authintication/Login';
import Register from './Authintication/Register';
import Layout from './pages/Admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import AddShows from './pages/Admin/AddShows';
import ListShows from './pages/Admin/ListShows';
import ListBookings from './pages/Admin/ListBookings';

const App = () => {


  const location=useLocation();
  const hideNavFooterRoutes=location.pathname.startsWith('/admin') ||
                            location.pathname === '/login' ||
                            location.pathname === '/register';
  
  
  return (
    <>
    <Toaster></Toaster>

    {!hideNavFooterRoutes && <Navbar></Navbar>}
     <Routes>
       <Route path='/' element={<Home></Home>} ></Route>
       <Route path='/movies' element={<Movies></Movies>} ></Route>
       <Route path='movies/:id' element={<MovieDetails></MovieDetails>} ></Route>
       <Route path='/movies/:id/:date' element={<SeatLayout></SeatLayout>} ></Route>
       <Route path='/my-bookings' element={<MyBookings></MyBookings>} ></Route>
       <Route path='/favourites' element={<Favourite></Favourite>} ></Route>
       <Route path='/login' element={<Login></Login>} ></Route>
       <Route path='/register' element={<Register></Register>} ></Route>
       <Route path='/admin/*' element={<Layout></Layout>}>
          <Route index element={<Dashboard></Dashboard>}  ></Route>
          <Route path='add-shows' element={<AddShows></AddShows>}></Route>
          <Route path='list-shows' element={<ListShows></ListShows>}></Route>
          <Route path='list-bookings' element={<ListBookings></ListBookings>}></Route>
       </Route>
     </Routes>


      {!hideNavFooterRoutes && <Footer></Footer>}

    </>
  );
};

export default App;