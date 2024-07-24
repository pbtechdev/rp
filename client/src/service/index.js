import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const get = async (endPoint) => await axiosInstance.get(endPoint);

export const post = async (endPoint, payload) => await axiosInstance.post(endPoint, payload);