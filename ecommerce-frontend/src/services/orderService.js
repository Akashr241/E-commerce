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
// PLACE ORDER
// USER ONLY
// ==========================================

export const placeOrder = async () => {

    try {

        console.log("========== PLACE ORDER ==========");

        const response = await axios.post(
            `${API_URL}/orders/place/`,
            {},
            {
                headers: getAuthHeaders()
            }
        );

        console.log("Order placed successfully:");
        console.log(response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Failed to place order:",
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


// ==========================================
// GET MY ORDERS
// USER ONLY
// ==========================================

export const getMyOrders = async () => {

    try {

        console.log("========== MY ORDERS ==========");

        const response = await axios.get(
            `${API_URL}/orders/my-orders`,
            {
                headers: getAuthHeaders()
            }
        );

        console.log("My orders:");
        console.log(response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Failed to load my orders:",
            error
        );

        throw error;

    }

};


// ==========================================
// GET ORDER BY ID
// ==========================================

export const getOrderById = async (id) => {

    try {

        const response = await axios.get(
            `${API_URL}/orders/${id}`,
            {
                headers: getAuthHeaders()
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Failed to get order:",
            error
        );

        throw error;

    }

};


// ==========================================
// CANCEL ORDER
// USER ONLY
// ==========================================

export const cancelOrder = async (orderId) => {

    try {

        console.log(
            "========== CANCEL ORDER =========="
        );

        console.log(
            "Order ID:",
            orderId
        );

        const response = await axios.put(
            `${API_URL}/orders/${orderId}/cancel`,
            {},
            {
                headers: getAuthHeaders()
            }
        );

        console.log(
            "Order cancelled:"
        );

        console.log(
            response.data
        );

        return response.data;

    } catch (error) {

        console.error(
            "Failed to cancel order:",
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


