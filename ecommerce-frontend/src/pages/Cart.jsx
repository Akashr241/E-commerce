import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    myCart,
    removeFromCart
} from "../services/cartService";

import {
    getMyOrders,
    placeOrder,
    deleteOrderItem
} from "../services/orderService";


const Cart = () => {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const [checkoutLoading, setCheckoutLoading] =
        useState(false);


    // ==========================================
    // FETCH CART
    // ==========================================

    const fetchCart = async () => {

        try {

            console.log(
                "========== FETCHING CART =========="
            );

            const response = await getMyOrders();

            console.log(
                "Cart response:",
                response
            );

            setCart(response);

        } catch (error) {

            console.error(
                "Failed to load cart:",
                error
            );

        }

    };


    // ==========================================
    // LOAD CART
    // ==========================================

    useEffect(() => {

        const loadCart = async () => {

            setLoading(true);

            await fetchCart();

            setLoading(false);

        };

        loadCart();

    }, []);


    // ==========================================
    // REMOVE CART ITEM
    // ==========================================

    const handleRemoveFromOrder =
        async (orderItemId) => {

            try {

                console.log(
                    "========== REMOVE CART ITEM =========="
                );

                console.log(
                    "Cart Item ID:",
                    orderItemId
                );


                // DELETE FROM BACKEND

                await removeFromCart(deleteOrderItem);


                console.log(
                    "Cart item removed successfully"
                );


                // ======================================
                // UPDATE UI IMMEDIATELY
                // ======================================

                setCart((previousCart) => {

                    if (!previousCart) {
                        return previousCart;
                    }


                    return {

                        ...previousCart,

                        orderItemId:

                            previousCart.orderItemId.filter(
                                (item) =>
                                    item.id !== orderItemId
                            )

                    };

                });


                // ======================================
                // FETCH UPDATED CART FROM BACKEND
                // ======================================

                await fetchCart();


            } catch (error) {

                console.error(
                    "Failed to remove cart item:",
                    error
                );

                alert(
                    "Failed to remove product from cart."
                );

            }

        };


    // ==========================================
    // CHECKOUT
    // ==========================================

    const handleCheckout = async () => {

        try {

            if (

                !cart ||

                !cart.cartItems ||

                cart.cartItems.length === 0

            ) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            setCheckoutLoading(true);


            console.log(
                "========== CHECKOUT STARTED =========="
            );


            // ======================================
            // PLACE ORDER
            // ======================================

            const response =
                await placeOrder();


            console.log(
                "Order placed:",
                response
            );


            alert(
                "Order placed successfully!"
            );


            // ======================================
            // REFRESH CART
            // ======================================

            await fetchCart();


            // ======================================
            // OPTIONAL
            // NAVIGATE TO ORDERS PAGE
            // ======================================

            // navigate("/orders");


        } catch (error) {

            console.error(
                "Checkout failed:",
                error
            );


            alert(
                "Failed to place order."
            );

        } finally {

            setCheckoutLoading(false);

        }

    };


    // ==========================================
    // CONTINUE SHOPPING
    // ==========================================

    const handleContinueShopping = () => {

        navigate("/products");

    };


    // ==========================================
    // GO TO ORDERS PAGE
    // ==========================================

    const handleGoToOrders = () => {

        navigate("/orders");

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="
                        spinner-border
                        text-success
                    "
                    role="status"
                />

                <p className="mt-3">

                    Loading your cart...

                </p>

            </div>

        );

    }


    // ==========================================
    // CALCULATE CART TOTAL
    // ==========================================

    const total =

        cart?.total ||

        cart?.totalPrice ||

        cart?.cartItems?.reduce(

            (sum, item) =>

                sum +

                (

                    item.subTotal ||

                    item.subtotal ||

                    0

                ),

            0

        ) ||

        0;


    return (

        <div className="container py-5">


            {/* ======================================
                PAGE HEADER
            ====================================== */}

            <div
                className="
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-4
                "
            >

                <div>

                    <h2 className="fw-bold mb-1">

                        My Cart

                    </h2>


                    <p className="text-muted mb-0">

                        Review your medicines before checkout

                    </p>

                </div>


                <button

                    className="
                        btn
                        btn-outline-success
                    "

                    onClick={handleGoToOrders}

                >

                    My Orders

                </button>

            </div>


            <div className="row g-4">


                {/* ==================================
                    CART ITEMS
                ================================== */}

                <div className="col-lg-8">

                    <div
                        className="
                            card
                            border-0
                            shadow-sm
                        "
                    >

                        <div className="card-body p-4">


                            <h5 className="fw-bold mb-4">

                                Cart Items

                            </h5>


                            {

                                cart?.cartItems?.length > 0

                                    ? (

                                        cart.cartItems.map(

                                            (item) => (

                                                <div

                                                    key={item.id}

                                                    className="
                                                        d-flex
                                                        justify-content-between
                                                        align-items-center
                                                        border-bottom
                                                        py-3
                                                    "

                                                >


                                                    {/* PRODUCT DETAILS */}

                                                    <div>

                                                        <h6
                                                            className="
                                                                fw-bold
                                                                mb-1
                                                            "
                                                        >

                                                            {

                                                                item.product?.name ||

                                                                item.productName ||

                                                                "Product"

                                                            }

                                                        </h6>


                                                        <p
                                                            className="
                                                                text-muted
                                                                small
                                                                mb-0
                                                            "
                                                        >

                                                            Quantity:{" "}

                                                            {item.quantity}

                                                        </p>

                                                    </div>


                                                    {/* PRICE + REMOVE */}

                                                    <div
                                                        className="
                                                            text-end
                                                        "
                                                    >

                                                        <h6
                                                            className="
                                                                fw-bold
                                                                text-success
                                                            "
                                                        >

                                                            ₹

                                                            {

                                                                item.subTotal ||

                                                                item.subtotal ||

                                                                0

                                                            }

                                                        </h6>


                                                        {/* ======================
                                                            REMOVE FROM CART
                                                        ====================== */}

                                                        <button

                                                            className="
                                                                btn
                                                                btn-outline-danger
                                                                btn-sm
                                                            "

                                                            onClick={() =>

                                                                handleRemoveFromOrder(

                                                                    item.id

                                                                )

                                                            }

                                                        >

                                                            Remove

                                                        </button>

                                                    </div>

                                                </div>

                                            )

                                        )

                                    )

                                    : (


                                        /* ==============================
                                            EMPTY CART
                                        ============================== */

                                        <div className="text-center py-5">


                                            <h5>

                                                Your cart is empty

                                            </h5>


                                            <p className="text-muted">

                                                Add products to continue.

                                            </p>


                                            <button

                                                className="
                                                    btn
                                                    btn-success
                                                "

                                                onClick={
                                                    handleContinueShopping
                                                }

                                            >

                                                Browse Products

                                            </button>

                                        </div>

                                    )

                            }

                        </div>

                    </div>

                </div>


                {/* ==================================
                    ORDER SUMMARY
                ================================== */}

                <div className="col-lg-4">

                    <div

                        className="
                            card
                            border-0
                            shadow-sm
                            sticky-top
                        "

                        style={{

                            top: "100px"

                        }}

                    >

                        <div className="card-body p-4">


                            <h5 className="fw-bold mb-4">

                                Order Summary

                            </h5>


                            {/* TOTAL */}

                            <div

                                className="
                                    d-flex
                                    justify-content-between
                                    mb-3
                                "

                            >

                                <span>

                                    Total

                                </span>


                                <strong className="text-success">

                                    ₹{total}

                                </strong>

                            </div>


                            {/* ==========================
                                CHECKOUT
                            ========================== */}

                            <button

                                className="
                                    btn
                                    btn-success
                                    w-100
                                    mb-3
                                "

                                disabled={

                                    checkoutLoading ||

                                    !cart?.cartItems?.length

                                }

                                onClick={handleCheckout}

                            >

                                {

                                    checkoutLoading

                                        ? "Processing..."

                                        : "Proceed to Checkout"

                                }

                            </button>


                            {/* ==========================
                                CONTINUE SHOPPING
                            ========================== */}

                            <button

                                className="
                                    btn
                                    btn-outline-secondary
                                    w-100
                                "

                                onClick={
                                    handleContinueShopping
                                }

                            >

                                ← Continue Shopping

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Cart;