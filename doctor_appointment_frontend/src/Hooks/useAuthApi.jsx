import { useNavigate } from 'react-router-dom';
import { useAxios } from './AxiosProvider';

export const useAuthApi = () => {
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
        return axiosInstantApi.post('login', credentials);
    };

    // Log out the user
    const logout = async () => {
        try {
            // const token = localStorage.getItem('token');
            // console.log("Token before logout:", token); // Debugging log

            // if (!token) throw new Error("No token found");

            const response = await axiosInstantApi.post('/logout', {}, {
                // headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Logout response:", response.data); // Debugging log

            // ✅ Clear storage after successful logout
            // localStorage.removeItem('token');
            localStorage.removeItem('role');
            // localStorage.removeItem('selectedRole');
            sessionStorage.clear();

            // ✅ Force reload the page to ensure cleanup
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }
    };

    // Fetch user data
    // const getUserData = async ( id ) => {
    //     try {
    //         const response = await axios.get(`roleUser/${id}`, {
    //             // headers: {
    //             //     Authorization: `Bearer ${token}`,
    //             // },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         throw error;
    //     }
    // };

    const getUserData = async () => {
        try {
            const res = await axiosInstantApi.get('users');
            // console.log(res)
            return res;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    const getEamilUserData = async () => {
        try {
            const res = await axiosInstantApi.get(`users/${email}`);
            // console.log(res)
            return res;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }

    return { register, login, logout , getUserData, getEamilUserData};
};
