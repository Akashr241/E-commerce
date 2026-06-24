import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>

          <p className="card-text text-muted">
            {product.description}
          </p>

          <p className="fw-bold">₹ {product.price}</p>

          <p className="text-secondary">Stock: {product.stock}</p>

          <Link to={`/products/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;