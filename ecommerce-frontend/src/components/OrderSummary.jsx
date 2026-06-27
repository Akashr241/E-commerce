import React from "react";

const OrderSummary = ({ cartItems }) => {

  const total = cartItems.reduce(
    (sum, item) => sum + item.subTotal,
    0
  );

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-4">Order Summary</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <div>
                <h6>{item.productName}</h6>
                <small>Quantity : {item.quantity}</small>
              </div>

              <strong>₹ {item.subTotal}</strong>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>₹ {total}</h5>
          </div>

          <button className="btn btn-success w-100 mt-3">
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;