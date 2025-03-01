import { useNavigate } from 'react-router-dom';
import { useAxios } from './AxiosProvider';
import { useState } from 'react';

export const useAuthApi = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState({});
    const axiosInstantApi = useAxios();
    const navigate = useNavigate();

    // Register a new user
    const register = async (userData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure this header is set for file uploads
            }
        };
        return axiosInstantApi.post('register', userData, config);
    };

    // Log in an existing user
    const login = async (credentials) => {
        console.log("Credentials being sent:", credentials); // Debugging log
        return axiosInstantApi.post('login', credentials)
            .then(response => {
                console.log("Login response:", response);
                return response;
            })
            .catch(error => {
                console.error("Error during login:", error);
                throw error;
            });
    };


    // Log out the user
    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");

            const response = await axiosInstantApi.post('/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Logout response:", response.data); // Debugging log

            // Clear storage after successful logout
            return response?.data;
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }
    };

    // Fetch all users data

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");

            const res = await axiosInstantApi.get('roleuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return res.data; // Or handle the response as needed
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    const getAlluser = async () => {
        try {

            const res = await axiosInstantApi.get('users')

            return res.data; // Or handle the response as needed
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    return { register, login, logout, getUserData, getAlluser };
};
