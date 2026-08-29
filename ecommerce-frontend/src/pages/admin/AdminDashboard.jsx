import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";

function AdminDashboard() {

    return (

        <div className="bg-light min-vh-100">

            {/* =================================
                ADMIN NAVBAR
            ================================= */}

            <AdminNavbar />


            {/* =================================
                DASHBOARD CONTENT
            ================================= */}

            <div className="container py-5">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="d-flex justify-content-between align-items-center mb-5">

                    <div>

                        <div className="text-secondary fw-semibold small text-uppercase mb-2">
                            Pharmacy Administration
                        </div>

                        <h1 className="fw-bold display-5 mb-2">
                            Admin Dashboard
                        </h1>

                        <p className="text-secondary fs-5 mb-0">
                            Manage your pharmacy store, orders and users.
                        </p>

                    </div>


                    {/* STORE MANAGEMENT */}

                    <div className="d-none d-md-block">

                        <div className="bg-white border rounded-4 shadow-sm px-4 py-3">

                            <small className="text-secondary d-block mb-1">
                                Admin Panel
                            </small>

                            <span className="fw-semibold fs-5">
                                Store Management
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================
                    MANAGEMENT CARDS
                ================================= */}

                <div className="row g-4">


                    {/* =================================
                        PRODUCTS
                    ================================= */}

                    <div className="col-lg-4">

                        <div className="card bg-white border rounded-4 shadow-sm h-100">

                            <div className="card-body p-4 p-xl-5 d-flex flex-column">

                                <h3 className="fw-bold text-success mb-3">
                                    Products
                                </h3>

                                <hr className="mb-4" />


                                <p className="text-secondary fs-5 flex-grow-1">
                                    Add new medicines, edit existing
                                    products and manage your pharmacy
                                    inventory.
                                </p>


                                <Link
                                    to="/admin/products"
                                    className="btn btn-success w-100 rounded-3
                                    fw-semibold py-3 mt-4"
                                >
                                    Manage Products
                                    <span className="ms-3 fs-5">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        ORDERS
                    ================================= */}

                    <div className="col-lg-4">

                        <div className="card bg-white border rounded-4 shadow-sm h-100">

                            <div className="card-body p-4 p-xl-5 d-flex flex-column">

                                <h3 className="fw-bold text-primary mb-3">
                                    Orders
                                </h3>

                                <hr className="mb-4" />


                                <p className="text-secondary fs-5 flex-grow-1">
                                    View customer orders, monitor their
                                    progress and update order status.
                                </p>


                                <Link
                                    to="/admin/orders"
                                    className="btn btn-primary w-100 rounded-3
                                    fw-semibold py-3 mt-4"
                                >
                                    Manage Orders
                                    <span className="ms-3 fs-5">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        USERS
                    ================================= */}

                    <div className="col-lg-4">

                        <div className="card bg-white border rounded-4 shadow-sm h-100">

                            <div className="card-body p-4 p-xl-5 d-flex flex-column">

                                <h3 className="fw-bold text-warning mb-3">
                                    Users
                                </h3>

                                <hr className="mb-4" />


                                <p className="text-secondary fs-5 flex-grow-1">
                                    View registered customers, their
                                    email addresses and account roles.
                                </p>


                                <Link
                                    to="/admin/users"
                                    className="btn btn-warning w-100 rounded-3
                                    fw-semibold py-3 mt-4"
                                >
                                    Manage Users
                                    <span className="ms-3 fs-5">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    ADMIN INFORMATION
                ================================= */}

                <div className="card bg-white border rounded-4 shadow-sm mt-5">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h5 className="fw-bold mb-2">
                                    Pharmacy Store Management
                                </h5>

                                <p className="text-secondary mb-0">
                                    Use the management sections above to
                                    control products, process customer
                                    orders and manage registered users.
                                </p>

                            </div>


                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <span
                                    className="badge bg-light text-dark
                                    border rounded-3 px-3 py-2 fs-6"
                                >
                                    🔐 Admin Access
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    FOOTER
                ================================= */}

                <div className="text-center text-secondary mt-5 pb-3">

                    <small>
                        © {new Date().getFullYear()} Pharmacy Store.
                        All rights reserved.
                    </small>

                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;