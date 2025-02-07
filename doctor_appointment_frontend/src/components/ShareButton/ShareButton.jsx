import React from 'react';
import { Link } from 'react-router-dom';
import "./SharedButton.css";
import { GiArrowWings } from 'react-icons/gi';

const ShareButton = ({ children, width }) => {
    return (
        <div className="w-full">
            <div className="share_btn" style={{ width: width }}>
                <span className='pr-3'><GiArrowWings /></span>
                <i className="animation"></i>{children}<i className="animation"></i>
            </div>
        </div>
    );
};

export default ShareButton;
