import React from 'react';
import { Link } from 'react-router-dom';
import "./SharedButton.css";
import { GiArrowWings } from 'react-icons/gi';

const ShareButton = ({ children }) => {
    return (
        <div>
            <Link to='/' className='share_btn px-8 py-4'><span className='pr-3'><GiArrowWings /></span>
                <i className="animation"></i>{children}<i className="animation"></i>
            </Link>
        </div>
    );
};

export default ShareButton;
