import React, { useState } from "react";
import { createPayment,verifyPayment } from "../services/paymentService";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {

    const navigate = useNavigate();
    
    const location = useLocation();
        console.log(location.state);

    const total = location.state?.total || 0;
    console.log(total);

    const items = location.state?.items || [];
    console.log(items);

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handlePayment = async () => {

        try {

            const paymentData = {

                amount: total,

                paymentMethod: paymentMethod

            };

            const response = await createPayment(paymentData);

            console.log(response.data);
            console.log(response.data.razorpayOrderId);

            if (paymentMethod === "COD") {

                alert("Order placed successfully.");

                navigate("/payment-success");

            } else {

                // Razorpay integration will come here
                alert("Opening Razorpay...");


                

    const options = {

        key: "rzp_test_TEdwiuvXS4duTr",

    
        
        amount: response.data.amount * 100,

        currency: response.data.currency,

        name: "Akash E-Commerce",

        description: "Order Payment",

        order_id: response.data.razorpayOrderId,

        handler: async function (razorpayResponse) {

            try {

                const verifyData = {

                    razorpayOrderId: razorpayResponse.razorpay_order_id,

                    razorpayPaymentId: razorpayResponse.razorpay_payment_id,

                    razorpaySignature: razorpayResponse.razorpay_signature

                };

                await verifyPayment(verifyData);

                navigate("/payment-success");

            } catch (error) {

                console.log(error);

                navigate("/payment-failure");

            }

        },

        prefill: {

            name: "Akash",

            email: "akash@example.com",

            contact: "9876543210"

        },

        theme: {

            color: "#3399cc"

        }

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

}

            

        } catch (error) {

            console.log(error);

            alert("Payment Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2>Payment</h2>

                <hr />

                <h4>Total Amount : ₹ {total}</h4>

                <div className="mt-4">

                    <label>

                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        {" "}Cash On Delivery

                    </label>

                </div>

                <div className="mt-2">

                    <label>

                        <input
                            type="radio"
                            value="RAZORPAY"
                            checked={paymentMethod === "RAZORPAY"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />

                        {" "}UPI / Card / Net Banking

                    </label>

                </div>

                <button
                    className="btn btn-success mt-4"
                    onClick={handlePayment}
                >

                    Pay Now

                </button>

            </div>

        </div>

    );

}

export default Payment;