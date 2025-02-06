import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import processImg2 from "../../../assets/work/doctor.png";
// import quotes from "../../../assets/work/quotes.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import { RiDoubleQuotesR } from 'react-icons/ri';
const Testimonials = () => {
    return (
        <div className='lg:px-16 md:px-10 p-5'>
            <div className="py-5">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-center titel">
                    Testimonials
                </h3>
                <p className="titel_content md:text-5xl text-3xl text-center pt-3">
                    What Our Patient Says
                </p>
            </div>
            <Swiper
                loop={true}
                slidesPerView={2}
                spaceBetween={10}
                // centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    // 1024: {
                    //     slidesPerView: 2,
                    //     spaceBetween: 30,
                    // },
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='p-8 my-8 '>
                        <div className='titel_content'>
                            <div className='flex space-x-1 text-xl text-yellow-500'>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                            </div>
                            <p className='text-xl py-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nobis illo cum quam, mollitia veritatis eum non deserunt nihil ratione aut facilis voluptates numquam eligendi.</p>

                            <div className='flex justify-between items-end'>
                                <div className='flex items-center space-x-2'>
                                    <img src={processImg2} className='w-32 h-24' alt="solution" />
                                    <div className=''>
                                        <h5 className='text-2xl font-medium'>Munna</h5>
                                        <p className='text-xl'><small>Paitent</small></p>
                                    </div>
                                </div>
                                <span className='text-6xl text-[#17C3B2]'><RiDoubleQuotesR /></span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='p-8 my-8 '>
                        <div className='titel_content'>
                            <div className='flex space-x-1 text-xl text-yellow-500'>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                            </div>
                            <p className='text-xl py-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nobis illo cum quam, mollitia veritatis eum non deserunt nihil ratione aut facilis voluptates numquam eligendi.</p>

                            <div className='flex justify-between items-end'>
                                <div className='flex items-center space-x-2'>
                                    <img src={processImg2} className='w-32 h-24' alt="solution" />
                                    <div className=''>
                                        <h5 className='text-2xl font-medium'>Munna</h5>
                                        <p className='text-xl'><small>Paitent</small></p>
                                    </div>
                                </div>
                                <span className='text-6xl text-[#17C3B2]'><RiDoubleQuotesR /></span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='p-8 my-8 '>
                        <div className='titel_content'>
                            <div className='flex space-x-1 text-xl text-yellow-500'>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                                <span> <FaStar /></span>
                            </div>
                            <p className='text-xl py-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nobis illo cum quam, mollitia veritatis eum non deserunt nihil ratione aut facilis voluptates numquam eligendi.</p>

                            <div className='flex justify-between items-end'>
                                <div className='flex items-center space-x-2'>
                                    <img src={processImg2} className='w-32 h-24' alt="solution" />
                                    <div className=''>
                                        <h5 className='text-2xl font-medium'>Munna</h5>
                                        <p className='text-xl'><small>Paitent</small></p>
                                    </div>
                                </div>
                                <span className='text-6xl text-[#17C3B2]'><RiDoubleQuotesR /></span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Testimonials;