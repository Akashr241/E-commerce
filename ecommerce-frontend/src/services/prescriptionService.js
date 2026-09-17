import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const analyzePrescription = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {

        console.log("========== PRESCRIPTION UPLOAD ==========");

        console.log("File:", file);
        console.log("File name:", file?.name);
        console.log("File type:", file?.type);
        console.log("File size:", file?.size);
        console.log("Token exists:", !!token);

        const response = await axios.post(
            `${API_URL}/api/prescription/analyze`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        console.log("========== PRESCRIPTION RESPONSE ==========");
        console.log("Status:", response.status);
        console.log("Response:", response.data);

        return response.data;

    } catch (error) {

        console.error("========== PRESCRIPTION ERROR ==========");

        console.error("Status:", error.response?.status);
        console.error("Response:", error.response?.data);
        console.error("Message:", error.message);

        throw error;
    }
};