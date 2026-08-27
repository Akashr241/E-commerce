import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { checkout } from "../services/checkoutService";
import { useNavigate } from "react-router-dom";
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

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        try {

            const response = await myCart();

            setCart(response);

        } catch (error) {

            console.log("Cart loading error:", error);

            setErrorMessage("Unable to load your cart.");

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Remove old error when user starts typing
        setErrorMessage("");
    };


    // ==============================
    // FORM VALIDATION
    // ==============================

    const validateForm = () => {

        if (!formData.fullName.trim()) {
            return "Please enter your full name.";
        }

        if (!formData.phone.trim()) {
            return "Please enter your phone number.";
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            return "Please enter a valid 10-digit phone number.";
        }

        if (!formData.address.trim()) {
            return "Please enter your address.";
        }

        if (!formData.city.trim()) {
            return "Please enter your city.";
        }

        if (!formData.state.trim()) {
            return "Please enter your state.";
        }

        if (!formData.country.trim()) {
            return "Please enter your country.";
        }

        if (!formData.pincode.trim()) {
            return "Please enter your pincode.";
        }

        if (!/^[0-9]{6}$/.test(formData.pincode)) {
            return "Please enter a valid 6-digit pincode.";
        }

        return null;
    };


    // ==============================
    // CHECKOUT
    // ==============================

    const handleCheckout = async () => {

        // Clear previous message
        setErrorMessage("");

        // First validate React form
        const validationError = validateForm();

        if (validationError) {

            setErrorMessage(validationError);

            // Alert message
            alert(validationError);

            return;
        }

        // Check cart
        if (!cart || !cart.cartItems || cart.cartItems.length === 0) {

            const message = "Your cart is empty.";

            setErrorMessage(message);

            alert(message);

            return;
        }

        setLoading(true);

        try {

            /*
             * Now request goes to Java backend.
             *
             * Java will validate:
             *
             * - Cart
             * - Products
             * - Prescription requirement
             * - Prescription validation
             */

            const response = await checkout(formData);

            console.log("Checkout successful:", response);

            // SUCCESS MESSAGE
            alert("Checkout successful! Proceeding to payment.");

            // Go to payment ONLY after Java succeeds
            navigate("/payment", {
                state: {
                    total: response.total,
                    items: response.items
                }
            });

        } catch (error) {

            console.log("Checkout error:", error);

            let message = "Checkout failed. Please try again.";

            /*
             * Backend error
             */

            if (error.response) {

                if (error.response.data) {

                    if (typeof error.response.data === "string") {

                        message = error.response.data;

                    } else if (error.response.data.message) {

                        message = error.response.data.message;

                    }
                }
            }

            setErrorMessage(message);

            alert(message);

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="container mt-4">

            {/* ==============================
                ERROR MESSAGE
            ============================== */}

            {errorMessage && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {errorMessage}
                </div>

            )}


            <div className="row">

                {/* ==============================
                    CHECKOUT FORM
                ============================== */}

                <div className="col-md-8">

                    <CheckoutForm
                        formData={formData}
                        handleChange={handleChange}
                    />

                </div>


                {/* ==============================
                    ORDER SUMMARY
                ============================== */}

                <div className="col-md-4">

                    <OrderSummary
                        cart={cart}
                        onCheckout={handleCheckout}
                        loading={loading}
                    />

                </div>

            </div>

        </div>

    );
}

export default Checkout;