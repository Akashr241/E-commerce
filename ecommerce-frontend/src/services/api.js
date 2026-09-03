import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");
        console.log("========== API REQUEST ==========");
        console.log("URL:", config.url);
        console.log("JWT Token:", token);


        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;
    },

    (error) => Promise.reject(error)

);

export default API;