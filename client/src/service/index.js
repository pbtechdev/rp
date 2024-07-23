import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const get = async (endPoint) => {
    try {
        return await axiosInstance.get(endPoint);
    } catch (error) {
        return error
    }
}

export const post = async (endPoint, payload) => {
    // try {
    return await axiosInstance.post(endPoint, payload);
    // } catch (error) {
    //     return error.response
    // }
}