import api from "./api";

export const getMyOrders = () => {

    return api.get("/orders/my-orders");

};