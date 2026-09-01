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


  // ==========================================
  // GET ROLE FROM JWT TOKEN
  // ==========================================

  const getRoleFromToken = (token) => {

    try {

      const base64Payload = token.split(".")[1];

      const decodedPayload = JSON.parse(
        atob(
          base64Payload
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      console.log("=================================");
      console.log("JWT PAYLOAD");
      console.log(decodedPayload);
      console.log("JWT Email:", decodedPayload.sub);
      console.log("JWT Role:", decodedPayload.role);
      console.log("=================================");

      return decodedPayload.role;

    } catch (error) {

      console.error("JWT DECODE FAILED:", error);

      return null;

    }

  };


  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    console.log("=================================");
    console.log("LOGIN STARTED");
    console.log("Email:", email);
    console.log(
      "Old token:",
      localStorage.getItem("token")
    );
    console.log("=================================");


    // ==========================================
    // REMOVE OLD LOGIN SESSION
    // ==========================================

    localStorage.removeItem("token");
    localStorage.removeItem("role");


    try {

      // ==========================================
      // LOGIN API REQUEST
      // ==========================================

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );


      console.log("=================================");
      console.log("LOGIN RESPONSE");
      console.log("Status:", response.status);
      console.log("Response:", response.data);
      console.log("=================================");


      // ==========================================
      // GET JWT TOKEN
      // ==========================================

      const token =
        response.data.token ||
        response.data.jwtToken ||
        response.data;


      console.log("JWT Token:", token);


      if (!token || typeof token !== "string") {

        throw new Error(
          "JWT token was not received from backend."
        );

      }


      // ==========================================
      // SAVE JWT TOKEN
      // ==========================================

      localStorage.setItem(
        "token",
        token
      );


      console.log("=================================");
      console.log("TOKEN SAVED");
      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );
      console.log("=================================");


      // ==========================================
      // GET ROLE FROM JWT
      // ==========================================

      const role = getRoleFromToken(token);


      console.log("=================================");
      console.log("LOGIN ROLE CHECK");
      console.log("Email:", email);
      console.log("Role:", role);
      console.log("=================================");


      // ==========================================
      // SAVE ROLE
      // ==========================================

      if (role) {

        localStorage.setItem(
          "role",
          role
        );

      }


      // ==========================================
      // ADMIN REDIRECT
      // ==========================================

      if (
        role === "ADMIN" ||
        role === "ROLE_ADMIN"
      ) {

        console.log(
          "ADMIN LOGIN SUCCESS"
        );

        console.log(
          "REDIRECTING TO ADMIN DASHBOARD"
        );


        navigate(
          "/admin/dashboard",
          { replace: true }
        );

      }


      // ==========================================
      // NORMAL USER REDIRECT
      // ==========================================

      else {

        console.log(
          "USER LOGIN SUCCESS"
        );

        console.log(
          "REDIRECTING TO HOME PAGE"
        );


        navigate(
          "/",
          { replace: true }
        );

      }


    } catch (error) {

      console.error("=================================");
      console.error("LOGIN FAILED");
      console.error(error);
      console.error("=================================");


      if (error.response) {

        console.error(
          "Backend Status:",
          error.response.status
        );

        console.error(
          "Backend Response:",
          error.response.data
        );

      }


      setError(
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5 px-3"
      style={{
        paddingTop: "90px"
      }}
    >

      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden w-100"
        style={{
          maxWidth: "960px"
        }}
      >

        <div className="row g-0">


          {/* LEFT SIDE */}

          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-5 text-white"
            style={{
              background:
                "linear-gradient(160deg, #059669 0%, #047857 50%, #065f46 100%)"
            }}
          >

            <div>

              <div
                className="d-inline-flex align-items-center justify-content-center bg-white text-success rounded-3 shadow-sm mb-3"
                style={{
                  width: "48px",
                  height: "48px"
                }}
              >
                ⚕
              </div>

              <h3 className="fw-bold mb-0">
                MediAI
              </h3>

              <p className="text-white-50 small mb-0">
                Intelligent Healthcare Assistant
              </p>

            </div>


            <div className="my-4">

              <h2 className="fw-bold mb-3 lh-sm">
                Your intelligent
                <br />
                pharmacy assistant.
              </h2>

              <p className="text-white-50 small mb-4">
                Understand prescriptions, find medicines,
                and manage your dosage schedules with AI.
              </p>

              <div className="d-flex flex-column gap-2 small">

                <div>
                  ✓ AI Prescription Analysis
                </div>

                <div>
                  ✓ Smart Medicine Search
                </div>

                <div>
                  ✓ Secure Ordering & Reminders
                </div>

              </div>

            </div>


            <div className="small text-white-50">
              © 2026 MediPharm
            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="col-lg-7 p-4 p-sm-5 bg-white d-flex flex-column justify-content-center">

            <div className="mb-4">

              <h2 className="fw-bold text-dark mb-1">
                Welcome back
              </h2>

              <p className="text-muted small mb-0">
                Sign in to manage your prescriptions and orders
              </p>

            </div>


            {error && (

              <div
                className="alert alert-danger rounded-3"
                role="alert"
              >
                ⚠ {error}
              </div>

            )}


            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <div className="input-group input-group-lg">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-success btn-lg rounded-pill w-100 py-3 fw-bold"
              >

                {loading
                  ? "Signing in..."
                  : "Sign In"
                }

              </button>

            </form>


            {/* REGISTER */}

            <div className="text-center mt-4 pt-3 border-top">

              <p className="text-muted small mb-0">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="text-success fw-bold text-decoration-none"
                >
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