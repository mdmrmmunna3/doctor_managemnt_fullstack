import React, { useEffect, useState } from 'react';
import { useAuthApi } from '../../Hooks/useAuthApi';
import { FaCloudUploadAlt } from 'react-icons/fa';

const EditProfile = () => {
    const [user, setUser] = useState(null); // Store user data
    const [isLoading, setIsLoading] = useState(true); // State to track loading
    const { logout, getUserData } = useAuthApi();

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const userData = await getUserData();
            console.log("Authenticated User Data:", userData);
            setUser(userData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching authenticated user data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleOnSubmit = () => { }

    const handleOnChange = () => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setUser((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setUser((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    return (
        <div className="flex justify-center pt-[100px] pb-10">
            {
                isLoading ? (
                    <div>loading...</div>
                ) :
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className="w-full max-w-4xl bg-[--primary-color] shadow-lg rounded-xl p-8 space-y-6">
                        <div className="text-center mb-6">
                            <div className="avatar online mx-auto">
                                <div className="w-24 rounded-full">
                                    <img src={`http://localhost:8000/storage/${user?.image}`} alt={user?.name} />
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
                                    value={user?.name}
                                    onChange={handleOnChange}
                                />

                                <input
                                    type="email"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Email"
                                    name="email"
                                    id="email"
                                    value={user?.email}
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
                                    value={user?.age}
                                    onChange={handleOnChange}
                                />

                                <input
                                    type="text"
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Specialization"
                                    name="specialty"
                                    id="specialty"
                                    value={user?.specialty}
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
                                    value={user?.phone}
                                    onChange={handleOnChange}
                                />

                                <textarea
                                    className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter Address"
                                    name="address" id="address"
                                    value={user?.address}
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
                                {user && <p className="mt-2 text-sm text-gray-700">{user?.image?.name}</p>}
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

export default EditProfile;
