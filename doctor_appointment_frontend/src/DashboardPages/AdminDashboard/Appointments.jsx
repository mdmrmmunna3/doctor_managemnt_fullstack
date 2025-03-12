import React, { useEffect, useState } from 'react';
import { useAxios } from '../../Hooks/AxiosProvider';
import { FaEdit } from 'react-icons/fa';

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const axiosInstantApi = useAxios();
    const fetchAppointments = async (userId) => {
        try {
            const res = await axiosInstantApi.get('payments');
            const filteredAppointments = res?.data?.map(
                (payment) => {
                    return payment;
                }
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
        fetchAppointments();
    }, []);

    console.log(appointments);

    return (
        <div className='h-screen'>
            <div className="overflow-x-auto  px-4">
                <h1 className="text-4xl font-medium mb-6 text-center titel">Appointment Information</h1>
                <table
                    style={{
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                    }}
                    className="min-w-full  shadow-lg rounded-lg border-separate">
                    <thead>
                        <tr className=" text-left">
                            <th className="px-6 py-3 text-sm font-semibold ">Doctor Name</th>
                            <th className="px-6 py-3 text-sm font-semibold ">Specialty</th>
                            <th className="px-6 py-3 text-sm font-semibold ">Patient Name</th>
                            <th className="px-6 py-3 text-sm font-semibold ">Appointment Time</th>
                            <th className="px-6 py-3 text-sm font-semibold ">Status</th>
                            <th className="px-6 py-3 text-sm font-semibold ">Amount</th>
                            {/* <th className="px-6 py-3 text-sm font-semibold ">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-2 text-sm  block lg:flex items-center">
                                    <img src={`http://localhost:8000/storage/${appointment?.selected_service?.doctor?.image}`}
                                        alt={appointment?.selected_service?.doctor?.name}
                                        className="w-12 h-12 rounded-full mr-3" />
                                    {appointment?.selected_service?.doctor?.name}
                                </td>
                                <td className="px-6 py-2 text-sm">{appointment?.selected_service?.specialty}</td>
                                <td className="px-6 py-2 text-sm block lg:flex items-center">
                                    <img src={`http://localhost:8000/storage/${appointment?.basic_info?.image}`}
                                        alt={appointment?.basic_info?.name}
                                        className="w-12 h-12 rounded-full mr-3" />
                                    {appointment?.basic_info?.name}
                                </td>
                                <td className="px-6 py-2  text-sm">
                                    <> 🕒 {appointment?.selected_date_time?.date &&
                                        new Date(appointment?.selected_date_time?.date).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        })}</>
                                </td>
                                <td className="px-6 py-2  text-sm">
                                    {/* <span className={`font-semibold ${appointment?.status === 'Scheduled' ? 'text-green-600' : appointment?.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {appointment?.status}
                                    </span> */}
                                    <span>Scheduled</span>
                                </td>
                                <td className="px-6 py-2  text-sm">{appointment?.total_cost}</td>
                                {/* <td className="px-6 py-2 text-lg cursor-pointer" >
                                    <span className='flex items-center gap-2'>  <FaEdit />Invoice</span>
                                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Appointments;