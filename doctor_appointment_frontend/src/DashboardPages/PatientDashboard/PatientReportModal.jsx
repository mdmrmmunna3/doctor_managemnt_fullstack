
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { FaDownload } from 'react-icons/fa';

const PatientReportModal = ({ report, onClose }) => {
    const handleDownload = () => {
        const doc = new jsPDF();

        doc.setFillColor(240, 248, 255); // Light blue background
        doc.rect(0, 0, 210, 297, "F");

        // Set title
        doc.setFont("titel_content", "medium");
        doc.setFontSize(18);
        doc.text("Medical Prescription", 70, 10);

        // Add hospital/clinic info
        doc.setFontSize(12);
        doc.text("Instant Care - Health & Wellness", 70, 17);
        doc.line(10, 20, 200, 20);

        // Patient Details
        doc.setFontSize(14);
        doc.text("Patient Details", 10, 25);
        doc.setFontSize(12);
        let y = 32;
        doc.text(`Name: ${report?.name}`, 10, y);
        doc.text(`Age: ${report?.age}`, 10, y += 7);
        doc.text(`Email: ${report?.email}`, 10, y += 7);
        doc.text(`Phone: ${report?.phone}`, 10, y += 7);
        doc.text(`Address: ${report?.address}`, 10, y += 7);


        doc.line(10, y += 5, 200, y);

        // Vitals Section
        doc.setFontSize(14);
        doc.text("Vitals", 10, y += 7);
        doc.setFontSize(12);
        doc.text(`Temperature: ${report?.vitals?.temperature} °C`, 10, y += 7);
        doc.text(`Pulse: ${report?.vitals?.pulse} BPM`, 10, y += 7);
        doc.text(`SpO2: ${report?.vitals?.spO2} %`, 10, y += 7);
        doc.text(`Blood Pressure: ${report?.vitals?.bp} mmHg`, 10, y += 7);

        doc.line(10, y += 5, 200, y);

        // Medical History & Issues (Reduced spacing)
        doc.setFontSize(14);
        doc.text("Medical History & Issues", 10, y += 7);
        doc.setFontSize(12);
        doc.text(`History: ${report?.medicalHistory}`, 10, y += 5, { maxWidth: 180 });
        doc.text(`Critical Issues: ${report?.criticalIssues}`, 10, y += 5, { maxWidth: 180 });

        doc.line(10, y += 5, 200, y);

        // Diagnosis & Tests (Reduced spacing)
        doc.setFontSize(14);
        doc.text("Diagnosis & Tests", 10, y += 7);
        doc.setFontSize(12);
        doc.text(`Laboratory Tests: ${report?.laboratoryTests}`, 10, y += 5, { maxWidth: 180 });
        doc.text(`Diagnostics: ${report?.diagnostics}`, 10, y += 5, { maxWidth: 180 });

        doc.line(10, y += 5, 200, y); // Line break


        doc.setFontSize(14);
        doc.text("Medications & Dosage", 10, y += 7);
        doc.setFontSize(12);
        doc.text(`Medications: ${report?.medications}`, 10, y += 5, { maxWidth: 180 });
        doc.text(`Dosage: ${report?.dosageInstructions}`, 10, y += 5, { maxWidth: 180 });

        // Doctor's Notes & Footer
        doc.line(10, y += 5, 200, y);
        doc.setFontSize(14);
        doc.text("Doctor's Notes", 10, y += 7);
        doc.setFontSize(12);
        doc.text(`${report?.doctorNotes}`, 10, y += 5, { maxWidth: 180 });

        // Doctor Signature Section
        doc.text("Doctor Signature: ______________________", 10, y += 15);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, y);

        // Save the generated PDF
        doc.save('patient-report.pdf');
    };




    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                style={{
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 2px 12px',
                }}
                className="bg-[--primary-color] title_content rounded-lg p-6 max-w-screen-md md:ml-10 m-2 lg:mt-20 overflow-y-auto max-h-[80vh]">

                <div id='invoice_content'>
                    <h1 className="text-center text-4xl">Medical Prescription</h1>
                    <p className="text-center text-2xl mb-3">Instant Care - Health & Wellness</p>

                    {/* Patient Info */}
                    <div>
                        <h4 className="text-2xl font-medium mb-2">Patient Report</h4>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">Name:</span> {report.name}</p>
                            <p><span className="font-medium">Age:</span> {report.age}</p>
                            <p><span className="font-medium">Email:</span> {report.email}</p>
                            <p><span className="font-medium">Phone:</span> {report.phone}</p>
                            <p><span className="font-medium">Address:</span> {report.address}</p>
                        </div>
                        <div className="my-2"><hr /></div>
                    </div>

                    {/* Vitals */}
                    <div>
                        <h4 className="text-2xl font-medium mt-2">Vitals</h4>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">Temperature:</span> {report?.vitals?.temperature} °C</p>
                            <p><span className="font-medium">Pulse:</span> {report?.vitals?.pulse} BPM</p>
                            <p><span className="font-medium">SpO2:</span> {report?.vitals?.spO2} %</p>
                            <p><span className="font-medium">Blood Pressure:</span> {report?.vitals?.bp} mmHg</p>
                        </div>
                        <div className="my-2"><hr /></div>
                    </div>

                    {/* Medical History & Issues */}
                    <div>
                        <h4 className="text-2xl font-medium mt-2">Medical History & Issues</h4>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">Medical History:</span> {report.medicalHistory}</p>
                            <p><span className="font-medium">Critical Issues:</span> {report.criticalIssues}</p>
                        </div>
                        <div className="my-2"><hr /></div>
                    </div>

                    {/* Diagnostics & Tests */}
                    <div>
                        <h4 className="text-2xl font-medium mt-2">Diagnosis & Tests</h4>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                            <p><span className="font-medium">Laboratory Tests:</span> {report.laboratoryTests}</p>
                            <p><span className="font-medium">Diagnostics:</span> {report.diagnostics}</p>
                        </div>
                        <div className="my-2"><hr /></div>
                    </div>

                    {/* Medications */}
                    <div>
                        <h4 className="text-2xl font-medium mt-2">Medications & Dosage</h4>
                        <div className="grid lg:grid-cols-2 gap-2">
                            <p><span className="font-medium">Medications:</span> {report.medications}</p>
                            <p><span className="font-medium">Dosage:</span> {report.dosageInstructions}</p>
                        </div>
                        <div className="my-2"><hr /></div>
                    </div>

                    {/* Doctor's Notes */}
                    <div>
                        <h4 className="text-2xl font-medium mt-2">Doctor's Notes</h4>
                        <div className="">
                            <p><span className="font-medium"></span> {report.doctorNotes}</p>
                            <div className="grid grid-cols-2 gap-2">
                                <p>Doctor Signature: ______________________</p>
                                <p>Report Date: {new Date(report.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleDownload}
                        className="bg-[#17C3B2] text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaDownload />
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientReportModal;
