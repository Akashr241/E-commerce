import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    // Temporary Data
    // Replace with Spring Boot API later

    setCartItems([
      {
        id: 1,
        productName: "Wireless Mouse",
        quantity: 2,
        subTotal: 2000,
      },
      {
        id: 2,
        productName: "Mechanical Keyboard",
        quantity: 1,
        subTotal: 3500,
      },
    ]);

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Checkout
      </h2>

      <div className="row">

        <div className="col-md-7">

          <CheckoutForm
            formData={formData}
            handleChange={handleChange}
          />

        </div>

        <div className="col-md-5">

          <OrderSummary
            cartItems={cartItems}
          />

        </div>

      </div>

    </div>

  );
};

export default Checkout;