import React from "react";
import{ BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminProducts from "./pages/AdminProducts";

import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

<Route path="/payment" element={<Payment />} />

<Route
    path="/payment-success"
    element={<PaymentSuccess />}
/>

<Route
    path="/payment-failure"
    element={<PaymentFailure />}
/>

<Route
    path="/orders"
    element={<Orders />}
/>


        </Routes>

      </div>
    </Router>
  );
}

export default App;