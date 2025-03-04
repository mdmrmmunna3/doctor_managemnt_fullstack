import React, { useEffect, useState } from 'react';
import { useAxios } from '../../Hooks/AxiosProvider';
import Loader from '../../Pages/Shared/Loader/Loader';

const PatientList = () => {
    const [isLoading, setIsLoading] = useState(true);
    // const patients = [
    //     {
    //         "patientId": "P001",
    //         "patientName": "Md. Ariful Islam",
    //         "age": 45,
    //         "phone": "+8801234567890",
    //         "address": "House 22, Road 15, Dhanmondi, Dhaka",
    //         "lastVisit": "2025-02-01",
    //         "paid": true
    //     },
    //     {
    //         "patientId": "P002",
    //         "patientName": "Shahnaz Begum",
    //         "age": 30,
    //         "phone": "+8801987654321",
    //         "address": "House 10, Block C, Bashundhara R/A, Dhaka",
    //         "lastVisit": "2025-02-10",
    //         "paid": false
    //     },
    //     {
    //         "patientId": "P003",
    //         "patientName": "Rashedul Hasan",
    //         "age": 62,
    //         "phone": "+8801122334455",
    //         "address": "74/1, Green Road, Dhaka",
    //         "lastVisit": "2025-01-15",
    //         "paid": true
    //     },
    //     {
    //         "patientId": "P004",
    //         "patientName": "Nusrat Jahan",
    //         "age": 52,
    //         "phone": "+8801098765432",
    //         "address": "House 3, Road 10, Uttara, Dhaka",
    //         "lastVisit": "2025-02-05",
    //         "paid": false
    //     },
    //     {
    //         "patientId": "P005",
    //         "patientName": "Md. Shahinur Rahman",
    //         "age": 38,
    //         "phone": "+8801555123456",
    //         "address": "Block E, Bashabo, Rampura, Dhaka",
    //         "lastVisit": "2025-01-30",
    //         "paid": true
    //     },
    //     {
    //         "patientId": "P006",
    //         "patientName": "Mariam Akter",
    //         "age": 27,
    //         "phone": "+8801444556677",
    //         "address": "House 12, Jatrabari, Dhaka",
    //         "lastVisit": "2025-02-08",
    //         "paid": true
    //     },
    //     {
    //         "patientId": "P007",
    //         "patientName": "Abdul Malek",
    //         "age": 55,
    //         "phone": "+8801333445566",
    //         "address": "72, South Khilgaon, Dhaka",
    //         "lastVisit": "2025-01-25",
    //         "paid": false
    //     },
    //     {
    //         "patientId": "P008",
    //         "patientName": "Shirin Sultana",
    //         "age": 60,
    //         "phone": "+8801222333444",
    //         "address": "House 5, Badda, Dhaka",
    //         "lastVisit": "2025-02-02",
    //         "paid": true
    //     },
    //     {
    //         "patientId": "P009",
    //         "patientName": "Jahangir Alam",
    //         "age": 40,
    //         "phone": "+8801333222111",
    //         "address": "Shyamoli, Dhaka",
    //         "lastVisit": "2025-02-03",
    //         "paid": false
    //     },
    //     {
    //         "patientId": "P010",
    //         "patientName": "Fatima Khatun",
    //         "age": 34,
    //         "phone": "+8801666777888",
    //         "address": "Mirpur 10, Dhaka",
    //         "lastVisit": "2025-02-09",
    //         "paid": true
    //     }
    // ]

    const axiosInstantApi = useAxios();

    const [patients, setPatients] = useState([]);
    const fetchPatientData = async () => {
        try {
            const res = await axiosInstantApi.get('users');
            console.log(res?.data);
            const patientData = res?.data?.filter(user => user.role === 'patient')
            setPatients(patientData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPatientData();
    }, []);

    return (
        <div className=' overflow-x-auto h-screen'>
            {
                isLoading ? (
                    <Loader></Loader>
                ) :
                    <div>
                        <h1 className="text-4xl font-medium mb-6 text-center titel">Patients Information</h1>
                        <table className="min-w-full table-auto border-collapse border text-center border-gray-300 titel_content">
                            <thead>
                                <tr className="bg-[#17C3B2]">
                                    <th className="px-4 py-2  border-b">Patient ID</th>
                                    <th className="px-4 py-2  border-b">Name</th>
                                    <th className="px-4 py-2  border-b">Age</th>
                                    <th className="px-4 py-2  border-b">Phone</th>
                                    <th className="px-4 py-2  border-b">Address</th>
                                    <th className="px-4 py-2  border-b">Last Visit</th>
                                    <th className="px-4 py-2  border-b">Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient, index) => (
                                    <tr key={patient.id} className="border-b hover:bg-[#17C3B2] transform transition-transform duration-200 cursor-pointer">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{patient?.name}</td>
                                        <td className="px-4 py-2">{patient?.age}</td>
                                        <td className="px-4 py-2">{patient?.phone}</td>
                                        <td className="px-4 py-2">{patient?.address}</td>
                                        {/*<td className="px-4 py-2">{patient.lastVisit}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-full ${patient.paid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                >
                                    {patient.paid ? 'Paid' : 'Unpaid'}
                                </span>
                            </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    );
};

export default PatientList;