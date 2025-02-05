import React from 'react';
import serviceImg1 from "../../../assets/services/calendar.png"
import serviceImg2 from "../../../assets/services/online-learning.png"
import serviceImg3 from "../../../assets/services/better-health.png"
import serviceImg4 from "../../../assets/services/lab-technician.png"
import serviceImg5 from "../../../assets/services/monitor.png"
import serviceImg6 from "../../../assets/services/prescription.png"

const WeProvide = () => {
    return (
        <div className='px-16'>
            <div className='py-5'>
                <h3 className='text-3xl md:text-4xl lg:text-5xl text-center titel'>Our Services</h3>
                <p className='titel_content md:text-5xl text-3xl text-center'>our madical service</p>
            </div>
            {/* <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
                {[serviceImg1, serviceImg2, serviceImg3, serviceImg4, serviceImg5, serviceImg6, serviceImg7].map((img, index) => (
                    <a key={index}
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                        <div className="relative z-10 titel_content">
                            <img src={img} alt="" />
                            <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Virtual Consultations</p>
                        </div>
                        <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                            <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                        </div>
                        <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                    </a>
                ))}

            </div> */}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg1} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Book Appointment</p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg2} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Virtual Consultations</p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg3} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Health Care</p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg4} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Lab Testing Service</p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a href="" className='hidden lg:flex'></a>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg5} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Health Monitoring </p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="block relative  bg-[--primary-color] rounded-lg p-[32px] [24px] m-3 text-decoration-none z-0 overflow-hidden group">
                    <div className="relative z-10 titel_content">
                        <div className='flex justify-center items-center'>
                            <img src={serviceImg6} alt="" className='h-32 ' />
                        </div>
                        <p className="text-2xl text-center font-normal leading-[20px] text-[secondary-color] hover:text-white">Prescription Services</p>
                    </div>
                    <div className="absolute flex items-center justify-center top-0 right-0 w-[32px] h-[32px] overflow-hidden bg-[#00838d] z-10 rounded-tr-[4px] rounded-bl-[32px]">
                        <div className="text-white text-[20px] font-[Courier, sans-serif]">→</div>
                    </div>
                    <div className="absolute top-[-16px] right-[-16px] bg-[#00838d] h-[32px] w-[32px] rounded-full scale-100 transition-transform duration-500 ease-out group-hover:scale-[28]"></div>
                </a>
                <a href="" className='hidden lg:flex'></a>
            </div>
        </div>
    );
};

export default WeProvide;