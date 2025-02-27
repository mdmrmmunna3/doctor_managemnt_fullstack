import React from 'react';
import './Loader.css';
const Loader = () => {
    return (
        <div className='flex justify-center items-center relative overflow-hidden py-5 h-screen'>
            <div className='loader'></div>
        </div>
    );
};

export default Loader;