import api from "./api";

export const checkout = async (checkoutData) => {

    const response = await api.post(
        "/api/checkout",
        checkoutData
    );

    return response.data;
};