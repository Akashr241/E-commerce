import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            const token =
                response.data.token ||
                response.data.jwtToken ||
                response.data;

            localStorage.setItem("token", token);

            navigate("/");

        } catch (error) {

            console.error("Login failed:", error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                <div className="auth-brand-section">

                    <div className="auth-logo">
                        ✚
                    </div>

                    <h1>
                        Medi<span>AI</span>
                    </h1>

                    <h2>
                        Your intelligent
                        <br />
                        pharmacy assistant.
                    </h2>

                    <p>
                        Understand prescriptions, find medicines
                        and manage your orders with AI.
                    </p>

                    <div className="auth-features">
                        <div>✓ AI Prescription Analysis</div>
                        <div>✓ Smart Medicine Search</div>
                        <div>✓ Secure Ordering</div>
                    </div>

                </div>


                <div className="auth-form-section">

                    <div className="auth-form">

                        <div className="mobile-logo">
                            💊 MediAI
                        </div>

                        <h2>Welcome back</h2>

                        <p className="auth-subtitle">
                            Sign in to continue to your pharmacy.
                        </p>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign In →"}
                            </button>

                        </form>

                        <div className="auth-register">
                            Don't have an account?
                            <Link to="/register">
                                Create account
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;