import API from "./api";

export const getAllProducts = () => API.get("/products");

export const getProductById = (id) => API.get(`/products/${id}`);//