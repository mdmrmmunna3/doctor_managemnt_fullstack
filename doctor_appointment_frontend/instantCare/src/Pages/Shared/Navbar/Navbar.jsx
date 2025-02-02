import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);  // State to control menu open/close on mobile
    const navOptions = (
        <>
            <li><NavLink to='/' className="hover:text-blue-500 active:text-blue-700 ">Home</NavLink></li>
            <li><NavLink to='/about' className="hover:text-blue-500 active:text-blue-700 ">About</NavLink></li>
            <li><NavLink to='/service' className="hover:text-blue-500 active:text-blue-700 ">Service</NavLink></li>
            <li><NavLink to='/blogs' className="hover:text-blue-500 active:text-blue-700 transition-all">Blogs</NavLink></li>
            <li><NavLink to='/contact' className="hover:text-blue-500 active:text-blue-700 ">Contact</NavLink></li>
            <li><NavLink to='/login' className="style_btn">Login</NavLink></li>
            <li><NavLink to='/register' className="style_btn">Register</NavLink></li>

        </>
    );

    return (
        <div className="bg-black shadow-lg">
            <div className="navbar max-w-screen-xl mx-auto py-4 px-6">
                {/* Left side logo and dropdown for mobile */}
                <div className="navbar-start flex items-center">
                    <div className="dropdown lg:hidden">
                        <button
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost text-white lg:hidden p-2"
                            onClick={() => setIsOpen(!isOpen)} // Toggle the menu on click
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>

                        {/* Mobile Menu */}
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-full p-4 shadow-lg ${isOpen ? "block" : "hidden"}`}
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-white text-2xl font-semibold">InstantCare Doct</a>
                </div>

                {/* Centered navigation links for large screens */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-8 text-white text-lg font-medium">
                        {navOptions}
                    </ul>
                </div>

                {/* Right side buttons or extra content (if needed) */}
                {/* <div className="navbar-end">
                    <a className="btn text-white">Button</a>
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;



// bg-gradient-to-r from-blue-500 via-teal-500 to-green-500