import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

function AdminDashboard() {

    return (
        <div>

            <AdminNavbar />

            <div className="admin-dashboard">

                <div className="admin-header">
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage your MediPharm store from here.
                    </p>
                </div>


                <div className="admin-cards">

                    {/* Products */}

                    <div className="admin-card">

                        <h2>Products</h2>

                        <p>
                            Add, update and manage medicines
                            available in your store.
                        </p>

                        <Link to="/admin/products">
                            Manage Products
                        </Link>

                    </div>


                    {/* Orders */}

                    <div className="admin-card">

                        <h2>Orders</h2>

                        <p>
                            View customer orders and update
                            their order status.
                        </p>

                        <Link to="/admin/orders">
                            Manage Orders
                        </Link>

                    </div>


                    {/* Users */}

                    <div className="admin-card">

                        <h2>Users</h2>

                        <p>
                            View registered users of the
                            MediPharm application.
                        </p>

                        <button disabled>
                            Manage Users
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;