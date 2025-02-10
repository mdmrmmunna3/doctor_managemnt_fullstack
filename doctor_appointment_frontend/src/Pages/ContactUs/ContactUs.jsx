import React from 'react';
import ShareBanner from '../../components/ShareBanner/ShareBanner';
import contactBg from "../../assets/banner/cont.jpeg";
const ContactUs = () => {
    return (
        <div className='pt-16'>
            <ShareBanner bgImage={contactBg} title='Contact Us'>Contact</ShareBanner>
        </div>
    );
};

export default ContactUs;