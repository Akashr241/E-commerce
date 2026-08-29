import axios from "axios";

const API_URL = "http://localhost:8080";


const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };

};


export const getAllUsers = async () => {

    const response = await axios.get(
        `${API_URL}/admin/users`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};