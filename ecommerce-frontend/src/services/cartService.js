import api from "./api";



export const removeFromCart = async (cartItemId) => {
    return await api.delete(`/cart/items/${cartItemId}`);
};

export const clearCart = async () => {
    return await api.delete("/cart/clear");
};

export const myCart = async () => {
    const response = await api.get("/cart/my-cart");
    return response.data;
};


export const addToCart = async (productId) => {

    return await api.post("/cart/add-product", {
        productId: productId,
        quantity: 1
    });

};