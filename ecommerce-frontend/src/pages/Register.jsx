import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
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

            await registerUser(user);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Name"
                    onChange={handleChange}
                />

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

                <button className="btn btn-success">
                    Register
                </button>

            </form>

        </div>

    );
}

export default Register;