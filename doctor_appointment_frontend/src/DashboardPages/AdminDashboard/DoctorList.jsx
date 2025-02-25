import React, { useEffect, useState } from 'react';
import { useAxios } from '../../Hooks/AxiosProvider';

const DoctorList = () => {
    // const doctors = [
    //     {
    //         "name": "Dr. Mustafijur Rahman",
    //         "speciality": "Cardiologist",
    //         "member_since": "2015",
    //         "earned": "$1,200,000",
    //         "reviews": 250
    //     },
    //     {
    //         "name": "Dr. Mohammad Rahman",
    //         "speciality": "Neurologist",
    //         "member_since": "2012",
    //         "earned": "$950,000",
    //         "reviews": 180
    //     },
    //     {
    //         "name": "Dr. Shirin Akter",
    //         "speciality": "Dentis",
    //         "member_since": "2018",
    //         "earned": "$750,000",
    //         "reviews": 300
    //     },
    //     {
    //         "name": "Dr. Kazi Md. Nurul Islam",
    //         "speciality": "Orthopedic Surgeon",
    //         "member_since": "2010",
    //         "earned": "$1,500,000",
    //         "reviews": 350
    //     },
    //     {
    //         "name": "Dr. Fariha Parveen",
    //         "speciality": "Urologist",
    //         "member_since": "2016",
    //         "earned": "$850,000",
    //         "reviews": 210
    //     },
    //     {
    //         "name": "Dr. Tanvir Ahmed",
    //         "speciality": "Neurologist",
    //         "member_since": "2014",
    //         "earned": "$1,100,000",
    //         "reviews": 270
    //     },
    //     {
    //         "name": "Dr. Nusrat Jahan",
    //         "speciality": "Dentis",
    //         "member_since": "2017",
    //         "earned": "$950,000",
    //         "reviews": 190
    //     },
    //     {
    //         "name": "Dr. Anwar Hossain",
    //         "speciality": "Orthopedic Surgeon",
    //         "member_since": "2011",
    //         "earned": "$1,300,000",
    //         "reviews": 310
    //     },
    //     {
    //         "name": "Dr. Sabina Yasmin",
    //         "speciality": "Cardiologist",
    //         "member_since": "2013",
    //         "earned": "$900,000",
    //         "reviews": 220
    //     },
    //     {
    //         "name": "Dr. Abu Bakar Siddique",
    //         "speciality": "Urologist",
    //         "member_since": "2019",
    //         "earned": "$600,000",
    //         "reviews": 150
    //     }
    // ]

    const axiosInstantApi = useAxios();

const [doctors, setDoctors] = useState([]); 
const fetchDoctorData = async () => {
    try {
        const res = await axiosInstantApi.get('users');
        console.log(res?.data);
        const doctorData = res?.data?.filter(user => user.role === 'doctor')
        setDoctors(doctorData);
    } catch (error) {
        console.error('Error fetching doctor data:', error);
    }
}

useEffect(() => {
    fetchDoctorData();
}, []);

return (
    <div className='pt-[100px] overflow-x-auto'>
        <h1 className="text-4xl font-semibold mb-6 text-center titel">Doctor Information</h1>
        <table className="min-w-full table-auto border-collapse border text-center border-gray-300 titel_content">
            <thead>
                <tr className="bg-[#17C3B2] ">
                <th className="px-4 py-2  border-b">Doctor ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Speciality</th>
                    <th className="py-2 px-4 border-b">Member Since</th>
                    <th className="py-2 px-4 border-b">Earned</th>
                    <th className="py-2 px-4 border-b">Reviews</th>
                </tr>
            </thead>
            <tbody>
                {/* Check if doctors exists and has data */}
                {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                        <tr key={doctor?.id} className="hover:bg-[#17C3B2] transform transition-transform duration-200 cursor-pointer">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{doctor?.name}</td>
                            <td className="py-2 px-4 border-b">{doctor?.specialty}</td>
                            <td className="py-2 px-4 border-b">{doctor?.created_at}</td>
                            {/* <td className="py-2 px-4 border-b">{doctor.earned}</td>
                            <td className="py-2 px-4 border-b">{doctor.reviews}</td> */}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="py-2 px-4 text-center">No doctors available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

};

export default DoctorList;