import React from "react";

function PaymentButton() {

    const handlePayment = () => {

        alert("Payment Started");

    };

    return (

        <button
            className="btn btn-success"
            onClick={handlePayment}
        >

            Pay Now

        </button>

    );

}

export default PaymentButton;