import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";

const Specialities = () => {
    const [specialities, setSpecialities] = useState([
        { id: 1, img: "https://cdn-icons-png.flaticon.com/512/10154/10154423.png", name: "Urology" },
        { id: 2, img: "https://cdn-icons-png.flaticon.com/512/10154/10154423.png", name: "Neurology" },
        { id: 3, img: "https://cdn-icons-png.flaticon.com/512/10154/10154423.png", name: "Orthopedic" },
        { id: 4, img: "https://cdn-icons-png.flaticon.com/512/10154/10154423.png", name: "Cardiologist" },
        { id: 5, img: "https://cdn-icons-png.flaticon.com/512/10154/10154423.png", name: "Dentist" }
    ]);

    const handleEdit = (id) => {
        console.log(`Editing speciality with ID: ${id}`);
        // You can add your editing logic here
    };

    const handleDelete = (id) => {
        setSpecialities(specialities.filter((item) => item.id !== id));
    };

    return (
        <div className="pt-[100px]">
            <h1 className="text-4xl font-semibold mb-2 text-center titel">Speciality Information</h1>
            <div className="container mx-auto p-4">
                <table className="min-w-full  border border-gray-300 rounded-lg shadow">
                    <thead>
                        <tr className="bg-[#17C3B2] border-b text-left">
                            <th className="py-2 px-4 ">ID</th>
                            <th className="py-2 px-4 ">Image</th>
                            <th className="py-2 px-4 ">Speciality Name</th>
                            <th className="py-2 px-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialities.map((speciality) => (
                            <tr key={speciality.id} className="hover:bg-[#17C3B2] transform transition-transform duration-200 cursor-pointer border-b">
                                <td className="px-4 py-2">{speciality.id}</td>
                                <td className="py-2 px-4 ">
                                    <img src={speciality.img} alt={speciality.name} className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="py-2 px-4 ">{speciality.name}</td>
                                <td className="py-2 px-4  flex items-center">
                                    <Link
                                        onClick={() => handleEdit(speciality.id)}
                                        className="bg-teal-300 text-white px-4 py-2 rounded-lg mr-2 flex space-x-2 items-center"
                                    >
                                        <span><MdEditSquare /></span> Edit
                                    </Link>
                                    <Link
                                        onClick={() => handleDelete(speciality.id)}
                                        className="bg-red-400 text-white px-4 py-2 rounded-lg flex space-x-2 items-center"
                                    >   <span><FaTrashCan /></span>
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Specialities;
