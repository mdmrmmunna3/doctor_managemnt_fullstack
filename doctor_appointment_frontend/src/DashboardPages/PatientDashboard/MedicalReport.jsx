import React, { useEffect, useState } from 'react';
import Loader from '../../Pages/Shared/Loader/Loader';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { useAxios } from '../../Hooks/AxiosProvider';
import { MdMedicalServices } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import PatientReportModal from './PatientReportModal';

const MedicalReport = () => {
    const [logedUser, setLogedUser] = useState({});
    const axiosInstantApi = useAxios();
    const { getUserData } = useAuthApi();
    const [isLoading, setIsLoading] = useState(true);
    const [patientReports, setPatientReports] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null); // For managing selected report
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

    // Get logged user
    const fetchLoggedUser = async () => {
        try {
            const res = await getUserData();
            setLogedUser(res);
        } catch (error) {
            console.error('Error fetching Logged user:', error.response || error);
        }
    };

    // Get patient report data
    const fetchPatientReport = async (logedUser) => {
        if (!logedUser?.id) {
            return;
        }

        try {
            const res = await axiosInstantApi.get(`patient_report`);
            const filteredReports = res?.data.filter(report => report?.user_id === logedUser?.id);
            setPatientReports(filteredReports);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching patient report:', error.response || error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLoggedUser();
    }, []);

    useEffect(() => {
        if (logedUser?.id) {
            fetchPatientReport(logedUser);
        }
    }, [logedUser]);

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null); // Reset selected report when modal is closed
    };

    return (
        <div>
            <div className="h-screen">
                <h2 className="text-4xl titel font-medium text-center mb-4">Medical Reports</h2>
                {
                    isLoading ? (
                        <div><Loader /></div>
                    ) :
                        patientReports.length > 0 ? (
                            <div>
                                <div
                                    style={{
                                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                                    }}
                                    className="p-6 rounded-md">
                                    <div className="space-y-4">
                                        {patientReports.map((report) => (
                                            <div
                                                style={{
                                                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                                                }}
                                                key={report?.id}
                                                className="lg:flex p-4 rounded-lg shadow-md"
                                            >
                                                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 titel_content">

                                                    <div>
                                                        <p className="text-lg"> Patient Name: <span className='uppercase'>{report?.name}</span></p>
                                                        <p className="text-lg"> Patient Age: <span className='uppercase'>{report?.age}</span></p>
                                                        <p className="text-lg"> Patient Email: <span className=''>{report?.email}</span></p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg"> Patient Phone: <span className=''>{report?.phone}</span></p>
                                                        <p className="text-lg"> 🕒 {report?.created_at &&
                                                            new Date(report?.created_at).toLocaleString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                            })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg flex items-center gap-2"><span><MdMedicalServices /></span> {report?.medications}</p>
                                                        <p className="text-lg"><span>Medical History : </span> {report?.medicalHistory}</p>
                                                        <p>Laboratory Tests: {report?.laboratoryTests}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-center text-center mt-3">
                                                    <div
                                                        onClick={() => handleViewReport(report)}
                                                        className=" text-white bg-[#17C3B2] rounded-sm cursor-pointer flex items-center justify-center gap-3 py-2 px-3"
                                                    >
                                                        <span><FaRegEye /></span>
                                                        Report
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-xl text-gray-500">
                                No appointments found
                            </div>
                        )
                }
            </div>

            {/* Modal for viewing and downloading the report */}
            {isModalOpen && <PatientReportModal report={selectedReport} onClose={closeModal} />}
        </div>
    );
};

export default MedicalReport;
