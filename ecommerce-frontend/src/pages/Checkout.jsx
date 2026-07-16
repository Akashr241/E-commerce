import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { checkout } from "../services/checkoutService";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import { myCart } from "../services/cartService";

function Checkout() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const [cart, setCart] = useState(null);

useEffect(() => {
    loadCart();
}, []);

const loadCart = async () => {
    try {
        const response = await myCart();
        setCart(response);
    } catch (error) {
        console.log(error);
    }
};

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleCheckout = async () => {

    try {

        const response = await checkout(formData);

        console.log(response);

        alert("Order placed successfully!");

        navigate("/payment");

    } catch (error) {

        console.log(error);

        alert("Checkout failed!");

    }

};

    return (

        <div className="container mt-4">

            <div className="row">

                <div className="col-md-8">

                    <CheckoutForm
                        formData={formData}
                        handleChange={handleChange}
                    />

                </div>

                <div className="col-md-4">

                    <OrderSummary
                    cart={cart}
                        onCheckout={handleCheckout}
                    />

                </div>

            </div>

        </div>

    );

}

export default Checkout;