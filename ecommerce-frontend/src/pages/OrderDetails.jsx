import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function OrderDetails() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8080/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Order Details:", response.data);

            setOrder(response.data);

        } catch (error) {

            console.log("Order details error:", error);

            setError("Unable to load order details.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>Loading order details...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">

                <div className="alert alert-danger">
                    {error}
                </div>

                <Link
                    to="/orders"
                    className="btn btn-outline-success"
                >
                    ← Back to Orders
                </Link>

            </div>
        );
    }

    return (

        <div className="container mt-4 mb-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        Order #{order.id}
                    </h2>

                    <p className="text-muted mb-0">
                        Order Date:{" "}
                        {new Date(order.orderDate).toLocaleString()}
                    </p>

                </div>

                <span className="badge bg-success fs-6">
                    {order.status}
                </span>

            </div>


            {/* PRODUCTS */}

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <h4 className="fw-bold mb-4">
                        Order Items
                    </h4>

                    {order.orderItems.map((item) => (

                        <div
                            key={item.id}
                            className="border-bottom py-3"
                        >

                            <div className="row align-items-center">

                                <div className="col-md-5">

                                    <h5 className="mb-1">
                                        {item.productName}
                                    </h5>

                                </div>

                                <div className="col-md-2">

                                    <span className="text-muted">
                                        Quantity
                                    </span>

                                    <br />

                                    <strong>
                                        {item.quantity}
                                    </strong>

                                </div>

                                <div className="col-md-2">

                                    <span className="text-muted">
                                        Price
                                    </span>

                                    <br />

                                    <strong>
                                        ₹{item.price}
                                    </strong>

                                </div>

                                <div className="col-md-3 text-md-end">

                                    <span className="text-muted">
                                        Subtotal
                                    </span>

                                    <br />

                                    <strong>
                                        ₹{item.subtotal}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    ))}


                    {/* TOTAL */}

                    <div className="row mt-4">

                        <div className="col-md-8">
                            <h5 className="fw-bold">
                                Total Amount
                            </h5>
                        </div>

                        <div className="col-md-4 text-md-end">

                            <h4 className="fw-bold text-success">
                                ₹{order.totalAmount}
                            </h4>

                        </div>

                    </div>

                </div>

            </div>


            {/* BACK */}

            <div className="mt-4">

                <Link
                    to="/orders"
                    className="btn btn-outline-success rounded-pill"
                >
                    ← Back to My Orders
                </Link>

            </div>

        </div>
    );
}

export default OrderDetails;