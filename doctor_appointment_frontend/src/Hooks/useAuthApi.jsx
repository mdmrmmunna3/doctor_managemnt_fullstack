import { useNavigate } from 'react-router-dom';
import { useAxios } from './AxiosProvider';

export const useAuthApi = () => {
    const axiosInstantApi = useAxios();
    const navigate = useNavigate();

    const register = async (userData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',  // Ensure this header is set for file uploads
            }
        };
        return axiosInstantApi.post('register', userData, config);
    };

    const login = async (credentials) => {
        return axiosInstantApi.post('login', credentials);
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token before logout:", token); // Debugging log

            if (!token) throw new Error("No token found");

            const response = await axiosInstantApi.post('/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Logout response:", response.data); // Debugging log

            // ✅ Clear storage after successful logout
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // localStorage.removeItem('selectedRole');
            sessionStorage.clear();

            // ✅ Force reload the page to ensure cleanup
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }
    };



    const getUserData = async (token) => {
        return axiosInstantApi.get('users', {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    return { register, login, logout, getUserData };
};
