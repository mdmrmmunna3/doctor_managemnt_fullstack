import React, { useEffect, useState } from 'react';
import CountUp from "react-countup";
import { useAxios } from '../../Hooks/AxiosProvider';
import { useAuthApi } from '../../Hooks/useAuthApi';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [logedUser, setLogedUser] = useState({});
    const axiosInstantApi = useAxios();
    const { getUserData } = useAuthApi();
    const [isLoading, setIsLoading] = useState(true);

    // Get logged in user
    const loggedUser = async () => {
        const res = await getUserData();
        setLogedUser(res);
    }

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

    // Calculate statistics from appointments
    const getStatistics = () => {
        const completeAppointment = appointments?.filter(appointment => appointment?.payment_status === 'paid').length;
        const upcomingAppointments = appointments?.filter(appointment => new Date(appointment.selected_date_time.date) > new Date()).length;
        const cancelledAppointments = appointments?.filter(appointment => appointment?.payment_status === 'cancelled').length;
        const totalAppointments = appointments?.length;

        // Count unique patients
        const uniquePatients = [...new Set(appointments.map(appointment => appointment.basic_info.patient_id))];
        const uniquePatientCount = uniquePatients.length;

        return [
            { icon: "👥", end: uniquePatientCount, label: "All Patients" },
            { icon: "🎟️", end: totalAppointments, label: "Appointments" },
            { icon: "📅", end: upcomingAppointments, label: "Upcoming" },
            { icon: "❌", end: cancelledAppointments, label: "Cancelled" },
        ];
    }

    const stats = getStatistics();

    const [state, setState] = React.useState({

        series: [{
            name: 'Revenue1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Revenue2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2025-09-19T00:00:00.000Z", "2025-09-19T01:30:00.000Z", "2025-09-19T02:30:00.000Z", "2025-09-19T03:30:00.000Z", "2025-09-19T04:30:00.000Z", "2025-09-19T05:30:00.000Z", "2025-09-19T06:30:00.000Z"]
            },
            title: {
                text: "Revenue",
                align: "left",
                style: {
                    fontSize: "16px",
                    color: "#666"
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },

        // status part 
        series2: [
            {
                name: "Doctor",
                data: [100, 30, 90, 50, 120]
            },
            {
                name: "Patient",
                data: [10, 50, 120, 90, 150]
            }
        ],
        options2: {
            chart: {
                height: 350,
                type: "line"
            },
            stroke: {
                width: 3,
                curve: "smooth"
            },
            markers: {
                size: 5
            },
            xaxis: {
                categories: ["2015", "2016", "2017", "2018", "2019"]
            },
            title: {
                text: "Status",
                align: "left",
                style: {
                    fontSize: "16px",
                    color: "#666"
                }
            },
            colors: ["#003f7f", "#f4a200"]
        }


    });

    return (
        <div className='h-screen'>
            <h2>Welcome to Doctor Dashboard</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 p-5">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 shadow-md"
                        style={{ boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px` }}
                    >
                        <span className="text-4xl">{stat.icon}</span>
                        <h2 className="text-3xl font-bold mt-2">
                            <CountUp end={stat.end} duration={2.5} />
                        </h2>
                        <p className="mt-1 text-lg">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className='grid md:grid-cols-2 gap-3'>
                <div id="chart">

                    <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
                </div>
                <div>
                    <Chart options={state.options2} series={state.series2} type="line" height={350} />
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
