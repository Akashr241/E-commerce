import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {

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