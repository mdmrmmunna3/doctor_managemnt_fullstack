import React from 'react';

const Appointments = () => {
    const appointments = [
        {
            doctorName: "Dr. John Smith",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Cardiology",
            patientName: "Jane Doe",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-15T14:30:00",
            status: "Scheduled",
            amount: 150.00
        },
        {
            doctorName: "Dr. Sarah Lee",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Dermatology",
            patientName: "Robert Williams",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-16T09:00:00",
            status: "Completed",
            amount: 120.00
        },
        {
            doctorName: "Dr. Michael Brown",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Orthopedics",
            patientName: "Emily Davis",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-17T11:00:00",
            status: "Scheduled",
            amount: 200.00
        },
        {
            doctorName: "Dr. Jessica Miller",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Pediatrics",
            patientName: "Liam Johnson",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-18T13:15:00",
            status: "Cancelled",
            amount: 90.00
        },
        {
            doctorName: "Dr. Daniel Wilson",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Neurology",
            patientName: "Sophia Moore",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-19T16:00:00",
            status: "Scheduled",
            amount: 180.00
        },
        {
            doctorName: "Dr. Olivia Taylor",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Psychiatry",
            patientName: "James Harris",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-20T10:30:00",
            status: "Completed",
            amount: 140.00
        },
        {
            doctorName: "Dr. Brian Thomas",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "ENT",
            patientName: "Charlotte Clark",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-21T08:45:00",
            status: "Scheduled",
            amount: 110.00
        },
        {
            doctorName: "Dr. Nancy Walker",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Gastroenterology",
            patientName: "Aiden Lewis",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-22T12:00:00",
            status: "Completed",
            amount: 160.00
        },
        {
            doctorName: "Dr. David Martinez",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Radiology",
            patientName: "Mia Young",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-23T15:30:00",
            status: "Scheduled",
            amount: 220.00
        },
        {
            doctorName: "Dr. Laura White",
            doctorImage: "https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small/doctor-posing-portrait-free-photo.jpg",
            specialty: "Gynecology",
            patientName: "Ella King",
            patientImage: "https://img.freepik.com/free-photo/content-handsome-young-man-blue-tshirt-pointing-aside_1262-17845.jpg",
            appointmentTime: "2025-02-24T14:45:00",
            status: "Scheduled",
            amount: 250.00
        }
    ];

    return (
        <div className='pt-[100px]'>
            <div className="overflow-x-auto  px-4">
                <h1 className="text-4xl font-semibold mb-6 text-center titel">Appointment Information</h1>
                <table className="min-w-full bg-white shadow-lg rounded-lg border-separate">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Doctor Name</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Specialty</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Patient Name</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Appointment Time</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-sm font-semibold text-gray-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-2 text-sm text-gray-800 flex items-center">
                                    <img src={appointment.doctorImage} alt="Doctor" className="w-12 h-12 rounded-full mr-3" />
                                    {appointment.doctorName}
                                </td>
                                <td className="px-6 py-2 text-sm text-gray-800">{appointment.specialty}</td>
                                <td className="px-6 py-2  text-sm text-gray-800 flex items-center">
                                    <img src={appointment.patientImage} alt="Patient" className="w-12 h-12 rounded-full mr-3" />
                                    {appointment.patientName}
                                </td>
                                <td className="px-6 py-2  text-sm text-gray-800">
                                    {new Date(appointment.appointmentTime).toLocaleString()}
                                </td>
                                <td className="px-6 py-2  text-sm text-gray-800">
                                    <span className={`font-semibold ${appointment.status === 'Scheduled' ? 'text-green-600' : appointment.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-2  text-sm text-gray-800">${appointment.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;