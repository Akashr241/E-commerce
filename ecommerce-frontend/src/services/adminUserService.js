import axios from "axios";

const API_URL = "http://localhost:8080";

// ==========================================
// AUTH HEADERS
// ==========================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };

};


// ==========================================
// GET ALL USERS
// ADMIN ONLY
// ==========================================

export const getAllUsers = async () => {

    try {

        console.log("========== ADMIN USERS ==========");
        console.log("API URL:", `${API_URL}/users`);

        const response = await axios.get(
            `${API_URL}/users`,
            {
                headers: getAuthHeaders()
            }
        );

        console.log("Users response status:", response.status);
        console.log("Users:", response.data);

        return response.data;

    } catch (error) {

        console.error("========== GET USERS ERROR ==========");

        if (error.response) {

            console.error("Status:", error.response.status);
            console.error("Backend:", error.response.data);

        } else if (error.request) {

            console.error(
                "Request sent but no response received."
            );

        } else {

            console.error(
                "Request error:",
                error.message
            );
        }

        throw error;
    }
};


// ==========================================
// GET USER BY ID
// ADMIN ONLY
// ==========================================

export const getUserById = async (id) => {

    try {

        console.log("========== GET USER ==========");
        console.log("User ID:", id);

        const response = await axios.get(
            `${API_URL}/users/${id}`,
            {
                headers: getAuthHeaders()
            }
        );

        console.log("User response:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Failed to get user:",
            error
        );

        if (error.response) {

            console.error(
                "Status:",
                error.response.status
            );

            console.error(
                "Backend:",
                error.response.data
            );
        }

        throw error;
    }
};