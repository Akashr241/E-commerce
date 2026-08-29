import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

function AdminDashboard() {

    return (

        <div className="container py-5">

            <h1 className="mb-2">
                Admin Dashboard
            </h1>

            <p className="text-muted mb-5">
                Manage your pharmacy store
            </p>


            <div className="row g-4">

                {/* PRODUCTS */}

                <div className="col-md-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h4>
                                Products
                            </h4>

                            <p className="text-muted">
                                Add, edit and manage
                                pharmacy products.
                            </p>

                            <Link
                                to="/admin/products"
                                className="btn btn-success"
                            >
                                Manage Products
                            </Link>

                        </div>

                    </div>

                </div>


                {/* ORDERS */}

                <div className="col-md-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h4>
                                Orders
                            </h4>

                            <p className="text-muted">
                                View orders and update
                                order status.
                            </p>

                            <Link
                                to="/admin/orders"
                                className="btn btn-success"
                            >
                                Manage Orders
                            </Link>

                        </div>

                    </div>

                </div>


                {/* USERS */}

                <div className="col-md-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h4>
                                Users
                            </h4>

                            <p className="text-muted">
                                View registered users
                                and their roles.
                            </p>

                            <Link
                                to="/admin/users"
                                className="btn btn-success"
                            >
                                Manage Users
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;