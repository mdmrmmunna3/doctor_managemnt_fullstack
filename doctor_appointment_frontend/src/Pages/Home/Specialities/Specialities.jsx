import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useAxios } from '../../../Hooks/AxiosProvider';

const Specialities = () => {
    const [specialities, setSpecialities] = useState([]);
    const axiosInstantApi = useAxios();
    const fetchSpecialities = async () => {
        try {
            const response = await axiosInstantApi.get("specialities");
            setSpecialities(response.data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSpecialities();
    }, []);

    return (
        <div className='lg:py-10 lg:px-16 md:p-10 p-6'>
            <h3 className='text-3xl md:text-4xl lg:text-5xl text-center titel'>Specialities</h3>
            <div className=''>
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
                            slidesPerView: 2,
                            spaceBetween: 30,
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
                    {
                        specialities?.map((speciality) => <SwiperSlide key={speciality?.id}>
                            <div
                                style={{
                                    boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                                }}
                                className='p-8 my-8 text-center'>
                                <div className='flex justify-center items-center'>
                                    <img src={`http://localhost:8000/storage/${speciality?.image}`} alt={speciality?.name} />
                                </div>
                                <p>{speciality?.name}</p>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div>

    );
};

export default Specialities;