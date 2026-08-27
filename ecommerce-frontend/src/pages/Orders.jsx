import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("My Orders:", response.data);

            setOrders(response.data);

        } catch (error) {

            console.log("Error loading orders:", error);

            setError("Unable to load your orders.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>Loading your orders...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <h2 className="fw-bold mb-4">
                My Orders
            </h2>

            {orders.length === 0 ? (

                <div className="text-center mt-5">

                    <h4>No orders found</h4>

                    <p className="text-muted">
                        You haven't placed any orders yet.
                    </p>

                </div>

            ) : (

                orders.map((order) => (

                    <div
                        className="card shadow-sm border-0 mb-3"
                        key={order.id}
                    >

                        <div className="card-body">

                            <div className="row align-items-center">

                                <div className="col-md-7">

                                    <h5 className="fw-bold">
                                        Order #{order.id}
                                    </h5>

                                    <p className="mb-1">
                                        Total Amount:
                                        <strong className="ms-2">
                                            ₹{order.totalPrice}
                                        </strong>
                                    </p>

                                </div>

                                <div className="col-md-2">

                                    <span className="badge bg-success">
                                        {order.status}
                                    </span>

                                </div>

                                <div className="col-md-3 text-md-end mt-3 mt-md-0">

                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="btn btn-outline-success rounded-pill"
                                    >
                                        View Order →
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default Orders;