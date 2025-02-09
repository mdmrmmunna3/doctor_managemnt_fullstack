import React from 'react';
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ShareBanner = ({ children, bgImage, title }) => {
    const bannerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };
    return (
        <div style={bannerStyle} className='relative'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-[#00000099]'></div>
            <div className='flex flex-col justify-center items-center h-full relative z-[1] text-white'>
                <h3 className='titel lg:text-6xl md:text-4xl text-3xl'>{title}</h3>
                <p className='titel_content text-2xl flex items-center space-x-2'>
                    <Link to='/'><span className='hover:text-[#17C3B2]'>Home</span></Link> <span><RiArrowLeftDoubleLine /></span> <span className=''>{children}</span>
                </p>
            </div>
        </div>
    );
};

export default ShareBanner;

// rgb color
// rgba(0, 0, 0, 0.7) → #000000B3
// rgba(0, 0, 0, 0.6) → #00000099
// rgba(0, 0, 0, 0.5) → #00000080