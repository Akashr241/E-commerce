import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = () => {

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center">

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-7 col-lg-6">

                        <div className="card border-0 shadow-sm rounded-4 text-center">

                            <div className="card-body p-5">


                                {/* ERROR ICON */}

                                <div
                                    className="
                                        bg-danger-subtle
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

                                    <span className="fs-1 text-danger">
                                        !
                                    </span>

                                </div>


                                <h1 className="fw-bold">
                                    Payment Failed
                                </h1>

                                <p className="text-muted fs-5 mt-3">
                                    We couldn't complete your payment.
                                </p>


                                <div className="alert alert-warning border-0 rounded-4 text-start mt-4">

                                    <strong>
                                        What can you do?
                                    </strong>

                                    <ul className="mb-0 mt-2">

                                        <li>
                                            Check your payment details.
                                        </li>

                                        <li>
                                            Make sure your payment method
                                            is working.
                                        </li>

                                        <li>
                                            Try the payment again.
                                        </li>

                                    </ul>

                                </div>


                                <div className="d-grid gap-2 mt-4">

                                    <Link
                                        to="/checkout"
                                        className="btn btn-success btn-lg rounded-pill"
                                    >
                                        Try Payment Again
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="btn btn-outline-secondary rounded-pill"
                                    >
                                        Back to Cart
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <p className="text-center text-muted small mt-4">
                            Need help? Ask MediAI 🤖
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PaymentFailure;