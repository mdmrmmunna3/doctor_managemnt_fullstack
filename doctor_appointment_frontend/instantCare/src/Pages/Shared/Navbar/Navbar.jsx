import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navOptions = (
        <>
            <li><NavLink to='/' className="hover:text-white active:text-blue-700">Home</NavLink></li>
            <li><NavLink to='/about' className="hover:text-white active:text-blue-700">About</NavLink></li>
            <li><NavLink to='/service' className="hover:text-white active:text-blue-700">Service</NavLink></li>
            <li><NavLink to='/blogs' className="hover:text-white active:text-blue-700">Blogs</NavLink></li>
            <li><NavLink to='/contact' className="hover:text-white active:text-blue-700">Contact</NavLink></li>
            <li><NavLink to='/login' className="style_btn">Login</NavLink></li>
            <li><NavLink to='/register' className="style_btn">Register</NavLink></li>
        </>
    );

    return (
        <div className="bg-black shadow-md">
            <div className="navbar max-w-screen-xl mx-auto py-4 px-6">
                {/* Left side logo */}
                <div className="navbar-start w-full">
                    <Link to='/' className="text-white text-3xl font-semibold titel">InstantCare Doct</Link>
                </div>

                {/* Hamburger menu - Only visible on small screens */}
                <div className="lg:hidden mt-2">
                    <button
                        aria-label="Toggle menu"
                        className="btn btn-ghost text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 z-20"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Fullscreen mobile menu (Stacked Layout) */}
                <div
                    className={`fixed top-0 left-0 w-full pb-10 bg-black bg-opacity-95 z-30 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        } flex flex-col items-start justify-start pt-6`}
                >
                    <div className="flex justify-between items-center px-6 w-full">
                        <Link to='/' className="text-white text-3xl font-semibold titel pb-10 lg:pb-0">InstantCare Doct</Link>
                        <button
                            aria-label="Close menu"
                            className="text-white text-3xl pb-10 lg:pb-0"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col space-y-6 ps-8 text-white text-lg font-medium w-full">
                        {navOptions}
                    </ul>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex items-center mt-4">
                    <ul className="menu menu-horizontal space-x-8 text-white text-lg font-medium">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;









// bg-gradient-to-r from-blue-500 via-teal-500 to-green-500