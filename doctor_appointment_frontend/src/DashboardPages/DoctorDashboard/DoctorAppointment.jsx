import React, { useEffect, useState } from 'react';
import { useAxios } from '../../Hooks/AxiosProvider';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { FaCcMastercard, FaPhone, FaRegCalendarAlt } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import ShareButton from '../../components/ShareButton/ShareButton';
import Loader from '../../Pages/Shared/Loader/Loader';

const DoctorAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [logedUser, setLogedUser] = useState({});
    const axiosInstantApi = useAxios();
    const { getUserData } = useAuthApi();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Function to fetch the logged-in user
    const loggedUser = async () => {
        const res = await getUserData();
        setLogedUser(res);
    };

    // Fetch appointments after loggedUser is set
    const fetchAppointments = async (userId) => {
        try {
            const res = await axiosInstantApi.get('payments');
            const filteredAppointments = res?.data?.filter(
                (payment) => payment?.selected_service?.doctor?.id === userId
            );
            setAppointments(filteredAppointments);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loggedUser(); // First, fetch the user
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (logedUser?.id) {
            fetchAppointments(logedUser.id);
        }
    }, [logedUser]);

    // Function to handle patient click
    const handlePatientSelect = async (patientId, paymentId) => {
        try {
            const res = await axiosInstantApi.get(`users/${patientId}`);
            const patientData = res?.data;
            const paymentRes = await axiosInstantApi.get(`payments/${paymentId}`);
            const paymentData = paymentRes?.data;

            navigate(`/dashboard/doctorDashboard/doctorAppoint/${patientId}`, {
                state: { patientDetails: patientData, paymentDetails: paymentData }
            });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto h-screen">
                {isLoading ? (
                    <div><Loader /></div>
                ) : (
                    <div>
                        <h1 className="text-4xl font-medium mb-6 text-center titel">Appointment Information</h1>
                        <div
                            style={{
                                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                            }}
                            className="p-6 rounded-md"
                        >
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div
                                        key={appointment?.id}
                                        style={{
                                            boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                                        }}
                                        className="lg:flex p-4 rounded-lg shadow-md"
                                    >
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 titel_content">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`http://localhost:8000/storage/${appointment?.basic_info?.image}`}
                                                    alt={appointment?.basic_info?.name}
                                                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                                                />
                                                <div>
                                                    <h3>Patient: {appointment?.basic_info?.name}</h3>
                                                    <p>Age: {appointment?.basic_info?.age}</p>
                                                    <p className="flex items-center gap-3">
                                                        <span><FaPhone /></span> {appointment?.basic_info?.phone}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="">
                                                    🕒 {appointment?.selected_date_time?.date &&
                                                        new Date(appointment?.selected_date_time?.date).toLocaleString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })}
                                                </p>
                                                <p className=" flex gap-2 items-center">
                                                    <span><FaRegCalendarAlt /></span> Appointment Type | {appointment?.appointment_type}
                                                </p>
                                                <p className=" flex gap-2 items-center">
                                                    <span><MdMedicalServices /></span> {appointment?.selected_service?.service_name} - {appointment?.selected_service?.service_price}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="flex items-center gap-3">Card Holder: <span><FaCcMastercard /></span>{appointment?.card_holder}</p>
                                                <p className="flex items-center gap-3">Total Cost: <span><GiMoneyStack /></span>{appointment?.total_cost}</p>
                                                <p className="mt-2">
                                                    <span className="px-3 py-1 bg-green-500 rounded-sm font-bold text-white">{appointment?.payment_status}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <div
                                                onClick={() => handlePatientSelect(appointment?.basic_info?.patient_id, appointment?.id)}
                                                className=" text-white"
                                            >
                                                <ShareButton> View Patient Health Report</ShareButton>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointment;
