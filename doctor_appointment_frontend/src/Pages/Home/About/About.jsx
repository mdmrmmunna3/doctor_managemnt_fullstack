import React from 'react';
import bannerBg from "../../../assets/banner/doctor-shape-img1.png"
import bannerBg2 from "../../../assets/banner/doctor-shape-img2.png"
import aboutImg1 from "../../../assets/about/about-img3.jpg"
import aboutImg2 from "../../../assets/about/about-img2.jpg"
import aboutImg3 from "../../../assets/about/about-img1.jpg"
import circle from "../../../assets/banner/circle.png"

const About = () => {

    return (
        <div
            style={{ backgroundImage: `url(${bannerBg})`, backgroundRepeat: 'no-repeat' }}
            className='lg:p-16 md:p-10 p-5 relative overflow-hidden'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl text-center titel'>About Us</h2>
            <div className='grid md:grid-cols-2 gap-5 pt-5'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <img src={aboutImg1} className='rounded-md' alt="" />
                        <img src={aboutImg2} className='rounded-md' alt="" />
                    </div>
                    <div>
                        <div className='flex justify-center items-center'>

                            <img className='w-full md:w-[100px] roate_img' src={circle} alt="" />
                        </div>
                        <img className='rounded-md mt-4' src={aboutImg3} alt="" />
                    </div>
                </div>
                <div className='titel_content'>
                    <h3 className='lg:text-4xl md:text-3xl text-2xl '>We Are Always Ensure Best Medical Treatment For Your Health</h3>
                    <p className='leading-8 py-5 text-xl '>At Instant Care, our mission is to transform healthcare accessibility by simplifying the process of finding and booking appointments with qualified professionals, ensuring timely and efficient care when you need it most.</p>
                    <p className='leading-8 text-xl flex md:hidden lg:flex'>Our envision a world where healthcare is seamlessly accessible to all. Whether you need
                        routine check-ups, specialized consultations, or urgent care, we are committed to connecting
                        you with the right medical professionals quickly and easily.</p>
                </div>
            </div>
            <div
                style={{ backgroundImage: `url(${bannerBg})`, backgroundRepeat: 'no-repeat', bottom: '0', right: '10px', position: 'absolute' }}
                className='p-16'></div>
        </div>
    );
};

export default About;