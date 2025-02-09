import React from 'react';
import ShareBanner from '../../components/ShareBanner/ShareBanner';
import blogBg from "../../assets/banner/service.jpg";
import Blogs from '../Home/Blogs/Blogs';
const OurBlogs = () => {
    return (
        <div>
            <ShareBanner bgImage={blogBg} title='Our Blogs'>Blogs</ShareBanner>
            <Blogs></Blogs>
        </div>
    );
};

export default OurBlogs;