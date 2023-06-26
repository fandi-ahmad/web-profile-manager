import axios from "axios";
import Auth from "./auth";

const apiUrl = 'http://localhost:8000/api/v1/service'

export const GetService = () => {
    return axios.get(apiUrl, Auth())
    .then(response => response.data)
    .catch(error => error.response);
}

export const CreateService = (data) => {
    return axios.post(apiUrl, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}
