import api from "./api";


// ==========================================
// REMOVE CART ITEM
// ==========================================

export const removeFromCart = async (cartItemId) => {

    try {

        console.log(
            "========== REMOVE CART ITEM =========="
        );

        console.log(
            "Cart Item ID:",
            cartItemId
        );

        console.log(
            "Request URL:",
            `/cart/remove/${cartItemId}`
        );


        // ==================================
        // SEND DELETE REQUEST
        // JWT IS AUTOMATICALLY ADDED BY api.js
        // ==================================

        const response = await api.delete(
            `/cart/remove/${cartItemId}`
        );


        // ==================================
        // SUCCESS DEBUGGING
        // ==================================

        console.log(
            "========== CART ITEM REMOVED SUCCESSFULLY =========="
        );

        console.log(
            "Response Status:",
            response.status
        );

        console.log(
            "Response Data:",
            response.data
        );


        return response.data;

    } catch (error) {

        console.error(
            "========== REMOVE CART ITEM FAILED =========="
        );

        console.error(
            "Full Error:",
            error
        );


        // ==================================
        // BACKEND RESPONSE DEBUGGING
        // ==================================

        if (error.response) {

            console.error(
                "Backend Status:",
                error.response.status
            );

            console.error(
                "Backend Data:",
                error.response.data
            );

            console.error(
                "Backend Headers:",
                error.response.headers
            );

        } else if (error.request) {

            console.error(
                "Request was sent but no response received:"
            );

            console.error(
                error.request
            );

        } else {

            console.error(
                "Request setup error:",
                error.message
            );

        }


        throw error;

    }

};


// ==========================================
// CLEAR CART
// ==========================================

export const clearCart = async () => {

    try {

        console.log(
            "========== CLEAR CART =========="
        );

        const response =
            await api.delete("/cart/clear");


        console.log(
            "Clear cart response:",
            response.data
        );


        return response.data;

    } catch (error) {

        console.error(
            "========== CLEAR CART FAILED =========="
        );

        console.error(error);

        throw error;

    }

};


// ==========================================
// GET MY CART
// ==========================================

export const myCart = async () => {

    try {

        console.log(
            "========== FETCH MY CART =========="
        );

        console.log(
            "Request URL: /cart/my-cart"
        );


        const response =
            await api.get("/cart/my-cart");


        console.log(
            "========== CART FETCH SUCCESS =========="
        );

        console.log(
            "Cart Status:",
            response.status
        );

        console.log(
            "Cart Data:",
            response.data
        );


        return response.data;

    } catch (error) {

        console.error(
            "========== FETCH CART FAILED =========="
        );

        console.error(error);

        if (error.response) {

            console.error(
                "Status:",
                error.response.status
            );

            console.error(
                "Backend Response:",
                error.response.data
            );

        }

        throw error;

    }

};


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

export const addToCart = async (productId) => {

    try {

        console.log(
            "========== ADD PRODUCT TO CART =========="
        );

        console.log(
            "Product ID:",
            productId
        );


        const response = await api.post(
            "/cart/add-product",
            {
                productId: productId,
                quantity: 1
            }
        );


        console.log(
            "========== PRODUCT ADDED SUCCESSFULLY =========="
        );

        console.log(
            "Response:",
            response.data
        );


        return response.data;

    } catch (error) {

        console.error(
            "========== ADD TO CART FAILED =========="
        );

        console.error(error);

        if (error.response) {

            console.error(
                "Status:",
                error.response.status
            );

            console.error(
                "Backend Response:",
                error.response.data
            );

        }

        throw error;

    }

};