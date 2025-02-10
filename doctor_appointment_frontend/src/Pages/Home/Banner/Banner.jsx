import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bannerBg from "../../../assets/banner/ban-bg.png"
import doctorImg1 from "../../../assets/banner/banner-img.png"
import doctorImg2 from "../../../assets/banner/banner-fifteen-ryt.png"
import circle from "../../../assets/banner/circle.png"
import circle2 from "../../../assets/banner/ban-fift-icon2.png"
import img3 from "../../../assets/banner/banner-img1.svg"
import arrowImg from "../../../assets/banner/down-arrow-img.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import "./Banner.css";
import ShareButton from '../../../components/ShareButton/ShareButton';
const Banner = () => {
    return (
        <div className='pt-16'>
            <Swiper
                loop={true}
                effect='fade'
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                speed={1000}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{ backgroundImage: `url(${bannerBg})`, objectFit: 'cover', backgroundColor: '#f9fcff', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className='relative zoom-effect'>
                            {/* circle img start */}
                            <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" />
                            {/* <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" /> */}
                            {/* circle img end */}
                            <div className='md:flex justify-between space-x-5 space-y-5 p-6 md:p-16 titel_content'>
                                <div className='flex flex-col items-start lg:pt-[10%] md:pt-[15%] pt-[10%]'>
                                    <h3 className='lg:text-5xl md:text-3xl text-2xl text-black'>Consult <span className='text-[#17C3B2] font-medium lg:leading-[60px] md:leading-10 leading-5'>Best Doctors</span> <br />  Your Nearby Location.</h3>
                                    <p className='lg:text-3xl md:text-2xl text-xl md:py-6 py-3 text-black'>Embark on your healing journey with Doccure</p>
                                    <div className='relative'>
                                        <ShareButton>Make an Appointment</ShareButton>
                                        <img src={arrowImg} className='w-[110px] absolute right-[-40%] top-0' alt="" />
                                    </div>
                                </div>
                                {/* circle img start */}
                                <img className='roate_img2 absolute lg:bottom-32 lg:right-28 md:right-16 md:bottom-24 bottom-5 w-20' src={circle2} alt="" />
                                <img className='roate_img3 w-[300px] h-[200px] absolute lg:right-[25%] md:right-36 md:top-[40%] bottom-0' src={img3} alt="" />
                                {/* circle img end */}
                                <div>
                                    <img src={doctorImg1} className='lg:h-[600px]' alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: `url(${bannerBg})`, objectFit: 'cover', backgroundColor: '#f9fcff', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className='relative zoom-effect'>
                            {/* circle img start */}
                            <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" />
                            {/* <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" /> */}
                            {/* circle img end */}
                            <div className='md:flex justify-between space-x-5 space-y-5 p-6 md:p-16 titel_content'>
                                <div className='flex flex-col items-start lg:pt-[10%] md:pt-[15%] pt-[10%]'>
                                    <h3 className='lg:text-5xl md:text-3xl text-2xl text-black'>We Are <span className='text-[#17C3B2] font-medium lg:leading-[60px] md:leading-10 leading-5'>Committed </span> <br />  To Your Health</h3>
                                    <p className='lg:text-3xl md:text-2xl text-xl md:py-6 py-3 text-black'>Embark on your healing journey with Doccure</p>
                                    <div className='relative'>
                                        <ShareButton>Make an Appointment</ShareButton>
                                        <img src={arrowImg} className='w-[110px] absolute right-[-40%] top-0' alt="" />
                                    </div>
                                </div>
                                {/* circle img start */}
                                <img className='roate_img2 absolute lg:bottom-32 lg:right-28 md:right-16 md:bottom-24 bottom-5 w-20' src={circle2} alt="" />
                                <img className='roate_img3 w-[300px] h-[200px] absolute lg:right-[25%] md:right-36 md:top-[40%] bottom-0' src={img3} alt="" />
                                {/* circle img end */}
                                <div>
                                    <img src={doctorImg2} className='lg:h-[600px]' alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: `url(${bannerBg})`, objectFit: 'cover', backgroundColor: '#f9fcff', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className='relative zoom-effect'>
                            {/* circle img start */}
                            <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" />
                            {/* <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" /> */}
                            {/* circle img end */}
                            <div className='md:flex justify-between space-x-5 space-y-5 p-6 md:p-16 titel_content'>
                                <div className='flex flex-col items-start lg:pt-[10%] md:pt-[15%] pt-[10%]'>
                                    <h3 className='lg:text-5xl md:text-3xl text-2xl text-black'>Consult <span className='text-[#17C3B2] font-medium lg:leading-[60px] md:leading-10 leading-5'>Best Doctors</span> <br />  Your Nearby Location.</h3>
                                    <p className='lg:text-3xl md:text-2xl text-xl md:py-6 py-3 text-black'>Embark on your healing journey with Doccure</p>
                                    <div className='relative'>
                                        <ShareButton>Make an Appointment</ShareButton>
                                        <img src={arrowImg} className='w-[110px] absolute right-[-40%] top-0' alt="" />
                                    </div>
                                </div>
                                {/* circle img start */}
                                <img className='roate_img2 absolute lg:bottom-32 lg:right-28 md:right-16 md:bottom-24 bottom-5 w-20' src={circle2} alt="" />
                                <img className='roate_img3 w-[300px] h-[200px] absolute lg:right-[25%] md:right-36 md:top-[40%] bottom-0' src={img3} alt="" />
                                {/* circle img end */}
                                <div>
                                    <img src={doctorImg1} className='lg:h-[600px]' alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: `url(${bannerBg})`, objectFit: 'cover', backgroundColor: '#f9fcff', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className='relative zoom-effect'>
                            {/* circle img start */}
                            <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" />
                            {/* <img className='roate_img absolute md:left-10 right-5 top-5 md:top-10' src={circle} alt="" /> */}
                            {/* circle img end */}
                            <div className='md:flex justify-between space-x-5 space-y-5 p-6 md:p-16 titel_content'>
                                <div className='flex flex-col items-start lg:pt-[10%] md:pt-[15%] pt-[10%]'>
                                    <h3 className='lg:text-5xl md:text-3xl text-2xl text-black'>We Are <span className='text-[#17C3B2] font-medium lg:leading-[60px] md:leading-10 leading-5'>Committed </span> <br />  To Your Health</h3>
                                    <p className='lg:text-3xl md:text-2xl text-xl md:py-6 py-3 text-black'>Embark on your healing journey with Doccure</p>
                                    <div className='relative'>
                                        <ShareButton>Make an Appointment</ShareButton>
                                        <img src={arrowImg} className='w-[110px] absolute right-[-40%] top-0' alt="" />
                                    </div>
                                </div>
                                {/* circle img start */}
                                <img className='roate_img2 absolute lg:bottom-32 lg:right-28 md:right-16 md:bottom-24 bottom-5 w-20' src={circle2} alt="" />
                                <img className='roate_img3 w-[300px] h-[200px] absolute lg:right-[25%] md:right-36 md:top-[40%] bottom-0' src={img3} alt="" />
                                {/* circle img end */}
                                <div>
                                    <img src={doctorImg2} className='lg:h-[600px]' alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;