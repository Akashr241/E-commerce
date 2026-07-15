import React from "react";
import Checkout  from "../pages/Checkout";

function OrderSummary({ onCheckout }) {

    return (

        <div className="card shadow-sm p-4">

            <h3>Order Summary</h3>

            <hr />

            <p>Total Items : 0</p>

            <p>Total Amount : ₹0</p>

            <button
                className="btn btn-success w-100"
                onClick={onCheckout}
            >
                Place Order
            </button>

        </div>

    );

}

export default OrderSummary;