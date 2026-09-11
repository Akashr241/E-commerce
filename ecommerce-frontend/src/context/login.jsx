
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import OAuth2Redirect from "../pages/OAuth2Redirect";

import {
    loginUser,
    loginWithGoogle
} from "../services/authService";

import { useAuth } from "../context/AuthContext";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    // ==========================================
    // STATES
    // ==========================================

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
    };


    // ==========================================
    // NORMAL LOGIN
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!formData.email || !formData.password) {

            setError(
                "Please enter your email and password."
            );

            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // LOGIN API REQUEST
            // ==========================================

            const response =
                await loginUser(formData);


            // ==========================================
            // GET JWT TOKEN
            // ==========================================

            const token =
                response.token ||
                response.jwtToken;


            // ==========================================
            // TOKEN VALIDATION
            // ==========================================

            if (!token) {

                setError(
                    "Login successful, but authentication token was not received."
                );

                return;
            }


            // ==========================================
            // DECODE JWT
            // ==========================================

            const payload =
                token.split(".")[1];


            const decodedPayload =
                JSON.parse(
                    atob(
                        payload
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );


            // ==========================================
            // GET USER ROLE
            // ==========================================

            const role =
                decodedPayload.role;


            // ==========================================
            // SAVE LOGIN
            // ==========================================

            login(token);


            // ==========================================
            // ROLE BASED REDIRECT
            // ==========================================

            if (role === "ADMIN") {

                navigate(
                    "/admin/dashboard"
                );

            } else {

                navigate("/");
            }


        } catch (error) {

            console.error(
                "LOGIN FAILED:",
                error
            );


            const message =
                error.response?.data?.message ||
                "Invalid email or password. Please try again.";


            setError(message);


        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    const handleGoogleLogin = () => {

        console.log(
            "GOOGLE LOGIN STARTED"
        );
        window.location.href =
            "https://accounts.google.com/oauth2/authorization/google";

        loginWithGoogle();
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="min-vh-100 d-flex align-items-center py-5"
            style={{
                background:
                    "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">


                        {/* ========================================== */}
                        {/* LOGO */}
                        {/* ========================================== */}

                        <div className="text-center mb-4">

                            <div
                                className="
                                    bg-success
                                    text-white
                                    rounded-circle
                                    d-inline-flex
                                    align-items-center
                                    justify-content-center
                                    shadow
                                "
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    fontSize: "32px"
                                }}
                            >
                                ⚕
                            </div>


                            <h2 className="fw-bold mt-3 mb-1">

                                Medi

                                <span className="text-success">
                                    Pharm
                                </span>

                            </h2>


                            <p className="text-muted mb-0">
                                Your intelligent pharmacy assistant
                            </p>

                        </div>


                        {/* ========================================== */}
                        {/* LOGIN CARD */}
                        {/* ========================================== */}

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-4 p-md-5">


                                {/* ========================================== */}
                                {/* HEADER */}
                                {/* ========================================== */}

                                <div className="mb-4">

                                    <h3 className="fw-bold">
                                        Welcome back
                                    </h3>

                                    <p className="text-muted">
                                        Sign in to continue to your pharmacy account.
                                    </p>

                                </div>


                                {/* ========================================== */}
                                {/* ERROR */}
                                {/* ========================================== */}

                                {error && (

                                    <div
                                        className="
                                            alert
                                            alert-danger
                                            border-0
                                            rounded-3
                                        "
                                    >
                                        {error}
                                    </div>

                                )}


                                {/* ========================================== */}
                                {/* LOGIN FORM */}
                                {/* ========================================== */}

                                <form
                                    onSubmit={handleSubmit}
                                >


                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold"
                                        >
                                            Email address
                                        </label>


                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="
                                                form-control
                                                form-control-lg
                                                rounded-3
                                            "
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="password"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>


                                        <div className="input-group">

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                className="
                                                    form-control
                                                    form-control-lg
                                                    rounded-start-3
                                                "
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="current-password"
                                            />


                                            <button
                                                type="button"
                                                className="
                                                    btn
                                                    btn-outline-secondary
                                                    rounded-end-3
                                                "
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {
                                                    showPassword
                                                        ? "Hide"
                                                        : "Show"
                                                }
                                            </button>

                                        </div>

                                    </div>


                                    {/* ========================================== */}
                                    {/* NORMAL LOGIN BUTTON */}
                                    {/* ========================================== */}

                                    <button
                                        type="submit"
                                        className="
                                            btn
                                            btn-success
                                            btn-lg
                                            w-100
                                            rounded-3
                                            fw-semibold
                                        "
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>

                                                <span
                                                    className="
                                                        spinner-border
                                                        spinner-border-sm
                                                        me-2
                                                    "
                                                />

                                                Signing in...

                                            </>

                                        ) : (

                                            "Sign In"

                                        )}

                                    </button>

                                </form>


                                {/* ========================================== */}
                                {/* OR DIVIDER */}
                                {/* ========================================== */}

                                <div className="d-flex align-items-center my-4">

                                    <hr className="flex-grow-1" />

                                    <span className="mx-3 text-muted small">
                                        OR
                                    </span>

                                    <hr className="flex-grow-1" />

                                </div>


                                {/* ========================================== */}
                                {/* GOOGLE LOGIN */}
                                {/* ========================================== */}

                                <button
                                    type="button"
                                    className="
                                        btn
                                        btn-outline-secondary
                                        btn-lg
                                        w-100
                                        rounded-3
                                        fw-semibold
                                        d-flex
                                        align-items-center
                                        justify-content-center
                                        gap-2
                                    "
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                >

                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        G
                                    </span>

                                    Continue with Google

                                </button>


                                {/* ========================================== */}
                                {/* REGISTER */}
                                {/* ========================================== */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Don't have an account?
                                    </span>

                                    {" "}

                                    <Link
                                        to="/register"
                                        className="
                                            text-success
                                            fw-semibold
                                            text-decoration-none
                                        "
                                    >
                                        Create account
                                    </Link>

                                </div>


                            </div>

                        </div>


                        {/* ========================================== */}
                        {/* SECURITY MESSAGE */}
                        {/* ========================================== */}

                        <div className="text-center mt-3">

                            <small className="text-muted">
                                🔒 Your account and health information are protected.
                            </small>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
};


export default Login;

