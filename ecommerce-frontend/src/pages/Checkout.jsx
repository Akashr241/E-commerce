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
// CHECKOUT STATE
// ==========================================

const [loading, setLoading] = useState(false);

const [errorMessage, setErrorMessage] = useState("");


// ==========================================
// LOAD LATEST CART FROM BACKEND
// ==========================================

const loadCart = async () => {

    try {

        console.log(
            "========== CHECKOUT LOADING LATEST CART =========="
        );

        setCartLoading(true);

        setErrorMessage("");


        // Get the latest cart directly from backend
        const response = await myCart();


        console.log(
            "Latest checkout cart:",
            JSON.stringify(response, null, 2)
        );


        // Update Checkout state
        setCart(response);


    } catch (error) {

        console.error(
            "Checkout cart loading error:",
            error
        );


        setErrorMessage(
            "Unable to load your cart."
        );


    } finally {

        // Always stop loading
        setCartLoading(false);

    }

};


// ==========================================
// LOAD CART WHEN CHECKOUT PAGE OPENS
// ==========================================

useEffect(() => {

    loadCart();

}, []);


// ==========================================
// HANDLE FORM INPUT
// ==========================================

const handleChange = (e) => {

    const {

        name,
        value

    } = e.target;


    setFormData((previousData) => ({

        ...previousData,

        [name]: value

    }));


    // Clear previous errors
    setErrorMessage("");

};


// ==========================================
// GET CART ITEMS SAFELY
// ==========================================

const cartItems = cart?.cartItems || [];


// ==========================================
// CALCULATE TOTAL PRODUCTS
// ==========================================



// ==========================================
// CALCULATE TOTAL AMOUNT
// ==========================================

const calculatedTotal = cartItems.reduce(

    (sum, item) => {

        const itemTotal = Number(

            item.subTotal ??

            item.subtotal ??

            (
                Number(item.price || 0) *
                Number(item.quantity || 0)
            )

        );


        return sum + itemTotal;

    },

    0

);


// ==========================================
// USE BACKEND TOTAL WHEN AVAILABLE
// ==========================================

const totalAmount = Number(

    cart?.total ?? calculatedTotal

);


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


    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {

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


    if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {

        return "Please enter a valid 6-digit pincode.";

    }


    return null;

};


// ==========================================
// HANDLE CHECKOUT
// ==========================================

const handleCheckout = async () => {

    console.log(
        "========== STARTING CHECKOUT =========="
    );


    // Clear previous error
    setErrorMessage("");


    // --------------------------------------
    // 1. CHECK FORM VALIDATION
    // --------------------------------------

    const validationError = validateForm();


    if (validationError) {

        setErrorMessage(validationError);

        alert(validationError);

        return;

    }


    // --------------------------------------
    // 2. CHECK CART
    // --------------------------------------

    if (cartItems.length === 0) {

        const message =
            "Your cart is empty.";


        setErrorMessage(message);

        alert(message);

        return;

    }


    // --------------------------------------
    // 3. START CHECKOUT LOADING
    // --------------------------------------

    setLoading(true);


    try {

        console.log(
            "Checkout cart items:",
            cartItems
        );


        console.log(
            "Checkout total:",
            totalAmount
        );


        // ----------------------------------
        // 4. CALL BACKEND CHECKOUT API
        // ----------------------------------

        const response =
            await checkout(formData);


        console.log(
            "========== CHECKOUT SUCCESS =========="
        );


        console.log(
            "Checkout response:",
            response
        );


        // ----------------------------------
        // 5. NAVIGATE TO PAYMENT
        // ----------------------------------

        navigate(

            "/payment",

            {

                state: {

                    // Use backend response
                    total:

                        response?.total ??

                        totalAmount,


                    items:

                        response?.items ??

                        cartItems,


                    // Optional order information
                    orderId:

                        response?.orderId ??

                        response?.id ??

                        null

                }

            }

        );


    } catch (error) {

        console.error(
            "========== CHECKOUT FAILED =========="
        );


        console.error(
            "Checkout error:",
            error
        );


        let message =
            "Checkout failed. Please try again.";


        // ----------------------------------
        // HANDLE BACKEND ERROR
        // ----------------------------------

        if (error.response?.data) {

            if (

                typeof error.response.data ===
                "string"

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
            PAGE TITLE
        ====================================== */}

        <h2 className="mb-4">

            Checkout

        </h2>


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
                                className="
                                    spinner-border
                                    text-success
                                "
                                role="status"
                            />

                            <p className="mt-3 mb-0">

                                Loading latest cart...

                            </p>

                        </div>

                    </div>


                ) : cartItems.length === 0 ? (

                    <div className="card shadow-sm p-4">

                        <h5>

                            Your cart is empty.

                        </h5>

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
