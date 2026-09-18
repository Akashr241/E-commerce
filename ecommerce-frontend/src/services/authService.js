import api from "./api";


export const registerUser = async (userData) => {

    try {

        const response = await api.post(
            "/auth/register",
            userData
        );
        
console.log("========== API REQUEST ==========");
console.log("Base URL:", config.baseURL);
console.log("URL:", config.url);
console.log("FULL URL:", config.baseURL + config.url);
console.log("JWT Token:", token);

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
        console.log("========== API REQUEST ==========");
console.log("Base URL:", config.baseURL);
console.log("URL:", config.url);
console.log("FULL URL:", config.baseURL + config.url);
console.log("JWT Token:", token);

        return response.data;

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        throw error;
    }
};