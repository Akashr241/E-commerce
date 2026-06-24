import React from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      description: "High performance laptop",
      price: 55000,
      stock: 10,
    },
    {
      id: 2,
      name: "Phone",
      description: "Latest smartphone with great camera",
      price: 25000,
      stock: 15,
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise cancelling headphones",
      price: 3000,
      stock: 20,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Products</h2>

      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;