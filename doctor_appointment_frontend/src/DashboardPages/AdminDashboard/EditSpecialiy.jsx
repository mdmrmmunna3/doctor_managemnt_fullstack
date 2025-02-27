import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../Hooks/AxiosProvider';
import { FaCloudUploadAlt } from 'react-icons/fa';

const EditSpecialiy = () => {
    const { id } = useParams();
    const [editSpecilatity, setEditSpeciality] = useState(null);
    const axiosInstantApi = useAxios();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchSpecialityData = async () => {
        try {
            const res = await axiosInstantApi.get(`specialities/${id}`);
            setEditSpeciality(res?.data);
            setFormData({
                name: res?.data?.name || '',
                image: null, // start with no image in formData
            });
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error fetching specialities:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSpecialityData();
    }, [id]);

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
            // put the form data to the API
            await axiosInstantApi.put("specialities", data, {
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
                title: "Speciality Update Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/dashboard/adminDashboard/specialities');

        } catch (error) {
            console.error("Error Updating speciality:", error);
            Swal.fire({
                icon: "error",
                title: "There was an error updating the speciality!",
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
                <div className="avatar online mx-auto">
                    <div className="w-24 rounded-full">
                        <img src={`http://localhost:8000/storage/${editSpecilatity?.image}`} alt={editSpecilatity?.name} />
                    </div>
                </div>
                <h2 className="text-center text-4xl titel font-medium">Edit Speciality</h2>
                <form onSubmit={handleOnSubmit} className="space-y-4 titel_content">
                    <div>
                        <input
                            type="text"
                            className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Speciality Name"
                            name="name"
                            value={formData?.name || ''}
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
                        {editSpecilatity?.image && <p className="mt-2 text-sm text-[--secondary-color]">{editSpecilatity?.image?.name}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
                    >
                        Add Speciality
                    </button>
                </form>
            </div>
        </div>

    );
};

export default EditSpecialiy;