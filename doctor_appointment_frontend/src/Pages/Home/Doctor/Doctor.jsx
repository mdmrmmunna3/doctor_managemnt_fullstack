import React, { useEffect, useState } from 'react';
import ShareButton from '../../../components/ShareButton/ShareButton';
import { FaGraduationCap } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../../../Hooks/AxiosProvider';

const Doctor = () => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const axiosInstantApi = useAxios();

    const fetchDoctorData = async () => {
        try {
            const res = await axiosInstantApi.get('doctors');
            const fetchdata = res?.data.map((doc) => doc?.user);
            setDoctors(fetchdata);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    }

    useEffect(() => {
        fetchDoctorData();
    }, []);

    const handleBookNowClick = (doctorId) => {
        if (!token) {
            // Pass the current route as state when navigating to login
            navigate('/login', { state: { from: `/appointsystem/${doctorId}` } });
        } else {
            // If the user is authenticated, navigate to the appointment system
            navigate(`/appointsystem/${doctorId}`);
        }
    };

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
                {
                    doctors.map((doctor) => <div key={doctor?.id}>
                        <div
                            style={{
                                boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                            }}
                            className="card shadow-xl p-5 transform transition-transform duration-500 hover:-translate-y-2">
                            <div className='flex justify-center items-center'>
                                <img className='h-[200px] w-full '
                                    src={`http://localhost:8000/storage/${doctor?.image}`} alt={doctor?.name} />
                            </div>
                            <div className="titel_content">
                                <div className='pb-2 flex justify-between'>
                                    <div>
                                        <h4 className='text-2xl'>{doctor?.name}</h4>
                                        <p className='text-xl py-2'>{doctor?.specialty}</p>
                                        <p className='flex items-center space-x-2 text-xl'><span><FaGraduationCap /></span> <span>{doctor?.qualification}</span></p>
                                    </div>
                                    <h4 className='text-xl'>Fees: <span>{doctor?.fees}</span></h4>
                                </div>
                                <div className='flex justify-between items-center pb-5'>
                                    <p className='flex items-center space-x-2'><span><MdLocationPin /></span><span>{doctor?.address}</span></p>
                                    <p className='px-2 py-1 rounded-t-md text-[#17C3B2] bg-slate-50'>Available</p>
                                </div>
                                <div className="text-center">
                                    {
                                        role === 'admin' || role === 'doctor' ? (
                                            <div className='hidden'><ShareButton width="100%">Book Now</ShareButton></div>
                                        ) : (
                                            <div onClick={() => handleBookNowClick(doctor?.id)}>
                                                <ShareButton width="100%">Book Now</ShareButton>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className='mt-5 uppercase text-center w-[300px] mx-auto'>
                <Link to='/'><ShareButton>View All Doctors</ShareButton></Link>
            </div>
        </div>
    );
};

export default Doctor;
