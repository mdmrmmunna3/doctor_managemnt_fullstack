import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import CountUp from "react-countup";

const AdminDashboard = () => {
    const stats = [
        { icon: "👥", end: 1000, label: "Happy Patients", formattedEnd: "1k" },
        { icon: "👨‍⚕️", end: 150, label: "Expert Doctors" },
        { icon: "🎟️", end: 450, label: "Appointment" },
        { icon: "💵", end: 65723, label: "Revenue", decimals: 1 },
    ];
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
        <div className=''>
            <h1 className="text-4xl font-semibold mb-6 text-center titel">Welcome To Admin Dashboard</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5  p-5">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 shadow-md"
                        style={{ boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px` }}
                    >
                        <span className="text-4xl">{stat.icon}</span>
                        <h2 className="text-3xl font-bold mt-2">
                            {/* {stat.formattedEnd ? stat.formattedEnd : <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} />}+ */}
                            <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} />
                        </h2>
                        <p className=" mt-1 text-lg">{stat.label}</p>
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

export default AdminDashboard;