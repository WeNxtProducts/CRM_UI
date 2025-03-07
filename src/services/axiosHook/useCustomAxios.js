import axios from 'axios';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://192.168.1.62:8081';

const useCustomAxios = () => {

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                config.headers['Authorization'] = `Bearer CRM`;
                return config;
            },
            error => {
                return Promise.reject(error);
            },
        );

        const responseInterceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                console.log("error")
                return Promise.reject(error);
            },
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return axios;
};

export default useCustomAxios;
