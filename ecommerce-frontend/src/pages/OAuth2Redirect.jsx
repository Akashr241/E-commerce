import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuth2Redirect = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { login } = useAuth();

    useEffect(() => {

        console.log("=================================");
        console.log("GOOGLE OAUTH REDIRECT STARTED");
        console.log("=================================");

        const token = searchParams.get("token");

        console.log("Google JWT:", token);

        // ------------------------------------------
        // CHECK TOKEN
        // ------------------------------------------

        if (!token) {

            console.error(
                "Google login failed: JWT token not found."
            );

            navigate("/login");

            return;
        }

        try {

            // ------------------------------------------
            // SAVE JWT
            // ------------------------------------------

            login(token);

            console.log(
                "Google JWT saved successfully."
            );

            // ------------------------------------------
            // REDIRECT TO HOME
            // ------------------------------------------

            navigate("/", { replace: true });

        } catch (error) {

            console.error(
                "Google OAuth redirect error:",
                error
            );

            navigate("/login");

        }

    }, [searchParams, login, navigate]);


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
        >

            <div className="text-center">

                <div
                    className="spinner-border text-success mb-3"
                    role="status"
                />

                <h5>
                    Signing you in with Google...
                </h5>

                <p className="text-muted">
                    Please wait a moment.
                </p>

            </div>

        </div>
    );
};

export default OAuth2Redirect;