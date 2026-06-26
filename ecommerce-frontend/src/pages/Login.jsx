import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(user);

            login(response.data.token);

            alert("Login Successful");

            navigate("/products");

        } catch (error) {

            console.error(error);

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

        </div>

    );
}

export default Login;