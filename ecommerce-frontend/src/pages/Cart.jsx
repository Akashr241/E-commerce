import React, { useEffect, useState } from "react";
import { myCart, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart() {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {

            const response = await myCart();

            setCart(response);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const handleRemove = async (id) => {

        await removeFromCart(id);

        loadCart();

    };

    if (loading) {

        return (
            <div className="container mt-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {

        return (
            <div className="container mt-5">

                <h2>Your Cart</h2>

                <hr />

                <h4>Cart is Empty</h4>

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>

            </div>
        );

    }

    return (

        <div className="container mt-4">

            <h2>Your Cart</h2>

            <hr />

            {cart.cartItems.map(item => (

                <div className="card mb-3" key={item.id}>

                    <div className="card-body">

                        <h4>{item.productName}</h4>

                        <p>
                            Price :
                            ₹ {item.price}
                        </p>

                        <p>
                            Quantity :
                            {item.quantity}
                        </p>

                        <p>
                            Subtotal :
                            ₹ {item.subTotal}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={() => handleRemove(item.id)}
                        >
                            Remove
                        </button>

                    </div>

                </div>

            ))}

            <div className="card mt-4">

                <div className="card-body">

                    <h3>Total : ₹ {cart.totalPrice}</h3>

                    <button
                        className="btn btn-success me-3"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed To Checkout
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/products")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Cart;