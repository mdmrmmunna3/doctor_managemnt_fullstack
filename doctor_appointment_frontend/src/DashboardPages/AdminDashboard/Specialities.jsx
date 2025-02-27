import React, { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Pages/Shared/Loader/Loader";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAxios } from "../../Hooks/AxiosProvider";
import Swal from "sweetalert2";

const Specialities = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const axiosInstantApi = useAxios();
    const [specialities, setSpecialities] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });

    // Fetch existing specialities on component mount
    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await axiosInstantApi.get("specialities");
                setSpecialities(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching specialities:", error);
                setIsLoading(false);
            }
        };
        fetchSpecialities();
    }, [axiosInstantApi]);


    // delete part 
    const handleDelete = async (id) => {
        try {
            await axiosInstantApi.delete(`specialities/${id}`);
            setSpecialities(specialities.filter((item) => item.id !== id));
            // success message 
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "speciality deleted successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error deleting speciality:", error);
            Swal.fire({
                icon: "error",
                title: "There was an issue deleting the speciality",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData?.name);
        if (formData?.image) data.append("image", formData?.image);

        try {
            // Post the form data to the API
            await axiosInstantApi.post("specialities", data, {
                headers: {
                    "Content-Type": "multipart/form-data", // For file uploads
                },
            });

            // Fetch the updated list of specialities immediately
            const response = await axiosInstantApi.get("specialities");
            setSpecialities(response.data);

            setFormData({ name: "", image: null }); // Reset form data after submit
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Speciality Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/dashboard/adminDashboard/specialities');

        } catch (error) {
            console.error("Error creating speciality:", error);
            Swal.fire({
                icon: "error",
                title: "There was an error adding the speciality!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };



    return (
        <div className="pt-[100px]">
            <div
                style={{
                    boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`,
                }}
                className="w-full max-w-4xl mx-auto bg-[--primary-color] shadow-lg rounded-xl p-8 space-y-6"
            >
                <h2 className="text-center text-4xl titel font-medium">Add Speciality</h2>
                <form onSubmit={handleOnSubmit} className="space-y-4 titel_content">
                    <div>
                        <input
                            type="text"
                            className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Speciality Name"
                            name="name"
                            value={formData?.name}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center w-full">
                        <div className="text-gray-600 flex flex-col items-center">
                            <div className="bg-gray-600 text-white p-2 rounded-full">
                                <FaCloudUploadAlt />
                            </div>
                            <label className="mt-2 px-6 py-2 bg-gray-700 text-white rounded cursor-pointer">
                                Browse file
                                <input
                                    type="file"
                                    className="hidden"
                                    name="image"
                                    accept="image/jpeg, image/png, image/jpg, image/gif"
                                    onChange={handleOnChange}
                                />
                            </label>
                        </div>
                        {formData?.image && <p className="mt-2 text-sm text-[--secondary-color]">{formData?.image?.name}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
                    >
                        Add Speciality
                    </button>
                </form>
            </div>

            <div className="py-10">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <h1 className="text-4xl font-medium titel mb-2 text-center">Speciality Information</h1>
                        <div className="container mx-auto p-4 titel_content">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow">
                                <thead>
                                    <tr className="bg-[#17C3B2] border-b text-left">
                                        <th className="py-2 px-4">ID</th>
                                        <th className="py-2 px-4">Image</th>
                                        <th className="py-2 px-4">Speciality Name</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specialities?.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                                No Data Found
                                            </td>
                                        </tr>
                                    ) : (
                                        specialities?.map((speciality, index) => {
                                            // Ensure the key is unique, if speciality.id is not available, fall back to using index
                                            const key = speciality?.id ? speciality?.id : '';

                                            return (
                                                <tr
                                                    key={key}
                                                    className="hover:bg-[#17C3B2] transform transition-transform duration-200 cursor-pointer border-b"
                                                >
                                                    <td className="px-4 py-2">{index + 1}</td>
                                                    <td className="py-2 px-4">
                                                        <img
                                                            src={`http://localhost:8000/storage/${speciality?.image}`}
                                                            alt={speciality?.name}
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="py-2 px-4">{speciality?.name}</td>
                                                    <td className="py-2 px-4 flex items-center">
                                                        <Link
                                                            to={`/dashboard/adminDashboard/speciality/${speciality?.id}`}
                                                            className="bg-teal-300 text-white px-4 py-2 rounded-lg mr-2 flex space-x-2 items-center"
                                                        >
                                                            <MdEditSquare /> Edit
                                                        </Link>
                                                        <Link
                                                            onClick={() => handleDelete(speciality?.id)}
                                                            className="bg-red-400 text-white px-4 py-2 rounded-lg flex space-x-2 items-center"
                                                        >
                                                            <FaTrashCan /> Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Specialities;
