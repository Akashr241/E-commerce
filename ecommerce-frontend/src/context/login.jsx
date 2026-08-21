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

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {

            setError("Please enter your email and password.");

            return;
        }

        try {

            setLoading(true);

            const response = await loginUser(formData);

            /*
             * Adjust this if your backend returns
             * the JWT using another property name.
             */
            const token =
                response.token ||
                response.jwtToken;

            if (!token) {

                setError(
                    "Login successful, but authentication token was not received."
                );

                return;
            }

            login(token);

            navigate("/");

        } catch (error) {

            console.error("Login failed:", error);

            const message =
                error.response?.data?.message ||
                "Invalid email or password. Please try again.";

            setError(message);

        } finally {

            setLoading(false);
        }
    };


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
                                Medi<span className="text-success">Pharm</span>
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
                                    </span>{" "}

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