import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


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
    // LOGIN
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!formData.email || !formData.password) {

            console.log(
                "LOGIN FAILED → Email or password is empty"
            );

            setError(
                "Please enter your email and password."
            );

            return;
        }


        try {

            setLoading(true);


            // ==========================================
            // DEBUG: LOGIN START
            // ==========================================

            console.log("=================================");
            console.log("LOGIN STARTED");
            console.log("Email:", formData.email);

            console.log(
                "Old token:",
                localStorage.getItem("token")
            );

            console.log("=================================");


            // ==========================================
            // LOGIN API REQUEST
            // ==========================================

            console.log(
                "Sending login request..."
            );

            const response =
                await loginUser(formData);


            // ==========================================
            // DEBUG: LOGIN RESPONSE
            // ==========================================

            console.log(
                "========== LOGIN RESPONSE =========="
            );

            console.log(
                "Response:",
                response
            );


            // ==========================================
            // GET JWT TOKEN
            // ==========================================

            const token =
                response.token ||
                response.jwtToken;


            console.log(
                "JWT Token:",
                token
            );


            // ==========================================
            // TOKEN VALIDATION
            // ==========================================

            if (!token) {

                console.error(
                    "LOGIN ERROR → JWT token not found"
                );

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


            console.log(
                "Encoded JWT payload:",
                payload
            );


            const decodedPayload =
                JSON.parse(
                    atob(
                        payload
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );


            // ==========================================
            // DEBUG: JWT DATA
            // ==========================================

            console.log(
                "========== JWT PAYLOAD =========="
            );

            console.log(
                decodedPayload
            );

            console.log(
                "JWT Email:",
                decodedPayload.sub
            );

            console.log(
                "JWT Role:",
                decodedPayload.role
            );


            // ==========================================
            // CHECK ROLE
            // ==========================================

            const role =
                decodedPayload.role;


            if (!role) {

                console.error(
                    "JWT ERROR → Role is missing from token!"
                );

                console.error(
                    "Decoded payload:",
                    decodedPayload
                );
            }


            // ==========================================
            // SAVE LOGIN
            // ==========================================

            console.log(
                "Saving token to AuthContext..."
            );

            login(token);


            console.log(
                "Token after login:",
                localStorage.getItem("token")
            );


            // ==========================================
            // ROLE BASED REDIRECT
            // ==========================================

            console.log(
                "========== USER ROLE =========="
            );

            console.log(
                "Logged in email:",
                decodedPayload.sub
            );

            console.log(
                "Logged in role:",
                role
            );


            if (role === "ADMIN") {

                console.log(
                    "================================="
                );

                console.log(
                    "ADMIN DETECTED"
                );

                console.log(
                    "ADMIN LOGIN → /admin"
                );

                console.log(
                    "================================="
                );

                navigate("/admin/dashboard");

            } else {

                console.log(
                    "================================="
                );

                console.log(
                    "NORMAL USER DETECTED"
                );

                console.log(
                    "USER LOGIN → /"
                );

                console.log(
                    "================================="
                );

                navigate("/");
            }


        } catch (error) {

            // ==========================================
            // DEBUG: LOGIN ERROR
            // ==========================================

            console.error(
                "================================="
            );

            console.error(
                "LOGIN FAILED"
            );

            console.error(
                "Full error:",
                error
            );

            console.error(
                "Error response:",
                error.response
            );

            console.error(
                "Error data:",
                error.response?.data
            );

            console.error(
                "================================="
            );


            const message =
                error.response?.data?.message ||
                "Invalid email or password. Please try again.";


            setError(message);


        } finally {

            // ==========================================
            // DEBUG: LOGIN FINISHED
            // ==========================================

            console.log(
                "LOGIN PROCESS FINISHED"
            );

            setLoading(false);
        }
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


                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-4 p-md-5">


                                <div className="mb-4">

                                    <h3 className="fw-bold">
                                        Welcome back
                                    </h3>

                                    <p className="text-muted">
                                        Sign in to continue to your pharmacy account.
                                    </p>

                                </div>


                                {/* ERROR */}

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


                                {/* LOGIN FORM */}

                                <form onSubmit={handleSubmit}>


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
                                            className="form-control form-control-lg rounded-3"
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
                                                className="form-control form-control-lg rounded-start-3"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="current-password"
                                            />


                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary rounded-end-3"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword
                                                    ? "Hide"
                                                    : "Show"}
                                            </button>

                                        </div>

                                    </div>


                                    {/* LOGIN BUTTON */}

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