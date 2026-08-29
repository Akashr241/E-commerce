import React from "react";
import { Link, useNavigate } from "react-router-dom";


function AdminNavbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="admin-navbar">

            <div className="admin-logo">
                MediPharm Admin
            </div>

            <div className="admin-nav-links">

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <Link to="/">
                    View Store
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default AdminNavbar;