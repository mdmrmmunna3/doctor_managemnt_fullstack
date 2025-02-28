import React, { useEffect, useState } from 'react';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Loader from '../../Pages/Shared/Loader/Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../Hooks/AxiosProvider';

const DoctorEditProfile = () => {
    const { getUserData } = useAuthApi();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        age: "",
        specialty: "",
        phone: "",
        address: "",
        qualification: "",
        fees: "",
        image: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const axiosInstantApi = useAxios();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                setFormData({
                    id: userData?.id || "",
                    name: userData?.name || "",
                    email: userData?.email || "",
                    age: userData?.age || "",
                    specialty: userData?.specialty || "",
                    phone: userData?.phone || "",
                    address: userData?.address || "",
                    qualification: userData?.qualification || "",
                    fees: userData?.fees || "",
                    image: userData?.image || null,
                });

                setPreview(userData?.image ? `http://localhost:8000/storage/${userData.image}` : "/placeholder.png");
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching authenticated user data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files.length > 0) {
            const file = files[0];
            setFormData((prevData) => ({ ...prevData, image: file }));
            setPreview(URL.createObjectURL(file));  // Instant preview
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { ...formData }; // Clone current state

        // Optimistic UI update
        setFormData(updatedData);

        // Proceed with sending data to server
        const data = new FormData();
        Object.keys(updatedData).forEach((key) => {
            if (key === "image" && updatedData.image instanceof File) {
                data.append("image", updatedData.image);
            } else {
                data.append(key, updatedData[key]);
            }
        });

        try {
            const response = await axiosInstantApi.post(`roleuser/${formData.id}?_method=PUT`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const updatedResponseData = response.data; // Get updated data

                // Update the form state based on the API response
                setFormData((prevData) => ({
                    ...prevData,
                    ...updatedResponseData,
                    image: updatedResponseData.image || prevData.image,
                }));

                // Update preview if image changed
                setPreview(updatedResponseData.image ? `http://localhost:8000/storage/${updatedResponseData.image}` : preview);

                Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate("/dashboard/doctorDashboard");
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "There was an error updating the profile!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    return (
        <div className="flex justify-center pt-[100px] pb-10">
            {
                isLoading ? (
                    <div><Loader /></div>
                ) :
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className="w-full max-w-4xl bg-[--primary-color] shadow-lg rounded-xl p-8 space-y-6">
                        <div className="text-center mb-6">
                            <div className="avatar online mx-auto">
                                <div className="w-24 rounded-full">
                                    <img src={preview} alt={formData.name} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Edit Profile</h2>
                        </div>

                        <form onSubmit={handleOnSubmit} className="space-y-4">
                            <div className='grid md:grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Full Name"
                                    name="name"
                                    id="name"
                                    value={formData?.name || ''}
                                    onChange={handleOnChange}
                                />

                                <input
                                    type="email"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Email"
                                    name="email"
                                    id="email"
                                    value={formData?.email || ''}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Age"
                                    name="age"
                                    id="age"
                                    value={formData?.age || ''}
                                    onChange={handleOnChange}
                                />

                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Specialization"
                                    name="specialty"
                                    id="specialty"
                                    value={formData?.specialty || ''}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Phone"
                                    name="phone"
                                    id="phone"
                                    value={formData?.phone || ''}
                                    onChange={handleOnChange}
                                />

                                <textarea
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Address"
                                    name="address" id="address"
                                    value={formData?.address || ''}
                                    onChange={handleOnChange}
                                    rows={2}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Qualification"
                                    name="qualification"
                                    id="qualification"
                                    value={formData?.qualification || ''}
                                    onChange={handleOnChange}
                                />

                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Fees"
                                    name="fees" id="fees"
                                    value={formData?.fees || ""}
                                    onChange={handleOnChange}
                                    rows={2}
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
                                            id="image"
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
                                Update Profile
                            </button>
                        </form>
                    </div>
            }
        </div>
    );
};

export default DoctorEditProfile;
