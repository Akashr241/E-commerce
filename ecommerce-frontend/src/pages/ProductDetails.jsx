import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading product...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h3 className="text-danger">{error}</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2>{product.name}</h2>

        <hr />

        <h5>Description</h5>

        <p>{product.description}</p>

        <h4 className="text-success">
          ₹ {product.price}
        </h4>

        <p>
          <strong>Stock :</strong> {product.stock}
        </p>

        <button className="btn btn-primary">
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;