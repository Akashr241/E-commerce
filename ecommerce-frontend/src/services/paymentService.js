import api from "./api";

export const createPayment = (data) =>
    api.post("/payments/create", data);

export const verifyPayment = (data) =>
    api.post("/payments/verify", data);

export const getPayment = (id) =>
    api.get(`/payments/${id}`);