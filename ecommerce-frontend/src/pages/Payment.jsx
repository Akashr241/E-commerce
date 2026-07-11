import React from "react";
import PaymentButton from "../components/PaymentButton";

function Payment() {

    return (

        <div className="container mt-5">

            <h2>Payment</h2>

            <p>Total Amount : ₹3000</p>

            <PaymentButton />

        </div>

    );
}

export default Payment;