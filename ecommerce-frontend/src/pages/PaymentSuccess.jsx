import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { placeOrder } from "../services/orderService";

const PaymentSuccess = () => {

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        createOrder();
    }, []);

    const createOrder = async () => {

        try {

            console.log("Creating order after successful payment...");

            const response = await placeOrder();

            console.log("Order created successfully:", response);

            setOrder(response);

        } catch (error) {

            console.log("Order creation failed:", error);

            if (error.response?.data?.message) {

                setError(error.response.data.message);

            } else {

                setError(
                    "Payment was successful, but we could not create your order."
                );
            }

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <div className="bg-light min-vh-100 d-flex align-items-center">

                <div className="container text-center">

                    <div className="card border-0 shadow-sm rounded-4 p-5">

                        <h3>
                            Confirming your order...
                        </h3>

                        <p className="text-muted mt-3">
                            Payment was successful. Please wait while we
                            create your order.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (error) {

        return (
            <div className="bg-light min-vh-100 d-flex align-items-center">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-md-7">

                            <div className="card border-0 shadow-sm rounded-4 text-center">

                                <div className="card-body p-5">

                                    <h2 className="fw-bold text-danger">
                                        Order Creation Failed
                                    </h2>

                                    <p className="text-muted mt-3">
                                        {error}
                                    </p>

                                    <div className="d-grid gap-2 mt-4">

                                        <Link
                                            to="/orders"
                                            className="btn btn-outline-success rounded-pill"
                                        >
                                            View My Orders
                                        </Link>

                                        <Link
                                            to="/products"
                                            className="btn btn-outline-secondary rounded-pill"
                                        >
                                            Continue Shopping
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (

        <div className="bg-light min-vh-100 d-flex align-items-center">

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-7 col-lg-6">

                        <div className="card border-0 shadow-sm rounded-4 text-center">

                            <div className="card-body p-5">

                                {/* SUCCESS ICON */}

                                <div
                                    className="
                                        bg-success-subtle
                                        rounded-circle
                                        d-inline-flex
                                        align-items-center
                                        justify-content-center
                                        mb-4
                                    "
                                    style={{
                                        width: "90px",
                                        height: "90px"
                                    }}
                                >

                                    <span className="fs-1 text-success">
                                        ✓
                                    </span>

                                </div>

                                <h1 className="fw-bold">
                                    Payment Successful!
                                </h1>

                                <p className="text-muted fs-5 mt-3">
                                    Your payment has been completed
                                    successfully.
                                </p>

                                <div className="alert alert-success border-0 rounded-4 mt-4">

                                    <strong>
                                        🎉 Your order is confirmed
                                    </strong>

                                    <br />

                                    <small>
                                        Order #{order?.id}
                                    </small>

                                    <br />

                                    <small>
                                        Thank you for choosing MediPharm.
                                    </small>

                                </div>

                                <div className="d-grid gap-2 mt-4">

                                    <Link
                                        to="/orders"
                                        className="btn btn-success btn-lg rounded-pill"
                                    >
                                        📦 View My Orders
                                    </Link>

                                    <Link
                                        to="/products"
                                        className="btn btn-outline-success rounded-pill"
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>

                            </div>

                        </div>

                        <p className="text-center text-muted small mt-4">
                            MediPharm • AI-powered healthcare shopping
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PaymentSuccess;