import React from "react";
import { FaCcMastercard, FaPhone, FaRegCalendarAlt, FaVideo } from "react-icons/fa";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { MdMedicalServices, MdSpatialAudioOff } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShareButton from "../../components/ShareButton/ShareButton";
import { IoIosMail } from "react-icons/io";
import { IoLogoWechat } from "react-icons/io5";

const PatientHealthReport = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { patientDetails, paymentDetails } = location.state || {};
    console.log(patientDetails, paymentDetails);
    if (!patientDetails || !paymentDetails) {
        return <div>No details found.</div>;
    }
    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };
    return (
        <div
            style={{
                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
            }}
            className="bg-[--primary-color] p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-medium titel flex justify-center items-center gap-3"><Link to='/dashboard/doctorDashboard/doctorAppoint/' ><FaArrowsSplitUpAndLeft /></Link> Appointment Details</h2>
            {paymentDetails.map((appointment) => (
                <div
                    key={appointment?.id}
                    style={{
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                    }}
                    className=" p-4 rounded-lg shadow-md"
                >
                    <div className="grid lg:grid-cols-2 gap-3 titel_content">
                        <div className="flex items-center gap-2">
                            <img
                                src={`http://localhost:8000/storage/${appointment?.basic_info?.image}`}
                                alt={appointment?.basic_info?.name}
                                className="w-20 h-20 rounded-full border-2 border-blue-500"
                            />
                            <div>
                                <h3>Patient: {appointment?.basic_info?.name}</h3>
                                <p className="flex items-center gap-3">
                                    <span><IoIosMail /></span> {appointment?.basic_info?.email}
                                </p>
                                <p className="flex items-center gap-3">
                                    <span><FaPhone /></span> {appointment?.basic_info?.phone}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
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
                            <div className="flex items-center space-x-3 text-2xl">
                                <MdSpatialAudioOff />
                                <FaVideo />
                                <IoLogoWechat />
                            </div>
                        </div>

                    </div>

                </div>
            ))}
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" readOnly value={patientDetails?.name || ''} type="text" placeholder="Patient Name" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" readOnly value={patientDetails?.email || ''} type="text" placeholder="Email" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" readOnly value={patientDetails?.age || ''} type="text" placeholder="Age " />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" readOnly value={patientDetails?.phone || ''} type="text" placeholder="Phone " />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="date" placeholder="D.O.B" />
                <textarea className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" readOnly value={patientDetails?.address || ''} name="address" id="address" placeholder="Address" rows={1}></textarea>
            </div>

            <h3 className="text-lg font-semibold mt-6">Vitals</h3>
            <div className="grid grid-cols-4 gap-4 mt-2">
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Temperature" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Pulse" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="SpO2" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="BP" />
            </div>

            <h3 className="text-lg font-semibold mt-6">Previous Medical History</h3>
            <textarea className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full" rows="3" placeholder="Enter details"></textarea>

            <h3 className="text-lg font-semibold mt-6">Critical Issues</h3>
            <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full" type="text" placeholder="Type Here" />

            <h3 className="text-lg font-semibold mt-6">Laboratory Tests</h3>
            <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full" type="text" placeholder="Type Here" />

            <h3 className="text-lg font-semibold mt-6">Diagnostics</h3>
            <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full" type="text" placeholder="Type Here" />

            <h3 className="text-lg font-semibold mt-6">Medications</h3>
            <div className="grid grid-cols-4 gap-4 mt-2">
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Name" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Dosage" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Duration" />
                <input className="bg-transparent border focus:border-[#17C3B2] p-2 rounded" type="text" placeholder="Schedule" />
            </div>

            <h3 className="text-lg font-semibold mt-6">Follow Up</h3>
            <textarea className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full" rows="3" placeholder="Enter details"></textarea>

            <div className="flex justify-end mt-6 space-x-4">
                <button onClick={handleCancel} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
                <button className="bg-blue-500 px-4 py-2 rounded">Save Patient Report</button>
            </div>
        </div>
    );
};

export default PatientHealthReport;
