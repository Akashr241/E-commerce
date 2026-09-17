import api from "./api";


export const registerUser = async (userData) => {

    try {

        const response = await api.post(
            "/auth/register",
            userData
        );

        return response.data;

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        throw error;
    }
};


// ==========================================
// GOOGLE LOGIN
// ==========================================

export const loginWithGoogle = () => {

    // Redirect user to Spring Boot
    // Google OAuth2 authorization endpoint
    window.location.href =
    `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;

};

export const loginUser = async (credentials) => {

    try {

        const response = await api.post(
            "/auth/login",
            credentials
        );

        return response.data;

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        throw error;
    }
};