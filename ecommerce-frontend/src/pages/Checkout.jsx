import React, { useEffect, useState } from "react";

import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

import { checkout } from "../services/checkoutService";
import { myCart } from "../services/cartService";

import { useNavigate } from "react-router-dom";


function Checkout() {

    const navigate = useNavigate();


    // ==========================================
    // FORM STATE
    // ==========================================

    const [formData, setFormData] = useState({

        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""

    });


    // ==========================================
    // CART STATE
    // ==========================================

    const [cart, setCart] = useState(null);

    const [cartLoading, setCartLoading] = useState(true);


    // ==========================================
    // OTHER STATES
    // ==========================================

    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOAD LATEST CART
    // ==========================================

    const loadCart = async () => {

        try {

            // Start loading
            setCartLoading(true);


            console.log(
                "========== CHECKOUT LOADING LATEST CART =========="
            );


            // Fetch latest cart from backend
            const response = await myCart();


            console.log(
                "Latest cart received:",
                JSON.stringify(response, null, 2)
            );


            // Update cart state
            setCart(response);


        } catch (error) {

            console.error(
                "Cart loading error:",
                error
            );


            setErrorMessage(
                "Unable to load your cart."
            );


        } finally {

            // VERY IMPORTANT
            // Stop loading whether API succeeds or fails
            setCartLoading(false);

        }

    };


    // ==========================================
    // LOAD CART WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        loadCart();

    }, []);


    // ==========================================
    // HANDLE FORM CHANGE
    // ==========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


        // Clear old error
        setErrorMessage("");

    };


    // ==========================================
    // FORM VALIDATION
    // ==========================================

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


    // ==========================================
    // HANDLE CHECKOUT
    // ==========================================

    const handleCheckout = async () => {

        // Clear previous error
        setErrorMessage("");


        // Validate form
        const validationError = validateForm();


        if (validationError) {

            setErrorMessage(validationError);

            alert(validationError);

            return;

        }


        // Check cart
        if (

            !cart ||

            !cart.cartItems ||

            cart.cartItems.length === 0

        ) {

            const message =
                "Your cart is empty.";


            setErrorMessage(message);

            alert(message);

            return;

        }


        setLoading(true);


        try {

            console.log(
                "========== STARTING CHECKOUT =========="
            );


            // Call backend checkout API
            const response =
                await checkout(formData);


            console.log(
                "Checkout successful:",
                response
            );


            alert(
                "Checkout successful! Proceeding to payment."
            );


            // Navigate to payment page
            navigate(

                "/payment",

                {

                    state: {

                        total: response.total,

                        items: response.items

                    }

                }

            );


        } catch (error) {

            console.error(
                "Checkout error:",
                error
            );


            let message =
                "Checkout failed. Please try again.";


            if (error.response?.data) {

                if (

                    typeof error.response.data === "string"

                ) {

                    message =
                        error.response.data;

                }

                else if (

                    error.response.data.message

                ) {

                    message =
                        error.response.data.message;

                }

            }


            setErrorMessage(message);

            alert(message);


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container mt-4">


            {/* ======================================
                ERROR MESSAGE
            ====================================== */}

            {errorMessage && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >

                    {errorMessage}

                </div>

            )}


            <div className="row g-4">


                {/* ==================================
                    LEFT SIDE
                    CHECKOUT FORM
                ================================== */}

                <div className="col-md-8">

                    <CheckoutForm

                        formData={formData}

                        handleChange={handleChange}

                    />

                </div>


                {/* ==================================
                    RIGHT SIDE
                    ORDER SUMMARY
                ================================== */}

                <div className="col-md-4">


                    {cartLoading ? (

                        <div className="card shadow-sm p-4">

                            <div className="text-center">

                                <div
                                    className="spinner-border text-success"
                                    role="status"
                                />

                                <p className="mt-3 mb-0">

                                    Loading latest cart...

                                </p>

                            </div>

                        </div>

                    ) : (

                        <OrderSummary

                            cart={cart}

                            onCheckout={handleCheckout}

                            loading={loading}

                        />

                    )}


                </div>


            </div>


        </div>

    );

}


export default Checkout;