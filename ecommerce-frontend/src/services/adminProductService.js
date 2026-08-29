import axios from "axios";

const API_URL = "http://localhost:8080";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getAllProducts = async () => {

    const response = await axios.get(
        `${API_URL}/products`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProductById = async (id) => {

    const response = await axios.get(
        `${API_URL}/products/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// ADD PRODUCT
// ===============================

export const addProduct = async (product) => {

    const response = await axios.post(
        `${API_URL}/products`,
        product,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async (id, product) => {

    const response = await axios.put(
        `${API_URL}/products/${id}`,
        product,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async (id) => {

    const response = await axios.delete(
        `${API_URL}/products/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};