import api from "./api";
import axios from "axios";


 const API_URL = "http://localhost:8080";

export const removeFromCart = async (cartItemId) => {

    try {

        console.log(
            "========== REMOVE CART ITEM =========="
        );

        console.log(
            "Cart Item ID:",
            cartItemId
        );

        const response = await axios.delete(
            `${API_URL}/cart/remove/${cartItemId}`,
            
        );

        console.log(
            "Remove response:",
            response.data
        );

        console.log(
            "Status:",
            response.status
        );

        return response.data;

    } catch (error) {

        console.error(
            "========== REMOVE CART ITEM FAILED =========="
        );

        console.error(error);

        if (error.response) {

            console.error(
                "Status:",
                error.response.status
            );

            console.error(
                "Backend response:",
                error.response.data
            );

        }

        throw error;
    }
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
