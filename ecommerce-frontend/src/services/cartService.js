import api from "./api";

export const getCart = async () => {
    const response = await api.get("/cart/all");
    return response.data;
};

export const removeFromCart = async (cartItemId) => {
    return await api.delete(`/cart/remove/${cartItemId}`);
};

export const clearCart = async () => {
    return await api.delete("/cart/clear");
};



export const addToCart = async (productId) => {

    return await api.post("/cart/add-product", {
        productId: productId,
        quantity: 1
    });

};