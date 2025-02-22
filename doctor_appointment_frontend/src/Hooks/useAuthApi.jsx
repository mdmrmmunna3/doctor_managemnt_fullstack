import { useAxios } from './AxiosProvider';

export const useAuthApi = () => {
    const axiosInstantApi = useAxios();

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

    const logout = async (token) => {
        return axiosInstantApi.post('logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    const getUserData = async (token) => {
        return axiosInstantApi.get('users', {
            headers: { Authorization: `Bearer ${token}` },
        });
    };

    return { register, login, logout, getUserData };
};
