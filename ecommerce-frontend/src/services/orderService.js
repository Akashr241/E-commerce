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
// DELETE ORDER ITEM
// USER ONLY
// ==========================================

export const deleteOrderItem = async (orderItemId) => {

    console.log(
        "========== DELETE ORDER ITEM =========="
    );
    console.log("Delete order item ");
    console.log("Order Item ID:", orderItemId);
    console.log("================Delete Order Item====================");

    try {

        console.log(
            "========== DELETE ORDER ITEM =========="
        );

        console.log(
            "Order Item ID:",
            orderItemId
        );

        const response = await axios.delete(
            `${API_URL}/orders/items/${orderItemId}`,
            {
                headers: getAuthHeaders()
            }
        );

        console.log(
            "Order item deleted:"
        );

        console.log(
            response.data
        );

        return response.data;

    } catch (error) {

        console.error(
            "Failed to delete order item:",
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
