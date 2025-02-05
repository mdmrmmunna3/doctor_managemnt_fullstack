import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import specialitesImg1 from "../../../assets/specialize/brain.png"
import specialitesImg2 from "../../../assets/specialize/healthcare.png"
import specialitesImg3 from "../../../assets/specialize/orthopedics.png"
import specialitesImg4 from "../../../assets/specialize/dentis.png"
import specialitesImg5 from "../../../assets/specialize/heart.png"
const Specialities = () => {
    return (
        <div className='py-10 px-16'>
            <Swiper
                loop={true}
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg1} className='h-32' alt="" /></div>
                        <p>Neurology</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg5} className='h-32' alt="" /></div>
                        <p>Cardiology</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg2} className='h-32' alt="" /></div>
                        <p>Urology</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg3} className='h-32' alt="" /></div>
                        <p>Orthopedic</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg4} className='h-32' alt="" /></div>
                        <p>Dentist</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                        className='p-8 my-8 text-center'>
                        <div><img src={specialitesImg3} className='h-32' alt="" /></div>
                        <p>Orthopedic</p>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Specialities;