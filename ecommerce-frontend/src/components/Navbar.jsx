import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="main-navbar">
            <div className="navbar-container">

                <Link to="/" className="brand">
                    <span className="brand-icon">✚</span>
                    <span>Medi<span>AI</span></span>
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Medicines</Link>
                    <Link to="/prescription">Prescription AI</Link>

                    {token && (
                        <>
                            <Link to="/orders">Orders</Link>
                            <Link to="/cart" className="cart-link">
                                🛒 Cart
                            </Link>
                        </>
                    )}

                    <Link to="/chatbot" className="ai-link">
                        🤖 AI Assistant
                    </Link>

                    {token ? (
                        <button onClick={handleLogout} className="nav-button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="login-link">
                                Login
                            </Link>
                            <Link to="/register" className="register-link">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;