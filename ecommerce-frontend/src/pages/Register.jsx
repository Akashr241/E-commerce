import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      await registerUser(user);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5 px-3">
      <div className="w-100" style={{ maxWidth: "480px" }}>
        
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-4 shadow-sm mb-3"
            style={{ width: "56px", height: "56px" }}
          >
            <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="fw-bold text-dark mb-1">Create an Account</h2>
          <p className="text-muted small">Join MediPharm to manage medications and reminders</p>
        </div>

        {/* Card Form */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-4 p-sm-5">
            
            {/* Feedback Alerts */}
            {successMessage && (
              <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 small py-2 mb-4">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 small py-2 mb-4">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary small">Full Name</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    className="form-control border-start-0 ps-0 fs-6"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Address */}
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
                    name="email"
                    value={user.email}
                    className="form-control border-start-0 ps-0 fs-6"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary small">Password</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    className="form-control border-start-0 border-end-0 ps-0 fs-6"
                    placeholder="Create a strong password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
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
                disabled={submitting}
                className="btn btn-success btn-lg rounded-pill w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Footer / Login Link */}
            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-success fw-bold text-decoration-none">
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;