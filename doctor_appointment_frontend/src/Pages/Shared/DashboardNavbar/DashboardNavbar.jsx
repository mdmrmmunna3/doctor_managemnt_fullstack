import React from 'react';
import { GiBoomerangSun } from 'react-icons/gi';
import { MdNightsStay } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useToogleTheme from '../../../Hooks/useToogleTheme';

const DashboardNavbar = () => {
    const [isDarkMode, handleToggleTheme] = useToogleTheme();
    return (
        <div >
            <div
                style={{
                    boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                }}
                className="navbar bg-[--primary-color] text-[--secondary-color] shadow-md fixed py-5 z-30">
                <div className="lg:ml-72 ml-16 flex-1">
                    <Link to='/' className=" text-3xl titel">Instant Care</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <div onClick={handleToggleTheme} className=''>
                            <p>{isDarkMode ? <GiBoomerangSun className='w-6 h-6' /> : <MdNightsStay className='w-6 h-6' />}</p>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[--secondary-color] text-[--primary-color] rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;