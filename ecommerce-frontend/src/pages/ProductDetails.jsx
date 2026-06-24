import React from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Product Details</h2>
      <p>Showing details for product ID: {id}</p>

      <div className="card p-4 mt-3">
        <h4>Sample Product Name</h4>
        <p>This is the product description.</p>
        <p><strong>Price:</strong> ₹999</p>
        <p><strong>Stock:</strong> 12</p>

        <button className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;