import React, { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useNavigate,useParams } from "react-router-dom";
import { addToCart } from "../services/cartService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        setError("Unable to load product");
    } finally {
        setLoading(false);
    }
};



const handleAddToCart = async () => {

    try {

        await addToCart(product.id);

        alert("Product added to cart successfully!");

        navigate("/cart");

    } catch (error) {

        console.error(error);

        alert("Failed to add product to cart.");

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

        <button className="btn btn-primary"
         onClick={handleAddToCart}>
         Add To Cart
        </button>

            <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/products")}
    >
        ← Back to Products
    </button>


      </div>

    </div>
  );
}

export default ProductDetails;