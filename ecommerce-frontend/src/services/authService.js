import API from "./api";

export const registerUser = (userData) => {
    return API.post("/auth/register", userData);
};

export const loginUser = (loginData) => {
    return API.post("/auth/login", loginData);
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};