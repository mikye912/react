import axios from "axios";
import { useState } from "react";

const useFetch = () => {
    const baseURL = '/';
    const fetchApi = axios.create({
        baseURL,
        headers: {
            x_auth : sessionStorage.getItem("token")
        }
    })

    const [ progress, setProgress ] = useState(true);

    fetchApi.interceptors.request.use((config) => {
        setProgress(false);
        return config
    }, (err) => {
        return Promise.reject(err);
    })

    fetchApi.interceptors.response.use((res) => {
        setProgress(true);
        return res;
    }, (err) => {
        return Promise.reject(err);
    })

    return [progress, fetchApi]
}

export default useFetch;