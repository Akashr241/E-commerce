import React from "react";

function OrderSummary({ cart, onCheckout }) {

    if (!cart) {
        return <h5>Loading...</h5>;
    }

    const cartItems = cart.cartItems || [];

    const total = cartItems.reduce(
        (sum, item) =>
            sum + Number(
                item.subTotal ||
                item.subtotal ||
                0
            ),
        0
    );

    return (
        <div className="card shadow-sm p-4">

            <h3>Order Summary</h3>

            <hr />

            <p>
                Total Items: {cartItems.length}
            </p>

            <p>
                Total Amount: ₹{total}
            </p>

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