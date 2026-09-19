import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


// ==========================================
// AUTH HEADERS
// ==========================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    console.log("========== AUTH HEADERS ==========");
    console.log("API URL:", API_URL);
    console.log("Token exists:", !!token);
    console.log("JWT Token:", token);

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };

};


// ==========================================
// PLACE ORDER
// USER ONLY
// ==========================================

export const placeOrder = async () => {

    try {

        console.log("==========================================");
        console.log("========== PLACE ORDER START ==========");
        console.log("==========================================");

        const url = `${API_URL}/orders/place/`;

        console.log("API URL:", API_URL);
        console.log("Request URL:", "/orders/place/");
        console.log("FULL URL:", url);

        const headers = getAuthHeaders();

        console.log("Sending POST request...");

        const response = await axios.post(
            url,
            {},
            {
                headers: headers
            }
        );

        console.log("========== PLACE ORDER SUCCESS ==========");
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        console.log("==========================================");

        return response.data;

    } catch (error) {

        console.error("========== PLACE ORDER FAILED ==========");

        console.error("Full Error:", error);

        if (error.response) {

            console.error("Backend Status:", error.response.status);
            console.error("Backend Response:", error.response.data);
            console.error("Backend Headers:", error.response.headers);

        } else if (error.request) {

            console.error(
                "Request sent but no response received:",
                error.request
            );

        } else {

            console.error(
                "Request setup error:",
                error.message
            );

        }

        throw error;

    }

};


// ==========================================
// GET MY ORDERS
// USER ONLY
// ==========================================

export const getMyOrders = async () => {

    try {

        console.log("==========================================");
        console.log("========== GET MY ORDERS START ==========");
        console.log("==========================================");

        const url = `${API_URL}/orders/my-orders`;

        console.log("API URL:", API_URL);
        console.log("Request URL:", "/orders/my-orders");
        console.log("FULL URL:", url);

        const headers = getAuthHeaders();

        console.log("Sending GET request...");

        const response = await axios.get(
            url,
            {
                headers: headers
            }
        );

        console.log("========== GET MY ORDERS SUCCESS ==========");
        console.log("Response Status:", response.status);
        console.log("Orders Data:", response.data);

        console.log("==========================================");

        return response.data;

    } catch (error) {

        console.error("========== GET MY ORDERS FAILED ==========");

        console.error("Full Error:", error);

        if (error.response) {

            console.error("Backend Status:", error.response.status);
            console.error("Backend Response:", error.response.data);
            console.error("Backend Headers:", error.response.headers);

        } else if (error.request) {

            console.error(
                "Request sent but no response received:",
                error.request
            );

        } else {

            console.error(
                "Request setup error:",
                error.message
            );

        }

        throw error;

    }

};


// ==========================================
// GET ORDER BY ID
// ==========================================

export const getOrderById = async (id) => {

    try {

        console.log("==========================================");
        console.log("========== GET ORDER BY ID ==========");
        console.log("==========================================");

        console.log("Order ID:", id);

        const url = `${API_URL}/orders/${id}`;

        console.log("API URL:", API_URL);
        console.log("Request URL:", `/orders/${id}`);
        console.log("FULL URL:", url);

        const headers = getAuthHeaders();

        console.log("Sending GET request...");

        const response = await axios.get(
            url,
            {
                headers: headers
            }
        );

        console.log("========== GET ORDER SUCCESS ==========");
        console.log("Response Status:", response.status);
        console.log("Order Data:", response.data);

        console.log("==========================================");

        return response.data;

    } catch (error) {

        console.error("========== GET ORDER FAILED ==========");

        console.error("Full Error:", error);

        if (error.response) {

            console.error("Backend Status:", error.response.status);
            console.error("Backend Response:", error.response.data);
            console.error("Backend Headers:", error.response.headers);

        }

        throw error;

    }

};


// ==========================================
// DELETE ORDER ITEM
// USER ONLY
// ==========================================

export const deleteOrderItem = async (orderItemId) => {

    try {

        console.log("==========================================");
        console.log("========== DELETE ORDER ITEM START ==========");
        console.log("==========================================");

        console.log("Order Item ID:", orderItemId);

        const url =
            `${API_URL}/orders/items/${orderItemId}`;

        console.log("API URL:", API_URL);
        console.log(
            "Request URL:",
            `/orders/items/${orderItemId}`
        );
        console.log("FULL URL:", url);

        const headers = getAuthHeaders();

        console.log("Authorization Header exists:", !!headers.Authorization);

        console.log("Sending DELETE request...");

        const response = await axios.delete(
            url,
            {
                headers: headers
            }
        );

        console.log("========== DELETE ORDER ITEM SUCCESS ==========");

        console.log("Response Status:", response.status);

        console.log("Response Data:", response.data);

        console.log("==========================================");

        return response.data;

    } catch (error) {

        console.error("========== DELETE ORDER ITEM FAILED ==========");

        console.error("Order Item ID:", orderItemId);

        console.error("Full Error:", error);

        if (error.response) {

            console.error(
                "Backend Status:",
                error.response.status
            );

            console.error(
                "Backend Response:",
                error.response.data
            );

            console.error(
                "Backend Headers:",
                error.response.headers
            );

        } else if (error.request) {

            console.error(
                "Request sent but no response received:",
                error.request
            );

        } else {

            console.error(
                "Request setup error:",
                error.message
            );

        }

        throw error;

    }

};