import api from "./api";

export const createPayment = (data) =>
    api.post("/api/payments/create", data);

export const verifyPayment = (data) =>
    api.post("/api/payments/verify", data);

export const getPayment = (id) =>
    api.get(`/api/payments/${id}`);