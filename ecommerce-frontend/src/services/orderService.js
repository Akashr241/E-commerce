
import axios from "axios";

export const placeOrder = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/orders/place/",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};