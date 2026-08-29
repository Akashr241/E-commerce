import React, { useEffect, useState } from "react";

import {
    getAllOrders,
    updateOrderStatus
} from "../../services/adminOrderService";


function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);


    // ===============================
    // LOAD ORDERS
    // ===============================

    const loadOrders = async () => {

        try {

            setLoading(true);

            const data = await getAllOrders();

            console.log(
                "========== ADMIN ORDERS =========="
            );

            console.log(data);

            setOrders(data);

        } catch (error) {

            console.error(
                "Failed to load orders:",
                error
            );

            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend:",
                    error.response.data
                );

            }

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadOrders();

    }, []);


    // ===============================
    // UPDATE STATUS
    // ===============================

    const handleStatusChange = async (
        orderId,
        status
    ) => {

        try {

            console.log(
                "Updating order:",
                orderId,
                status
            );

            await updateOrderStatus(
                orderId,
                status
            );

            alert(
                "Order status updated successfully"
            );

            loadOrders();

        } catch (error) {

            console.error(
                "Status update failed:",
                error
            );

        }

    };


    return (

        <div className="container py-4">

            <h2 className="mb-4">
                Order Management
            </h2>


            {loading ? (

                <p>
                    Loading orders...
                </p>

            ) : orders.length === 0 ? (

                <div className="alert alert-info">
                    No orders found.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Order ID</th>

                                <th>User</th>

                                <th>Total</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {orders.map(
                                (order) => (

                                <tr key={order.id}>

                                    <td>
                                        #{order.id}
                                    </td>


                                    <td>

                                        {order.userEmail ||
                                            order.email ||
                                            "User"}

                                    </td>


                                    <td>

                                        ₹
                                        {order.totalAmount ||
                                            order.total ||
                                            0}

                                    </td>


                                    <td>

                                        <span className="badge bg-secondary">

                                            {order.status}

                                        </span>

                                    </td>


                                    <td>

                                        <select
                                            className="form-select form-select-sm"
                                            value={
                                                order.status
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="PENDING">
                                                PENDING
                                            </option>

                                            <option value="CONFIRMED">
                                                CONFIRMED
                                            </option>

                                            <option value="SHIPPED">
                                                SHIPPED
                                            </option>

                                            <option value="DELIVERED">
                                                DELIVERED
                                            </option>

                                            <option value="CANCELLED">
                                                CANCELLED
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}

export default AdminOrders;