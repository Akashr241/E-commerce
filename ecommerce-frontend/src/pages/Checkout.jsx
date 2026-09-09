import React, { useEffect, useState } from "react";
import {
myCart,
removeFromCart
} from "../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart() {


const navigate = useNavigate();

// ==========================================
// CART STATE
// ==========================================

const [cart, setCart] = useState(null);

const [loading, setLoading] = useState(true);

const [deletingItemId, setDeletingItemId] =
    useState(null);

const [errorMessage, setErrorMessage] =
    useState("");


// ==========================================
// LOAD CART FROM BACKEND
// ==========================================

const loadCart = async () => {

    try {

        console.log(
            "========== FETCHING CART =========="
        );

        setLoading(true);

        const response = await myCart();

        console.log(
            "Latest cart received:",
            JSON.stringify(response, null, 2)
        );

        setCart(response);

        setErrorMessage("");

    } catch (error) {

        console.error(
            "Failed to load cart:",
            error
        );

        setErrorMessage(
            "Unable to load your cart."
        );

    } finally {

        setLoading(false);

    }

};


// ==========================================
// LOAD CART WHEN PAGE OPENS
// ==========================================

useEffect(() => {

    loadCart();

}, []);


// ==========================================
// REMOVE CART ITEM
// ==========================================

const handleRemoveItem = async (cartItemId) => {

    try {

        console.log(
            "========== REMOVE CART ITEM =========="
        );

        console.log(
            "Cart Item ID:",
            cartItemId
        );

        setDeletingItemId(cartItemId);

        // ----------------------------------
        // DELETE FROM BACKEND
        // ----------------------------------

        await removeFromCart(cartItemId);

        console.log(
            "Cart item deleted successfully"
        );


        // ----------------------------------
        // IMPORTANT:
        // FETCH THE NEW CART FROM BACKEND
        // ----------------------------------

        console.log(
            "Fetching updated cart after deletion..."
        );

        const updatedCart = await myCart();

        console.log(
            "Updated cart received:",
            JSON.stringify(updatedCart, null, 2)
        );


        // ----------------------------------
        // UPDATE REACT STATE
        // ----------------------------------

        setCart(updatedCart);

        console.log(
            "Cart UI updated successfully"
        );


    } catch (error) {

        console.error(
            "Failed to remove cart item:",
            error
        );

        setErrorMessage(
            "Unable to remove item from cart."
        );

    } finally {

        setDeletingItemId(null);

    }

};


// ==========================================
// CALCULATE CART VALUES
// ==========================================

const cartItems = cart?.cartItems || [];

const totalItems = cartItems.length;

const totalAmount = cartItems.reduce(
    (sum, item) => {

        return sum +
            Number(
                item.subTotal ||
                item.subtotal ||
                (item.price * item.quantity) ||
                0
            );

    },
    0
);


// ==========================================
// GO TO CHECKOUT
// ==========================================

const handleCheckout = () => {

    console.log(
        "========== NAVIGATING TO CHECKOUT =========="
    );

    if (cartItems.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }

    navigate("/checkout");

};


// ==========================================
// LOADING
// ==========================================

if (loading) {

    return (

        <div className="container mt-4">

            <div className="text-center">

                <h4>
                    Loading cart...
                </h4>

            </div>

        </div>

    );

}


// ==========================================
// UI
// ==========================================

return (

    <div className="container mt-4">

        <h2 className="mb-4">
            My Cart
        </h2>


        {/* ERROR MESSAGE */}

        {errorMessage && (

            <div
                className="alert alert-danger"
                role="alert"
            >

                {errorMessage}

            </div>

        )}


        {/* EMPTY CART */}

        {cartItems.length === 0 ? (

            <div className="card shadow-sm p-4">

                <h4>
                    Your cart is empty.
                </h4>

            </div>

        ) : (

            <div className="row">


                {/* ==========================
                    LEFT SIDE - CART ITEMS
                ========================== */}

                <div className="col-md-8">

                    {cartItems.map((item) => (

                        <div
                            className="card shadow-sm mb-3"
                            key={item.id}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h5>
                                            {item.productName}
                                        </h5>

                                        <p className="mb-1">

                                            Price:
                                            {" "}
                                            ₹{item.price}

                                        </p>

                                        <p className="mb-1">

                                            Quantity:
                                            {" "}
                                            {item.quantity}

                                        </p>

                                        <p className="mb-0">

                                            Subtotal:
                                            {" "}
                                            ₹{
                                                item.subTotal ||
                                                item.subtotal ||
                                                (
                                                    item.price *
                                                    item.quantity
                                                )
                                            }

                                        </p>

                                    </div>


                                    <button

                                        className="btn btn-danger"

                                        onClick={() =>
                                            handleRemoveItem(
                                                item.id
                                            )
                                        }

                                        disabled={
                                            deletingItemId ===
                                            item.id
                                        }

                                    >

                                        {
                                            deletingItemId === item.id
                                                ? "Removing..."
                                                : "Remove"
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* ==========================
                    RIGHT SIDE - CART SUMMARY
                ========================== */}

                <div className="col-md-4">

                    <div className="card shadow-sm p-4">

                        <h3>
                            Cart Summary
                        </h3>

                        <hr />

                        <p>

                            <strong>
                                Total Products:
                            </strong>

                            {" "}

                            {totalItems}

                        </p>


                        <p>

                            <strong>
                                Total Amount:
                            </strong>

                            {" "}

                            ₹{totalAmount}

                        </p>


                        <button

                            className="btn btn-success w-100"

                            onClick={handleCheckout}

                        >

                            Proceed to Checkout

                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);

}

export default Cart;
