import React, { createContext, useContext } from 'react';
import axios from 'axios';

const axiosInstantApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// This function will add the Authorization header dynamically from localStorage or any state management
// const setAuthToken = (token) => {
//     if (token) {
//         axiosInstantApi.defaults.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete axiosInstantApi.defaults.headers['Authorization'];
//     }
// };

const AxiosContext = createContext();

export const useAxios = () => {
    return useContext(AxiosContext);
};

const AxiosProvider = ({ children }) => {
    // const token = localStorage.getItem('token');
    // if (token) setAuthToken(token);

    return (
        <AxiosContext.Provider value={axiosInstantApi}>
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosProvider;
