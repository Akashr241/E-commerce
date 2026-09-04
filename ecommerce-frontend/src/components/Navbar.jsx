import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");
    };


    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">

            <div className="container">


                {/* BRAND */}

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center gap-2 fw-bold"
                >

                    <span
                        className="
                            bg-success
                            text-white
                            rounded-3
                            d-flex
                            align-items-center
                            justify-content-center
                        "
                        style={{
                            width: "42px",
                            height: "42px"
                        }}
                    >
                        ⚕
                    </span>

                    <span>
                        Medi<span className="text-success">Pharm</span>
                    </span>

                </Link>


                {/* MOBILE BUTTON */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#pharmacyNavbar"
                    aria-controls="pharmacyNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* NAVIGATION */}

                <div
                    className="collapse navbar-collapse"
                    id="pharmacyNavbar"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">


                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                to="/"
                                className="nav-link fw-semibold"
                            >
                                Home
                            </Link>

                        </li>


                        {/* MEDICINES */}

                        <li className="nav-item">

                            <Link
                                to="/products"
                                className="nav-link fw-semibold"
                            >
                                Medicines
                            </Link>

                        </li>


                        {/* PRESCRIPTION */}

                        <li className="nav-item">

                            <Link
                                to="/prescription"
                                className="nav-link fw-semibold"
                            >
                                Prescription AI
                            </Link>

                        </li>


                        {/* ORDERS */}

                        {isLoggedIn && (

                            <li className="nav-item">

                                <Link
                                    to="/orders"
                                    className="nav-link fw-semibold"
                                >
                                    Orders
                                </Link>

                            </li>

                        )}


                        {/* CART */}

                        {isLoggedIn && (

                            <li className="nav-item">

                                <Link
                                    to="/cart"
                                    className="nav-link fw-semibold"
                                >
                                    🛒 Cart
                                </Link>

                            </li>

                        )}




                        {/* AUTH */}

                        {!isLoggedIn ? (

                            <>

                                <li className="nav-item">

                                    <Link
                                        to="/login"
                                        className="btn btn-outline-success px-3 ms-lg-2"
                                    >
                                        Login
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        to="/register"
                                        className="btn btn-success px-3"
                                    >
                                        Register
                                    </Link>

                                </li>

                            </>

                        ) : (

                            <li className="nav-item">

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger px-3 ms-lg-2"
                                >
                                    Logout
                                </button>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;