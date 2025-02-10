import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    // Hide header and footer only on the login and registration pages
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
    return (
        <div>
            {!hideHeaderFooter && <Navbar></Navbar>}
            <Outlet></Outlet>
            {!hideHeaderFooter && <Footer></Footer>}
        </div>
    );
};

export default Main;