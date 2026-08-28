import axios from "axios";

const API_URL = "http://localhost:8080/api/prescription";

export const uploadPrescription = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/analyze`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};