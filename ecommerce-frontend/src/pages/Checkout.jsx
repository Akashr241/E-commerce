import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { checkout } from "../services/checkoutService";

function Checkout() {

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

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
                        onCheckout={handleCheckout}
                    />

                </div>

            </div>

        </div>

    );

}

export default Checkout;