import React, { useEffect, useState } from 'react';
import { FaCcMastercard, FaPhone, FaRegCalendarAlt, FaVideo, FaFileInvoice } from 'react-icons/fa';
import { FaArrowsSplitUpAndLeft } from 'react-icons/fa6';
import { GiMoneyStack } from 'react-icons/gi';
import { MdMedicalServices, MdSpatialAudioOff } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosMail } from 'react-icons/io';
import { IoLogoWechat } from 'react-icons/io5';
import { useAxios } from '../../Hooks/AxiosProvider';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';

import bgimg from "../../assets/specialize/healthcare.png";

const PatientHealthReport = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstantApi = useAxios();
    const { patientDetails, paymentDetails } = location.state || {};
    // console.log(paymentDetails);

    const [paymentId, setPaymentId] = useState(paymentDetails?.[0]?.id || '');
    const [invoiceId, setInvoiceId] = useState(generateRandomInvoiceId());
    const [patientReport, setPatientReport] = useState(null);

    const [formData, setFormData] = useState({
        user_id: patientDetails?.id || '',
        name: patientDetails?.name || '',
        email: patientDetails?.email || '',
        age: patientDetails?.age || '',
        phone: patientDetails?.phone || '',
        address: patientDetails?.address || '',
        payment_id: Number(paymentId) || '',
        vitals: {
            temperature: '',
            pulse: '',
            spO2: '',
            bp: '',
        },
        medicalHistory: '',
        criticalIssues: '',
        laboratoryTests: '',
        diagnostics: '',
        followUp: '',
        medications: '',
        dosageInstructions: '',
        doctorNotes: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    console.log(bgimg)
    useEffect(() => {
        if (paymentDetails?.length > 0) {
            setPaymentId(paymentDetails[0]?.id || '');
            setFormData(prevData => ({
                ...prevData,
                payment_id: paymentDetails[0]?.id || '',
            }));
        }
    }, [paymentDetails]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const res = await axiosInstantApi.post('patient_report', formData);
            setFormData(res?.data);
            navigate('/dashboard/doctorDashboard/doctorAppoint');
            Swal.fire({
                title: "Patient Preciption Create Successfully",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        } catch (error) {
            console.log('Error saving report', error.response);
            alert('Error saving report');
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    if (!patientDetails || !paymentDetails) {
        return <div>No details found.</div>;
    }

    function generateRandomInvoiceId() {
        return 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // get patient report data 
    const fetchPatientReport = async (paymentId) => {
        try {
            const res = await axiosInstantApi.get(`patient_report/${paymentId}`);
            // console.log(res?.data);
            setPatientReport(res?.data);
        } catch (error) {
            // console.error('Error fetching patient report:', error.response || error);
        }
    }
    useEffect(() => {
        if (paymentId) {
            fetchPatientReport(paymentId);
        }
    }, [paymentId]);

    const downloadPrescription = () => {
        const doc = new jsPDF();


        doc.addImage(bgimg, 'PNG', 0, 0, 210, 297);

        doc.setFillColor(240, 248, 255); // Light blue background
        doc.rect(0, 0, 210, 297, "F");

        // Set title
        doc.setFont("titel_content", "medium");
        doc.setFontSize(18);
        doc.text("Medical Prescription", 70, 10);

        // Add hospital/clinic info
        doc.setFontSize(12);
        doc.text("XYZ Hospital - Health & Wellness", 70, 17);
        doc.line(10, 20, 200, 20); // Horizontal line for separation

        // Patient Details
        doc.setFontSize(14);
        doc.text("Patient Details", 10, 30);
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${invoiceId}`, 10, 38);
        doc.text(`Name: ${patientReport?.report?.name}`, 10, 45);
        doc.text(`Age: ${patientReport?.report?.age}`, 10, 52);
        doc.text(`Email: ${patientReport?.report?.email}`, 10, 59);
        doc.text(`Phone: ${patientReport?.report?.phone}`, 10, 66);
        doc.text(`Address: ${patientReport?.report?.address}`, 10, 73);

        // Line break
        doc.line(10, 78, 200, 78);

        // Vitals Section
        doc.setFontSize(14);
        doc.text("Vitals", 10, 85);
        doc.setFontSize(12);
        doc.text(`Temperature: ${patientReport?.report?.vitals?.temperature} °C`, 10, 93);
        doc.text(`Pulse: ${patientReport?.report?.vitals?.pulse} BPM`, 10, 100);
        doc.text(`SpO2: ${patientReport?.report?.vitals?.spO2} %`, 10, 107);
        doc.text(`Blood Pressure: ${patientReport?.report?.vitals?.bp} mmHg`, 10, 114);

        doc.line(10, 120, 200, 120); // Line break

        // Medical History & Issues
        doc.setFontSize(14);
        doc.text("Medical History & Issues", 10, 125);
        doc.setFontSize(12);
        doc.text(`History: ${patientReport?.report?.medicalHistory}`, 10, 135, { maxWidth: 180 });
        doc.text(`Critical Issues: ${patientReport?.report?.criticalIssues}`, 10, 150, { maxWidth: 180 });

        doc.line(10, 165, 200, 165); // Line break

        // Diagnosis & Tests
        doc.setFontSize(14);
        doc.text("Diagnosis & Tests", 10, 170);
        doc.setFontSize(12);
        doc.text(`Laboratory Tests: ${patientReport?.report?.laboratoryTests}`, 10, 180, { maxWidth: 180 });
        doc.text(`Diagnostics: ${patientReport?.report?.diagnostics}`, 10, 195, { maxWidth: 180 });

        doc.line(10, 210, 200, 210); // Line break

        // Medications
        doc.setFontSize(14);
        doc.text("Medications & Dosage", 10, 215);
        doc.setFontSize(12);
        doc.text(`Medications: ${patientReport?.report?.medications}`, 10, 225, { maxWidth: 180 });
        doc.text(`Dosage: ${patientReport?.report?.dosageInstructions}`, 10, 240, { maxWidth: 180 });

        // Doctor's Notes & Footer
        doc.line(10, 255, 200, 255); // Line break
        doc.setFontSize(14);
        doc.text("Doctor's Notes", 10, 260);
        doc.setFontSize(12);
        doc.text(`${patientReport?.report?.doctorNotes}`, 10, 270, { maxWidth: 180 });

        // Doctor Signature Section
        doc.text("Doctor Signature: ______________________", 10, 285);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 285);

        // Save the generated PDF
        doc.save(`Prescription-${invoiceId}.pdf`);
    };



    return (
        <div
            style={{
                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
            }}
            className="bg-[--primary-color] p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <img src={bgimg} alt="" />
            <h2 className="text-4xl font-medium titel flex justify-center items-center gap-3 mb-3">
                <Link to="/dashboard/doctorDashboard/doctorAppoint/">
                    <FaArrowsSplitUpAndLeft />
                </Link>
                Appointment Details
            </h2>
            {paymentDetails.map((appointment) => (
                <div
                    style={{
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                    }}
                    key={appointment?.id} className="p-4 rounded-lg shadow-md">
                    <div className="grid lg:grid-cols-2 gap-3 titel_content ">
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
                                <p>
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
                                <p className="flex gap-2 items-center">
                                    <span><FaRegCalendarAlt /></span> Appointment Type | {appointment?.appointment_type}
                                </p>
                                <p className="flex gap-2 items-center">
                                    <span><MdMedicalServices /></span> {appointment?.selected_service?.service_name} - {appointment?.selected_service?.service_price}
                                </p>
                            </div>
                            <div className="flex items-center space-x-3 text-2xl">
                                {
                                    appointment?.appointment_type === 'video' ? (
                                        <FaVideo />
                                    ) : appointment?.appointment_type === 'audio' ? (
                                        <MdSpatialAudioOff />
                                    ) : (
                                        <IoLogoWechat />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="hidden" value={patientDetails?.id} />
                <input type="hidden" value={paymentId} />
                <input
                    className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                    readOnly
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                    type="text"
                    placeholder="Patient Name"
                />
                <input
                    className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                    readOnly
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                />
                <input
                    className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                    value={formData.age}
                    onChange={handleInputChange}
                    name="age"
                    type="text"
                    placeholder="Age"
                />
                <input
                    className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    type="text"
                    placeholder="Phone"
                />
                <input
                    className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    type="text"
                    placeholder="Address"
                />
            </div>

            {
                patientReport ? (
                    <div className="flex justify-center items-center my-3 bg-[--primary-color] ">
                        <div className='border text-center p-3 rounded-sm tooltip hover:bg-green-500 hover:text-white' data-tip='Dwonload prescription'>
                            <FaFileInvoice
                                className="cursor-pointer  text-2xl flex justify-center items-center"
                                onClick={() => downloadPrescription(formData)} // Trigger download
                            />
                            <span></span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-semibold mt-6">Vitals</h3>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-2">
                            <input
                                className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                                value={formData?.vitals?.temperature || ''}
                                onChange={handleInputChange}
                                name="vitals.temperature"
                                type="text"
                                placeholder="Temperature"
                            />
                            <input
                                className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                                value={formData?.vitals?.pulse || ''}
                                onChange={handleInputChange}
                                name="vitals.pulse"
                                type="text"
                                placeholder="Pulse"
                            />
                            <input
                                className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                                value={formData?.vitals?.spO2 || ''}
                                onChange={handleInputChange}
                                name="vitals.spO2"
                                type="text"
                                placeholder="SpO2"
                            />
                            <input
                                className="bg-transparent border focus:border-[#17C3B2] p-2 rounded"
                                value={formData?.vitals?.bp || ''}
                                onChange={handleInputChange}
                                name="vitals.bp"
                                type="text"
                                placeholder="BP"
                            />
                        </div>

                        <h3 className="text-lg font-semibold mt-6">Medical History</h3>
                        <textarea
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.medicalHistory || ''}
                            onChange={handleInputChange}
                            name="medicalHistory"
                            rows="3"
                            placeholder="Enter details"
                        ></textarea>

                        <h3 className="text-lg font-semibold mt-6">Critical Issues</h3>
                        <input
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.criticalIssues || ''}
                            onChange={handleInputChange}
                            name="criticalIssues"
                            type="text"
                            placeholder="Type Here"
                        />

                        <h3 className="text-lg font-semibold mt-6">Laboratory Tests</h3>
                        <input
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.laboratoryTests || ''}
                            onChange={handleInputChange}
                            name="laboratoryTests"
                            type="text"
                            placeholder="Type Here"
                        />

                        <h3 className="text-lg font-semibold mt-6">Diagnostics</h3>
                        <input
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.diagnostics || ''}
                            onChange={handleInputChange}
                            name="diagnostics"
                            type="text"
                            placeholder="Type Here"
                        />

                        <h3 className="text-lg font-semibold mt-6">Follow Up</h3>
                        <textarea
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.followUp || ''}
                            onChange={handleInputChange}
                            name="followUp"
                            rows="3"
                            placeholder="Enter details"
                        ></textarea>

                        <h3 className="text-lg font-semibold mt-6">Medications</h3>
                        <textarea
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.medications || ''}
                            onChange={handleInputChange}
                            name="medications"
                            rows="3"
                            placeholder="List of medications"
                        ></textarea>

                        <h3 className="text-lg font-semibold mt-6">Dosage Instructions</h3>
                        <textarea
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.dosageInstructions || ''}
                            onChange={handleInputChange}
                            name="dosageInstructions"
                            rows="3"
                            placeholder="Dosage instructions for medications"
                        ></textarea>

                        <h3 className="text-lg font-semibold mt-6">Doctor's Notes</h3>
                        <textarea
                            className="bg-transparent border focus:border-[#17C3B2] p-2 rounded w-full"
                            value={formData.doctorNotes || ''}
                            onChange={handleInputChange}
                            name="doctorNotes"
                            rows="3"
                            placeholder="Any additional notes from the doctor"
                        ></textarea>

                        <div className="flex justify-end mt-6 space-x-4">
                            <button onClick={handleCancel} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded">Save Patient Report</button>
                        </div>
                    </div>
                )
            }




        </div>
    );
};

export default PatientHealthReport;
