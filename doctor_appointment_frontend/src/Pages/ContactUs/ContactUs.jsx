import React from 'react';
import ShareBanner from '../../components/ShareBanner/ShareBanner';
import contactBg from "../../assets/banner/cont.jpeg";
const ContactUs = () => {
    return (
        <div>
            <ShareBanner bgImage={contactBg} title='Contact Us'>Contact</ShareBanner>
        </div>
    );
};

export default ContactUs;