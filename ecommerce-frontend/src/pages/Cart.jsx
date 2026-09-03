import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    myCart,
    removeFromCart
} from "../services/cartService";

import {
    placeOrder,
    getMyOrders,
    deleteOrderItem
} from "../services/orderService";


const Cart = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const [orders, setOrders] = useState([]);

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

            const response = await myCart();

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
    // FETCH MY ORDERS
    // ==========================================

    const fetchOrders = async () => {

        try {

            console.log(
                "========== FETCHING MY ORDERS =========="
            );

            const response =
                await getMyOrders();

            console.log(
                "Orders response:",
                response
            );

            setOrders(response);

        } catch (error) {

            console.error(
                "Failed to load orders:",
                error
            );

        }

    };


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([
                fetchCart(),
                fetchOrders()
            ]);

            setLoading(false);

        };

        loadData();

    }, []);


    // ==========================================
    // REMOVE CART ITEM
    // ==========================================

    const handleRemoveFromCart =
        async (cartItemId) => {

            try {

                console.log(
                    "Removing cart item:",
                    cartItemId
                );

                await removeFromCart(cartItemId);

                await fetchCart();

            } catch (error) {

                console.error(
                    "Failed to remove cart item:",
                    error
                );

            }

        };


    // ==========================================
    // DELETE ORDER ITEM
    // ==========================================

    const handleDeleteOrderItem =
        async (orderItemId) => {

            try {

                console.log(
                    "========== DELETE ORDER ITEM =========="
                );

                console.log(
                    "Order Item ID:",
                    orderItemId
                );

                await deleteOrderItem(orderItemId);

                console.log(
                    "Order item deleted successfully"
                );

                await fetchCart();
                await getMyOrders();

            } catch (error) {

                console.error(
                    "Failed to delete order item:",
                    error
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

            const response =
                await placeOrder();

            console.log(
                "Order placed:",
                response
            );

            alert(
                "Order placed successfully!"
            );

            // Refresh cart and order history

            await fetchCart();

            await fetchOrders();

            // Later you can redirect to payment
            // navigate("/payment");

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

        console.log(
            "CONTINUE SHOPPING → /products"
        );

        navigate("/products");

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                />

                <p className="mt-3">
                    Loading your cart...
                </p>

            </div>

        );

    }


    // ==========================================
    // CART TOTAL
    // ==========================================

    const total =

        cart?.total ||

        cart?.totalPrice ||

        cart?.cartItems?.reduce(

            (sum, item) =>

                sum +
                (item.subTotal || item.subtotal || 0),

            0

        ) ||

        0;


    return (

        <div className="container py-5">


            {/* ======================================
                PAGE TITLE
            ====================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        My Cart
                    </h2>

                    <p className="text-muted mb-0">
                        Review your medicines before checkout
                    </p>

                </div>

            </div>


            <div className="row g-4">


                {/* ==================================
                    CART ITEMS
                ================================== */}

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4">
                                Cart Items
                            </h5>


                            {cart?.cartItems?.length > 0 ? (

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

                                            <div>

                                                <h6 className="fw-bold mb-1">

                                                    {
                                                        item.product?.name ||
                                                        item.productName
                                                    }

                                                </h6>

                                                <p className="text-muted small mb-0">

                                                    Quantity:
                                                    {" "}
                                                    {item.quantity}

                                                </p>

                                            </div>


                                            <div className="text-end">

                                                <h6 className="fw-bold text-success">

                                                    ₹
                                                    {
                                                        item.subTotal ||
                                                        item.subtotal ||
                                                        0
                                                    }

                                                </h6>


                                                <button
                                                    className="
                                                        btn
                                                        btn-outline-danger
                                                        btn-sm
                                                    "
                                                    onClick={() =>
                                                        deleteOrderItem(
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

                            ) : (

                                <div className="text-center py-5">

                                    <h5>
                                        Your cart is empty
                                    </h5>

                                    <p className="text-muted">

                                        Add medicines to continue.

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

                            )}

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


                            {/* CHECKOUT */}

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

                                {checkoutLoading

                                    ? "Processing..."

                                    : "Proceed to Checkout"

                                }

                            </button>


                            {/* CONTINUE SHOPPING */}

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


            {/* ======================================
                ORDER HISTORY
            ====================================== */}

            <div className="mt-5">

                <h3 className="fw-bold mb-4">
                    Order History
                </h3>


                {orders.length === 0 ? (

                    <div
                        className="
                            alert
                            alert-light
                            border
                        "
                    >

                        No previous orders found.

                    </div>

                ) : (

                    <div className="row g-3">

                        {orders.map(
                            (order) => (

                                <div
                                    key={order.id}
                                    className="col-12"
                                >

                                    <div
                                        className="
                                            card
                                            border-0
                                            shadow-sm
                                        "
                                    >

                                        <div className="card-body">

                                            <div
                                                className="
                                                    d-flex
                                                    justify-content-between
                                                    align-items-center
                                                "
                                            >

                                                <div>

                                                    <h6 className="fw-bold mb-1">

                                                        Order
                                                        {" #"}
                                                        {order.id}

                                                    </h6>


                                                    <span
                                                        className="
                                                            badge
                                                            bg-success
                                                        "
                                                    >

                                                        {order.status}

                                                    </span>

                                                </div>


                                                <div className="text-end">

                                                    <strong
                                                        className="
                                                            text-success
                                                        "
                                                    >

                                                        ₹
                                                        {
                                                            order.totalPrice ||
                                                            order.totalAmount ||
                                                            0
                                                        }

                                                    </strong>

                                                </div>

                                            </div>


                                            {/* ORDER ITEMS */}

                                            {order.orderItems &&
                                                order.orderItems.length > 0 && (

                                                <div className="mt-3">

                                                    {order.orderItems.map(
                                                        (item) => (

                                                            <div
                                                                key={item.id}
                                                                className="
                                                                    d-flex
                                                                    justify-content-between
                                                                    align-items-center
                                                                    border-top
                                                                    pt-2
                                                                    mt-2
                                                                "
                                                            >

                                                                <div>

                                                                    <strong>

                                                                        {
                                                                            item.productName
                                                                        }

                                                                    </strong>

                                                                    <div
                                                                        className="
                                                                            small
                                                                            text-muted
                                                                        "
                                                                    >

                                                                        Quantity:
                                                                        {" "}
                                                                        {
                                                                            item.quantity
                                                                        }

                                                                    </div>

                                                                </div>


                                                                <button
                                                                    className="
                                                                        btn
                                                                        btn-outline-danger
                                                                        btn-sm
                                                                    "
                                                                    onClick={() =>
                                                                        handleDeleteOrderItem(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >

                                                                    Delete

                                                                </button>

                                                            </div>

                                                        )

                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            )

                        )}

                    </div>

                )}

            </div>

        </div>

    );

};


export default Cart;