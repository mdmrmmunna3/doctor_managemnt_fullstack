import React, { useEffect, useState } from 'react';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { useAxios } from '../../Hooks/AxiosProvider';
import Loader from '../../Pages/Shared/Loader/Loader';
import { GiMoneyStack } from 'react-icons/gi';
import { FaCcMastercard, FaPhone, FaRegCalendarAlt } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';

const MyPatient = () => {
    const [patients, setPatients] = useState([]);
    const [logedUser, setLogedUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const axiosInstantApi = useAxios();
    const { getUserData } = useAuthApi();

    // Get logged-in user data
    const loggedUser = async () => {
        const res = await getUserData();
        setLogedUser(res);
    };

    // Fetch payments data
    const fetchPayments = async (userId) => {
        try {
            const res = await axiosInstantApi.get('payments');
            const payments = res?.data;

            const doctorPayments = payments.filter(
                (payment) => payment?.selected_service?.doctor?.id === userId
            );

            const patientMap = new Map();

            doctorPayments.forEach(payment => {
                const patientId = payment?.basic_info?.patient_id;
                if (!patientMap.has(patientId) || new Date(payment.selected_date_time?.date) > new Date(patientMap.get(patientId).selected_date_time?.date)) {
                    patientMap.set(patientId, payment);
                }
            });

            const uniquePatients = Array.from(patientMap.values()).map(payment => ({
                id: payment?.basic_info?.patient_id,
                name: payment?.basic_info?.name,
                age: payment?.basic_info?.age,
                phone: payment?.basic_info?.phone,
                image: payment?.basic_info?.image,
                email: payment?.basic_info?.email,
                selected_date_time: payment?.selected_date_time,
                appointment_type: payment?.appointment_type,
                selected_service: payment?.selected_service,
                card_holder: payment?.card_holder,
                total_cost: payment?.total_cost,
                payment_status: payment?.payment_status,
            }));

            setPatients(uniquePatients);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loggedUser();  // Fetch logged-in user data
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (logedUser?.id) {
            fetchPayments(logedUser.id);
        }
    }, [logedUser]);

    return (
        <div className='h-screen'>
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
                            {patients.map((patient) => (
                                <div
                                    key={patient?.id}
                                    style={{
                                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                                    }}
                                    className=" p-4 rounded-lg shadow-md"
                                >
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 titel_content">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={`http://localhost:8000/storage/${patient?.image}`}
                                                alt={patient?.name}
                                                className="w-14 h-14 rounded-full border-2 border-blue-500"
                                            />
                                            <div>
                                                <h3>Patient: {patient?.name}</h3>
                                                <p>Age: {patient?.age}</p>
                                                <p className="flex items-center gap-3">
                                                    <span><FaPhone /></span> {patient?.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="">
                                                🕒 {patient?.selected_date_time?.date &&
                                                    new Date(patient?.selected_date_time?.date).toLocaleString('en-US', {
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
                                                <span><FaRegCalendarAlt /></span> Appointment Type | {patient?.appointment_type}
                                            </p>
                                            <p className=" flex gap-2 items-center">
                                                <span><MdMedicalServices /></span> {patient?.selected_service?.service_name} - {patient?.selected_service?.service_price}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-3">Card Holder: <span><FaCcMastercard /></span>{patient?.card_holder}</p>
                                            <p className="flex items-center gap-3">Total Cost: <span><GiMoneyStack /></span>{patient?.total_cost}</p>
                                            <p className="mt-2">
                                                <span className="px-3 py-1 bg-green-500 rounded-sm font-bold text-white">{patient?.payment_status}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPatient;
