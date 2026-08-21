import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        if (
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {

            setError("Please fill in all fields.");

            return;
        }


        if (formData.password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        try {

            setLoading(true);

            await registerUser(formData);

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again.";

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


                        {/* BRAND */}

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


                        {/* CARD */}

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-4 p-md-5">

                                <h3 className="fw-bold mb-1">
                                    Create your account
                                </h3>

                                <p className="text-muted mb-4">
                                    Join MediPharm and manage your medicines smarter.
                                </p>


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


                                {/* SUCCESS */}

                                {success && (

                                    <div
                                        className="
                                            alert
                                            alert-success
                                            border-0
                                            rounded-3
                                        "
                                    >
                                        {success}
                                    </div>

                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold"
                                        >
                                            Full name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg rounded-3"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />

                                    </div>


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
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
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


                                    {/* REGISTER */}

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

                                                Creating account...
                                            </>

                                        ) : (

                                            "Create Account"

                                        )}

                                    </button>

                                </form>


                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Already have an account?
                                    </span>{" "}

                                    <Link
                                        to="/login"
                                        className="
                                            text-success
                                            fw-semibold
                                            text-decoration-none
                                        "
                                    >
                                        Sign in
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="text-center mt-3">

                            <small className="text-muted">
                                By creating an account, you agree to use MediPharm responsibly.
                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;