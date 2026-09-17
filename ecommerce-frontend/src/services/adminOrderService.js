import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };

};


// ===============================
// GET ALL ORDERS
// ===============================

export const getAllOrders = async () => {

    const response = await axios.get(
        `${API_URL}/orders`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// GET ORDER BY ID
// ===============================

export const getOrderById = async (id) => {

    const response = await axios.get(
        `${API_URL}/orders/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// UPDATE ORDER STATUS
// ===============================

export const updateOrderStatus = async (
    id,
    status
) => {

    const response = await axios.put(
        `${API_URL}/orders/${id}/status`,
        {
            status: status
        },
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};