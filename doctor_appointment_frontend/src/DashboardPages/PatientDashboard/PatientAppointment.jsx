import React, { useEffect, useState } from 'react';
import { useAxios } from '../../Hooks/AxiosProvider';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ShareButton from '../../components/ShareButton/ShareButton';
import Loader from '../../Pages/Shared/Loader/Loader';
import { MdMedicalServices } from 'react-icons/md';

const PatientAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [logedUser, setLogedUser] = useState({});
    const axiosInstantApi = useAxios();
    const { getUserData } = useAuthApi();
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch the logged-in user
    const loggedUser = async () => {
        const res = await getUserData();
        // console.log(res);
        setLogedUser(res);
    }

    // Fetch appointments after loggedUser is set
    const fetchAppointments = async (userId) => {
        try {
            const res = await axiosInstantApi.get('payments');
            const filteredAppointments = res?.data?.filter(
                (payment) => payment?.basic_info?.patient_id === userId
            );
            setAppointments(filteredAppointments);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

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

    console.log(appointments);

    return (
        <div className="h-screen">
            {
                isLoading ? (
                    <div><Loader /></div>
                ) :
                    <div>
                        <h2 className="text-4xl titel font-medium text-center mb-4">My Appointments</h2>
                        <div
                            style={{
                                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                            }}
                            className="p-6  rounded-md">
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div
                                        style={{
                                            boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                                        }}
                                        key={appointment?.id}
                                        className="lg:flex p-4 rounded-lg shadow-md"
                                    >
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-3 titel_content">
                                            <div className='flex items-center gap-2'>
                                                <img
                                                    src={`http://localhost:8000/storage/${appointment?.selected_service?.doctor?.image}`}
                                                    alt={appointment?.selected_service?.doctor?.name}
                                                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                                                />
                                                <div>
                                                    <h3>Dr.{appointment?.selected_service?.doctor?.name}</h3>
                                                    <p>{appointment?.selected_service?.doctor?.specialty}</p>
                                                    <p>{appointment?.selected_service?.doctor?.qualification}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {/* <p className="">  {appointment?.selected_date_time?.date &&
                                                new Date(appointment?.selected_date_time?.date).toLocaleDateString()}</p> */}
                                                <p className="text-lg"> 🕒 {appointment?.selected_date_time?.date &&
                                                    new Date(appointment?.selected_date_time?.date).toLocaleString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                    })}</p>
                                                <p className="text-lg flex gap-2 items-center"><span><FaRegCalendarAlt /></span>Appointment Type | {appointment?.appointment_type}</p>
                                            </div>
                                            <div>
                                                <p className="text-lg flex items-center gap-2"><span><MdMedicalServices /></span> {appointment?.selected_service?.service_name}</p>
                                                <p className="text-lg"><span>Service Price: $</span> {appointment?.selected_service?.service_price}</p>
                                                <p>Total Cost: $ {appointment?.total_cost}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {/* <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">Attend</button> */}
                                            <ShareButton width='100%'>Attend</ShareButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default PatientAppointment;
