import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../Hooks/AxiosProvider";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const EditSpeciality = () => {
    const { id } = useParams();
    const axiosInstantApi = useAxios();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch speciality data for editing
    useEffect(() => {
        const fetchSpecialityData = async () => {
            try {
                const res = await axiosInstantApi.get(`specialities/${id}`);
                setFormData({ name: res.data.name, image: res.data.image });
                setPreview(res.data.image ? `http://localhost:8000/storage/${res.data.image}` : "/placeholder.png");
            } catch (error) {
                console.error("Error fetching speciality:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpecialityData();
    }, [id, axiosInstantApi]);

    // Handle form input changes
    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const file = files[0];
            setFormData((prevData) => ({ ...prevData, image: file }));
            setPreview(URL.createObjectURL(file)); // Update preview dynamically
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        if (formData.image instanceof File) {
            data.append("image", formData.image);
        }

        try {
            const response = await axiosInstantApi.post(`specialities/${id}?_method=PUT`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Response:", response.data); // Debug response

            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Speciality Updated Successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate("/dashboard/adminDashboard/specialities");
        } catch (error) {
            console.error("Error updating speciality:", error);

            if (error.response?.data?.errors) {
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: Object.values(error.response.data.errors)[0][0],
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "There was an error updating the speciality!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div className="pt-[100px]">
            {
                isLoading ? (
                    <div><Loader></Loader></div>
                ) :
                    <div className="w-full max-w-4xl mx-auto bg-[--primary-color] shadow-lg rounded-xl p-8 space-y-6">
                        <div className="flex justify-center items-center avatar">
                            <div className="h-28 w-28 rounded-full">
                                <img
                                    src={preview}
                                    alt={formData.name}
                                    className="object-cover h-full w-full rounded-full"
                                />
                            </div>
                        </div>
                        <h2 className="text-center text-4xl font-medium">Edit Speciality</h2>
                        <form onSubmit={handleOnSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Speciality Name"
                                    name="name"
                                    value={formData.name}
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
                                {formData.image instanceof File && (
                                    <p className="mt-2 text-sm">{formData.image.name}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
                            >
                                Update Speciality
                            </button>
                        </form>
                    </div>
            }

        </div>
    );
};

export default EditSpeciality;
