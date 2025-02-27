import React from 'react';
import work from "../../../assets/work/work.jpg";
import { Link } from 'react-router-dom';
import ShareButton from '../../../components/ShareButton/ShareButton';
const Blogs = () => {
    return (
        <div className='lg:px-16 md:px-10 p-5'>
            <div className="py-5">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-center titel">
                    Recent Blogs
                </h3>
                <p className="titel_content md:text-5xl text-3xl text-center pt-3">
                    Stay Updated With Our Latest Articles
                </p>
            </div>
            <div className='grid lg:grid-cols-2 gap-4'>

                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="grid md:grid-cols-2 gap-3 p-5 titel_content ">
                    <div className='relative overflow-hidden'>
                        <img
                            src={work}
                            className=" rounded-lg w-full h-full scaleImg" />
                        <p className='bg-white absolute text-2xl top-5 left-5 px-2 rounded-md text-black'><span>8</span> <span>Feb</span></p>
                    </div>
                    <div>
                        <p className='px-2 py-1 rounded-t-md text-xl bg-[#17C3B2] text-center font-medium text-white lg:w-44'>Neourology</p>
                        <p className="py-3 lg:line-clamp-2 text-xl">
                            Understanding and Preventing Glaucoma: A
                        </p>
                        <p className="pb-3 lg:line-clamp-2 line-clamp-1 text-xl">
                            Glaucoma is a leading cause of blind worldwide, yet many....
                        </p>
                    </div>

                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="grid md:grid-cols-2 gap-3 p-5 titel_content ">
                    <div className='relative overflow-hidden'>
                        <img
                            src={work}
                            className=" rounded-lg w-full h-full scaleImg" />
                        <p className='bg-white absolute text-2xl top-5 left-5 px-2 rounded-md text-black'><span>8</span> <span>Feb</span></p>
                    </div>
                    <div>
                        <p className='px-2 py-1 rounded-t-md text-xl bg-[#17C3B2] text-center font-medium text-white lg:w-44'>Cardiology</p>
                        <p className="py-3 line-clamp-2 text-xl">
                            Understanding and Preventing Glaucoma: A
                        </p>
                        <p className="pb-3 line-clamp-2 text-xl">
                            Glaucoma is a leading cause of blind worldwide, yet many....
                        </p>
                    </div>

                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="grid md:grid-cols-2 gap-3 p-5 titel_content ">
                    <div className='relative overflow-hidden'>
                        <img
                            src={work}
                            className=" rounded-lg w-full h-full scaleImg" />
                        <p className='bg-white absolute text-2xl top-5 left-5 px-2 rounded-md text-black'><span>8</span> <span>Feb</span></p>
                    </div>
                    <div>
                        <p className='px-2 py-1 rounded-t-md text-xl bg-[#17C3B2] text-center font-medium text-white lg:w-44'>Dentis</p>
                        <p className="py-3 line-clamp-2 text-xl">
                            Understanding and Preventing Glaucoma: A
                        </p>
                        <p className="pb-3 line-clamp-2 text-xl">
                            Glaucoma is a leading cause of blind worldwide, yet many....
                        </p>
                    </div>

                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="grid md:grid-cols-2 gap-3 p-5 titel_content ">
                    <div className='relative overflow-hidden'>
                        <img
                            src={work}
                            className=" rounded-lg w-full h-full scaleImg" />
                        <p className='bg-white absolute text-2xl top-5 left-5 px-2 rounded-md text-black'><span>8</span> <span>Feb</span></p>
                    </div>
                    <div>
                        <p className='px-2 py-1 rounded-t-md text-xl bg-[#17C3B2] text-center font-medium text-white lg:w-44'>Treatments</p>
                        <p className="py-3 line-clamp-2 text-xl">
                            Understanding and Preventing Glaucoma: A
                        </p>
                        <p className="pb-3 line-clamp-2 text-xl">
                            Glaucoma is a leading cause of blind worldwide, yet many....
                        </p>
                    </div>

                </div>

            </div>
            <div

                className='mt-5 uppercase text-center w-[300px] mx-auto'>
                <Link to='/blogs'><ShareButton >View All Blogs</ShareButton></Link>
            </div>
        </div>
    );
};

export default Blogs;