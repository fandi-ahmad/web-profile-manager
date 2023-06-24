import axios from "axios";
const apiUrl = 'http://localhost:8000/api/v1/user'

export const GetUser = (auth) => {
    return axios.get(apiUrl, auth)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const DeleteUser = (id, auth) => {
    return axios.delete(`${apiUrl}/delete/${id}`, auth)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const CreateUser = (data, auth) => {
    return axios.post(apiUrl, data, auth)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const  UpdateUser = (data, auth) => {
    return axios.put(`${apiUrl}/update`, data, auth)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}
