import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
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
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5 px-3"
      style={{ paddingTop: "90px" }}
    >
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden w-100" style={{ maxWidth: "960px" }}>
        <div className="row g-0">
          
          {/* =========================================
              LEFT SIDE: SOLID CLEAN GREEN BRAND PANEL
          ========================================= */}
          <div 
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white"
            style={{ 
              background: "linear-gradient(160deg, #059669 0%, #047857 50%, #065f46 100%)"
            }}
          >
            {/* Top Brand Header */}
            <div>
              <div 
                className="d-inline-flex align-items-center justify-content-center bg-white text-success rounded-3 shadow-sm mb-3"
                style={{ width: "48px", height: "48px" }}
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="fw-bold tracking-tight mb-0">MediAI</h3>
              <p className="text-white-50 small mb-0">Intelligent Healthcare Assistant</p>
            </div>

            {/* Middle Narrative */}
            <div className="my-4">
              <h2 className="fw-bold mb-3 lh-sm">
                Your intelligent <br />
                pharmacy assistant.
              </h2>
              <p className="text-white-50 small mb-4">
                Understand prescriptions, find medicines, and manage your dosage schedules with Gemini AI.
              </p>

              {/* Feature Points */}
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-white text-success rounded-circle p-1">✓</span>
                  <span>AI Prescription Analysis</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-white text-success rounded-circle p-1">✓</span>
                  <span>Smart Medicine Search</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-white text-success rounded-circle p-1">✓</span>
                  <span>Secure Ordering & Reminders</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="small text-white-50">
              © 2026 MediPharm. Secure 256-bit encryption.
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE: LOGIN FORM
          ========================================= */}
          <div className="col-lg-7 p-4 p-sm-5 bg-white d-flex flex-column justify-content-center">
            
            {/* Mobile Header */}
            <div className="text-center d-lg-none mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-3 shadow-sm mb-2"
                style={{ width: "48px", height: "48px" }}
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="fw-bold text-dark mb-0">MediAI</h4>
            </div>

            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-1">Welcome back</h2>
              <p className="text-muted small mb-0">Sign in to manage your prescriptions and orders</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 small py-2 mb-4" role="alert">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              
              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary small">Email Address</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 ps-0 fs-6"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold text-secondary small mb-1">Password</label>
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0 ps-0 fs-6"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success btn-lg rounded-pill w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Redirect */}
            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-success fw-bold text-decoration-none">
                  Create an account
                </Link>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;