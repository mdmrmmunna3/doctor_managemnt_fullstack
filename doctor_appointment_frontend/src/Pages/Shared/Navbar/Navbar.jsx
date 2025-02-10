import React, { useState } from 'react';
import { GiBoomerangSun } from 'react-icons/gi';
import { MdNightsStay } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import useToogleTheme from '../../../Hooks/useToogleTheme';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, handleToggleTheme] = useToogleTheme();

    const navOptions = (
        <>
            <li><NavLink to='/' className="hover:bg-transparent ">Home</NavLink></li>
            <li><NavLink to='/about' className="hover:bg-transparent ">About</NavLink></li>
            <li><NavLink to='/service' className="hover:bg-transparent ">Service</NavLink></li>
            <li><NavLink to='/blogs' className="hover:bg-transparent ">Blogs</NavLink></li>
            <li><NavLink to='/contact' className="hover:bg-transparent ">Contact</NavLink></li>
            <li onClick={handleToggleTheme} className='hover:bg-transparent'>
                <p>{isDarkMode ? <GiBoomerangSun className='w-6 h-6' /> : <MdNightsStay className='w-6 h-6' />}</p>
            </li>
            <li><NavLink to='/login' className="style_btn">Login</NavLink></li>
            <li><NavLink to='/register' className="style_btn">Register</NavLink></li>
        </>
    );

    return (
        <div className="bg-[--primary-color] text-[--secondary-color] shadow-md fixed z-[1000] w-full">
            <div className="navbar max-w-screen-xl mx-auto py-4 px-6">
                {/* Left side logo */}
                <div className="navbar-start w-full">
                    <Link to='/' className="text-[--secondary-color] text-3xl font-semibold titel">InstantCare Doct</Link>
                </div>

                {/* Hamburger menu - Only visible on small screens */}
                <div className="lg:hidden mt-2">
                    <button
                        aria-label="Toggle menu"
                        className="btn btn-ghost text-[--secondary-color] p-2"
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

                        className="fixed inset-0 bg-[--primary-color] bg-opacity-70 z-20"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Fullscreen mobile menu (Stacked Layout) */}
                <div style={{
                    // boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`
                    // boxShadow: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px`
                    boxShadow: `#17c3b226 0px 2px 4px 0px, #17c3b226 0px 2px 16px 0px`

                }}
                    className={`fixed top-0 left-0 w-full pb-10 bg-[--primary-color]  bg-opacity-95 z-30 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        } flex flex-col items-start justify-start pt-6`}
                >
                    <div className="flex justify-between items-center px-6 w-full">
                        <Link to='/' className="text-[--secondary-color] text-3xl font-semibold titel pb-10 lg:pb-0">InstantCare Doct</Link>
                        <button
                            aria-label="Close menu"
                            className="text-[--secondary-color] text-3xl pb-10 lg:pb-0"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col space-y-2 ps-8 text-[--secondary-color] text-lg font-medium w-full menu titel_content">
                        {navOptions}
                    </ul>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex items-center mt-4">
                    <ul className="menu menu-horizontal space-x-5 text-[--secondary-color] text-lg font-medium titel_content">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;









// bg-gradient-to-r from-blue-500 via-teal-500 to-green-500