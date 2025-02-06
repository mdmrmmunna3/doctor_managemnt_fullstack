import React from 'react';
import backgroundImage from "../../../assets/about/doctor-shape-img2.png";
import processImg from "../../../assets/work/—Pngtree—female and male doctors pointing_20287153.png";
import processImg1 from "../../../assets/work/find.png";
import processImg2 from "../../../assets/work/doctor.png";
import processImg3 from "../../../assets/services/calendar.png";
import processImg4 from "../../../assets/work/business-idea.png";
const WorkProcess = () => {
    return (
        <div className='relative lg:px-16 pb-8 md:px-10 p-5'>
            <div className="py-5">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-center titel">
                    How We Work
                </h3>
                <p className="titel_content md:text-5xl text-3xl text-center pt-3">
                    Our Working Process
                </p>
            </div>
            <div className='lg:flex gap-4'>
                <div className='flex justify-center items-center'>
                    <img src={processImg} className='h-[400px] lg:w-[800px]' alt="work process" />
                </div>
                <div>
                    <h4 className='titel_content md:text-4xl text-3xl text-center pt-3 pb-5'>4 easy steps to get your solution</h4>
                    <div className="grid md:grid-cols-2 gap-y-5 gap-x-3">

                        <div className='flex justify-center items-center space-x-2'>
                            <img src={processImg1} className='w-32 h-24' alt="solution" />
                            <div className='titel_content'>
                                <h5 className='text-2xl '>Search Doctor</h5>
                                <p className='text-xl'><small>Search for a doctor based on specialization, location, or availability.</small></p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <img src={processImg2} className='w-32 h-24' alt="solution" />
                            <div className='titel_content'>
                                <h5 className='text-2xl '>Check Doctor Profile</h5>
                                <p className='text-xl'><small>Explore detailed doctor profiles on our platform to make informed healthcare decisions.</small></p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <img src={processImg3} className='w-32 h-24' alt="solution" />
                            <div className='titel_content'>
                                <h5 className='text-2xl '>Schedule Appointment</h5>
                                <p className='text-xl'><small>After choose your preferred doctor, select a convenient time slot, & confirm your appointment..</small></p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <img src={processImg4} className='w-32 h-24' alt="solution" />
                            <div className='titel_content'>
                                <h5 className='text-2xl '>Get Your Solution</h5>
                                <p className='text-xl'><small>Discuss your health concerns with the doctor and receive personalized advice & solution.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', bottom: '0', right: '10px', position: 'absolute' }}
                className='p-32'></div>
        </div>
    );
};

export default WorkProcess;