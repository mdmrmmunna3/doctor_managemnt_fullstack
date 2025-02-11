import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

const Specialities = () => {
    const [specialities, setSpecialities] = useState([
        { id: 1, img: "https://via.placeholder.com/50", name: "Urology" },
        { id: 2, img: "https://via.placeholder.com/50", name: "Neurology" },
        { id: 3, img: "https://via.placeholder.com/50", name: "Orthopedic" },
        { id: 4, img: "https://via.placeholder.com/50", name: "Cardiologist" },
        { id: 5, img: "https://via.placeholder.com/50", name: "Dentist" }
    ]);

    const handleEdit = (id) => {
        console.log(`Editing speciality with ID: ${id}`);
        // You can add your editing logic here
    };

    const handleDelete = (id) => {
        setSpecialities(specialities.filter((item) => item.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Speciality Name</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {specialities.map((speciality) => (
                        <tr key={speciality.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{speciality.id}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={speciality.img} alt={speciality.name} className="w-12 h-12 rounded-full" />
                            </td>
                            <td className="py-2 px-4 border-b">{speciality.name}</td>
                            <td className="py-2 px-4 border-b flex">
                                <button
                                    onClick={() => handleEdit(speciality.id)}
                                    className="bg-teal-300 text-white px-4 py-2 rounded-lg mr-2 flex space-x-2 items-center"
                                >
                                    <span><MdEditSquare /></span> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(speciality.id)}
                                    className="bg-red-400 text-white px-4 py-2 rounded-lg flex space-x-2 items-center"
                                >   <span><FaTrashCan /></span>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Specialities;
