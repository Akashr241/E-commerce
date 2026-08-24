import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">

          <h5 className="card-title text-success">
            {product.name}
          </h5>

          <p className="card-text text-secondary">
            {product.description}
          </p>

          <p className="fw-bold text-success">
            ₹ {product.price}
          </p>

          <p className="text-muted">
            Stock: {product.stock}
          </p>

          <Link
            to={`/products/${product.id}`}
            className="btn btn-success"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;