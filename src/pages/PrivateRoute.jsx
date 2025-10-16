import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../Context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    if (user) {
        return children;
    } else {
        return <Navigate to="/login" state={location.pathname}></Navigate>;
    }
};

export default PrivateRoute;