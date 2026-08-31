import React, { useEffect, useState } from "react";
import { myCart, removeFromCart } from "../services/cartService";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

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
    setRemovingId(id);
    try {
      await removeFromCart(id);
      await loadCart();
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  /*
   * Loading State
   */
  if (loading) {
    return (
      <div 
        className="min-vh-100 bg-light d-flex justify-content-center align-items-center"
        style={{ paddingTop: "90px" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          />
          <p className="text-muted mt-3 fw-medium">Loading your shopping cart...</p>
        </div>
      </div>
    );
  }

  /*
   * Empty Cart State
   */
  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: "90px" }}>
        <div className="container py-5">
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center mx-auto" style={{ maxWidth: "520px" }}>
            <div className="py-3">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="fw-bold text-dark mb-2">Your Cart is Empty</h3>
              <p className="text-muted small mb-4">
                Looks like you haven't added any prescription medicines or healthcare essentials yet.
              </p>
              <button
                className="btn btn-success btn-lg rounded-pill px-4 fw-bold shadow-sm d-inline-flex align-items-center justify-content-center gap-2 w-100"
                onClick={() => navigate("/products")}
              >
                <span>Browse Medicines</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: "90px" }}>
      <div className="container">
        
        {/* Navigation & Header */}
        <div className="mb-4">
          <Link
            to="/products"
            className="text-success text-decoration-none fw-semibold d-inline-flex align-items-center gap-2 mb-3"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
              <h1 className="fw-bold text-dark mb-1">Your Shopping Cart</h1>
              <p className="text-muted small mb-0">
                Review your selected medications before proceeding to checkout.
              </p>
            </div>
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold">
              {cart.cartItems.length} {cart.cartItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="row g-4 align-items-start">
          
          {/* LEFT: Cart Items List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm rounded-4 overflow-hidden hover-shadow transition-all"
                >
                  <div className="card-body p-4">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                      
                      {/* Product Details */}
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "52px", height: "52px" }}
                        >
                          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark mb-1">{item.productName}</h5>
                          <span className="small text-muted">
                            Unit Price: <span className="fw-semibold text-dark">₹{item.price}</span>
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Subtotal */}
                      <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 pt-2 pt-sm-0 border-top border-sm-0">
                        <div className="text-sm-center">
                          <span className="small text-muted d-block">Quantity</span>
                          <span className="badge bg-light text-dark border px-3 py-1.5 fw-bold">
                            × {item.quantity}
                          </span>
                        </div>

                        <div className="text-end" style={{ minWidth: "90px" }}>
                          <span className="small text-muted d-block">Subtotal</span>
                          <span className="fw-bold text-success fs-5">
                            ₹{item.subTotal || item.price * item.quantity}
                          </span>
                        </div>

                        {/* Remove Item Button */}
                        <button
                          className="btn btn-outline-danger btn-sm p-2 rounded-3"
                          onClick={() => handleRemove(item.id)}
                          disabled={removingId === item.id}
                          title="Remove item"
                        >
                          {removingId === item.id ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                          ) : (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary Card */}
          <div className="col-lg-4">
            <div 
              className="card border-0 shadow-sm rounded-4 p-4 sticky-top bg-white"
              style={{ top: "6.5rem", zIndex: 10 }}
            >
              <h5 className="fw-bold text-dark border-bottom pb-3 mb-3 d-flex align-items-center gap-2">
                <svg width="20" height="20" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Order Summary
              </h5>

              <div className="d-flex flex-column gap-2 mb-4">
                <div className="d-flex justify-content-between text-muted small">
                  <span>Items Subtotal</span>
                  <span className="fw-semibold text-dark">₹{cart.total}</span>
                </div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Delivery Charges</span>
                  <span className="text-success fw-semibold">FREE</span>
                </div>
                <div className="d-flex justify-content-between text-muted small">
                  <span>Taxes & Fees</span>
                  <span className="text-muted">Calculated at checkout</span>
                </div>

                <div className="border-top pt-3 mt-2 d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark fs-6">Grand Total</span>
                  <span className="fw-bold text-success fs-4">₹{cart.total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-success btn-lg rounded-pill w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  onClick={() => navigate("/checkout")}
                >
                  <span>Proceed to Checkout</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  className="btn btn-outline-secondary rounded-pill w-100 py-2.5 fw-semibold"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-4 pt-3 border-top text-center">
                <div className="d-inline-flex align-items-center gap-2 text-muted small">
                  <svg width="16" height="16" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span>Safe & Secure 256-bit Checkout</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;