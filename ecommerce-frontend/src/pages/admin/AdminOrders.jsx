import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

function AdminOrders() {

    return (
        <div>

            <AdminNavbar />

            <div className="admin-page">

                <h1>Order Management</h1>

                <p>
                    View and manage customer orders.
                </p>

            </div>

        </div>
    );
}

export default AdminOrders;