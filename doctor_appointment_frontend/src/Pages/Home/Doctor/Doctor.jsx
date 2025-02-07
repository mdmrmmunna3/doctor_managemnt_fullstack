import React from 'react';
import ShareButton from '../../../components/ShareButton/ShareButton';
import doctor1 from "../../../assets/work/find.png"
import { FaGraduationCap } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Doctor = () => {
    return (
        <div className='lg:px-16 pb-8 md:px-10 p-5'>
            <div className="py-5">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-center titel">
                    Our Team
                </h3>
                <p className="titel_content md:text-5xl text-3xl text-center pt-3">
                    Meet Our expert doctor
                </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="card shadow-xl p-5">
                    <div className='flex justify-center items-center'>
                        <img className='h-[200px] w-full'
                            src={doctor1}
                            alt="doctor img" />
                    </div>
                    <div className="titel_content">
                        <div className='pb-2'>
                            <h4 className='text-2xl'>Munna</h4>
                            <p className='text-xl py-2'>Orthopedic</p>

                            <p className='flex items-center space-x-2 text-xl'><span><FaGraduationCap /></span> <span className=''>MBBS, FCPS, FRCS</span></p>

                        </div>
                        <div className='flex justify-between items-center pb-5'>
                            <p className='flex items-center space-x-2'><span><MdLocationPin /></span><span>Dhaka, Bangaldesh</span></p>
                            <p className='px-2 py-1 rounded-t-md text-[#17C3B2] bg-slate-50'>Available</p>
                        </div>
                        <div className="text-center">
                            {/* Pass the width directly as a prop */}
                            <ShareButton width="100%">Book Now</ShareButton>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="card shadow-xl p-5">
                    <div className='flex justify-center items-center'>
                        <img className='h-[200px] w-full'
                            src={doctor1}
                            alt="doctor img" />
                    </div>
                    <div className="titel_content">
                        <div className='pb-2'>
                            <h4 className='text-2xl'>Munna</h4>
                            <p className='text-xl py-2'>Orthopedic</p>

                            <p className='flex items-center space-x-2 text-xl'><span><FaGraduationCap /></span> <span className=''>MBBS, FCPS, FRCS</span></p>

                        </div>
                        <div className='flex justify-between items-center pb-5'>
                            <p className='flex items-center space-x-2'><span><MdLocationPin /></span><span>Dhaka, Bangaldesh</span></p>
                            <p className='px-2 py-1 rounded-t-md text-[#17C3B2] bg-slate-50'>Available</p>
                        </div>
                        <div className="text-center">
                            {/* Pass the width directly as a prop */}
                            <ShareButton width="100%">Book Now</ShareButton>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="card shadow-xl p-5">
                    <div className='flex justify-center items-center'>
                        <img className='h-[200px] w-full'
                            src={doctor1}
                            alt="doctor img" />
                    </div>
                    <div className="titel_content">
                        <div className='pb-2'>
                            <h4 className='text-2xl'>Munna</h4>
                            <p className='text-xl py-2'>Orthopedic</p>

                            <p className='flex items-center space-x-2 text-xl'><span><FaGraduationCap /></span> <span className=''>MBBS, FCPS, FRCS</span></p>

                        </div>
                        <div className='flex justify-between items-center pb-5'>
                            <p className='flex items-center space-x-2'><span><MdLocationPin /></span><span>Dhaka, Bangaldesh</span></p>
                            <p className='px-2 py-1 rounded-t-md text-[#17C3B2] bg-slate-50'>Available</p>
                        </div>
                        <div className="text-center">
                            {/* Pass the width directly as a prop */}
                            <ShareButton width="100%">Book Now</ShareButton>
                        </div>
                    </div>
                </div>
            </div>

            <div

                className='mt-5 uppercase text-center w-[300px] mx-auto'>
                <Link to='/'><ShareButton >View All Dcotors</ShareButton></Link>
            </div>
        </div>
    );
};

export default Doctor;
