import React, { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const response = await api.get("/orders");

                setOrders(response.data);

            } catch (error) {

                console.error(
                    "Error fetching orders:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadOrders();

    }, []);


    return (
        <div className="bg-light min-vh-100">

            <div className="container py-5">


                <div className="mb-5">

                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                        📦 Your purchases
                    </span>

                    <h1 className="fw-bold mt-3">
                        My Orders
                    </h1>

                    <p className="text-muted">
                        Track and view your MediPharm orders.
                    </p>

                </div>


                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading your orders...
                        </p>

                    </div>

                ) : orders.length === 0 ? (

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body text-center py-5">

                            <div className="display-3">
                                📦
                            </div>

                            <h4 className="fw-bold mt-3">
                                No orders yet
                            </h4>

                            <p className="text-muted">
                                Your completed orders will appear here.
                            </p>

                            <a
                                href="/products"
                                className="btn btn-success rounded-pill px-4"
                            >
                                Browse Medicines
                            </a>

                        </div>

                    </div>

                ) : (

                    <div className="row g-4">

                        {orders.map((order) => (

                            <div
                                className="col-12"
                                key={order.id}
                            >

                                <div className="card border-0 shadow-sm rounded-4">

                                    <div className="card-body p-4">


                                        <div className="row align-items-center">


                                            <div className="col-md-2">

                                                <small className="text-muted">
                                                    Order
                                                </small>

                                                <h6 className="fw-bold">
                                                    #{order.id}
                                                </h6>

                                            </div>


                                            <div className="col-md-3">

                                                <small className="text-muted">
                                                    Date
                                                </small>

                                                <div className="fw-semibold">
                                                    {order.createdAt ||
                                                        "Recently"}
                                                </div>

                                            </div>


                                            <div className="col-md-3">

                                                <small className="text-muted">
                                                    Total
                                                </small>

                                                <div className="fw-bold text-success">
                                                    ₹{order.totalAmount}
                                                </div>

                                            </div>


                                            <div className="col-md-2">

                                                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                                                    ✓ Confirmed
                                                </span>

                                            </div>


                                            <div className="col-md-2 text-md-end mt-3 mt-md-0">

                                                <button
                                                    className="btn btn-outline-success rounded-pill"
                                                >
                                                    View Order
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Orders;