import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const decodeRole = (token) => {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(
            atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        return decoded.role;
    } catch {
        return null;
    }
};

// Usage:
//   <ProtectedRoute>...</ProtectedRoute>              -> any logged-in user
//   <ProtectedRoute requiredRole="ADMIN">...</ProtectedRoute>  -> admin only
const ProtectedRoute = ({ children, requiredRole }) => {

    const { isLoggedIn, token } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
        const role = decodeRole(token);

        if (role !== requiredRole) {
            // Logged in, but wrong role for this route.
            // Send USER trying admin routes back to "/",
            // and (in theory) admins trying user-only routes wherever makes sense.
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;