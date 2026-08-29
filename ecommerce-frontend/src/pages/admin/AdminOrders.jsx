import React, { useEffect, useState } from "react";

import {
    getAllOrders,
    updateOrderStatus
} from "../../services/adminOrderService";

import "./AdminOrders.css";


function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);


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
    // UPDATE ORDER STATUS
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

            setUpdatingOrderId(orderId);

            await updateOrderStatus(
                orderId,
                status
            );

            alert(
                "Order status updated successfully"
            );

            await loadOrders();

        } catch (error) {

            console.error(
                "Status update failed:",
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

            setUpdatingOrderId(null);

        }

    };


    // ===============================
    // STATUS COUNT
    // ===============================

    const getStatusCount = (status) => {

        return orders.filter(
            order => order.status === status
        ).length;

    };


    // ===============================
    // STATUS CLASS
    // ===============================

    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "status-pending";

            case "CONFIRMED":
                return "status-confirmed";

            case "SHIPPED":
                return "status-shipped";

            case "DELIVERED":
                return "status-delivered";

            case "CANCELLED":
                return "status-cancelled";

            default:
                return "status-default";

        }

    };


    return (

        <div className="admin-orders-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="admin-orders-header">

                <div>

                    <p className="admin-page-label">
                        ADMIN PANEL
                    </p>

                    <h2>
                        Order Management
                    </h2>

                    <p className="admin-page-description">
                        Manage customer orders and update
                        their delivery status.
                    </p>

                </div>


                <div className="total-orders-box">

                    <span>
                        Total Orders
                    </span>

                    <strong>
                        {orders.length}
                    </strong>

                </div>

            </div>



            {/* =================================
                STATUS SUMMARY
            ================================= */}

            <div className="order-summary">


                <div className="summary-card">

                    <div className="summary-icon pending">
                        ⏳
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {getStatusCount("PENDING")}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon confirmed">
                        ✓
                    </div>

                    <div>

                        <span>
                            Confirmed
                        </span>

                        <strong>
                            {getStatusCount("CONFIRMED")}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon shipped">
                        🚚
                    </div>

                    <div>

                        <span>
                            Shipped
                        </span>

                        <strong>
                            {getStatusCount("SHIPPED")}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon delivered">
                        ✓
                    </div>

                    <div>

                        <span>
                            Delivered
                        </span>

                        <strong>
                            {getStatusCount("DELIVERED")}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon cancelled">
                        ×
                    </div>

                    <div>

                        <span>
                            Cancelled
                        </span>

                        <strong>
                            {getStatusCount("CANCELLED")}
                        </strong>

                    </div>

                </div>


            </div>



            {/* =================================
                ORDERS TABLE
            ================================= */}

            <div className="orders-container">


                <div className="orders-container-header">

                    <div>

                        <h4>
                            All Orders
                        </h4>

                        <p>
                            View and manage customer orders
                        </p>

                    </div>


                    <button
                        className="refresh-btn"
                        onClick={loadOrders}
                        disabled={loading}
                    >

                        ↻ Refresh

                    </button>

                </div>



                {loading ? (

                    <div className="orders-loading">

                        <div className="spinner-border">
                        </div>

                        <p>
                            Loading orders...
                        </p>

                    </div>

                ) : orders.length === 0 ? (

                    <div className="orders-empty">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h4>
                            No Orders Found
                        </h4>

                        <p>
                            There are currently no customer orders.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="admin-orders-table">

                            <thead>

                                <tr>

                                    <th>
                                        ORDER
                                    </th>

                                    <th>
                                        CUSTOMER
                                    </th>

                                    <th>
                                        TOTAL
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        UPDATE STATUS
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {orders.map(
                                    (order) => (

                                        <tr
                                            key={order.id}
                                        >


                                            {/* ORDER ID */}

                                            <td>

                                                <div className="order-id">

                                                    <span>
                                                        #
                                                    </span>

                                                    {order.id}

                                                </div>

                                            </td>



                                            {/* CUSTOMER */}

                                            <td>

                                                <div className="customer-info">

                                                    <div className="customer-avatar">

                                                        {(order.userEmail ||
                                                            order.email ||
                                                            "U")
                                                            .charAt(0)
                                                            .toUpperCase()}

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {order.userEmail ||
                                                                order.email ||
                                                                "User"}
                                                        </strong>

                                                        <small>
                                                            Customer
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>



                                            {/* TOTAL */}

                                            <td>

                                                <strong className="order-price">

                                                    ₹
                                                    {order.totalAmount ||
                                                        order.total ||
                                                        0}

                                                </strong>

                                            </td>



                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`order-status ${getStatusClass(
                                                        order.status
                                                    )}`}
                                                >

                                                    <span className="status-dot">
                                                    </span>

                                                    {order.status}

                                                </span>

                                            </td>



                                            {/* UPDATE */}

                                            <td>

                                                <select
                                                    className="status-select"
                                                    value={
                                                        order.status
                                                    }
                                                    disabled={
                                                        updatingOrderId ===
                                                        order.id
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


                                                {updatingOrderId ===
                                                    order.id && (

                                                    <small className="updating-text">

                                                        Updating...

                                                    </small>

                                                )}

                                            </td>


                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


        </div>

    );

}


export default AdminOrders;