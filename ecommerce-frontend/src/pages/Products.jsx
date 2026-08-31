import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Category and sorting
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load medicines and healthcare products.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GET CATEGORIES
  // ==========================================
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter((category) => category)
    )
  ];

  // ==========================================
  // FILTER + SORT PRODUCTS
  // ==========================================
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }
      return product.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortOption === "low-high") {
        return a.price - b.price;
      }
      if (sortOption === "high-low") {
        return b.price - a.price;
      }
      return 0;
    });

  // ==========================================
  // LOADING STATE
  // ==========================================
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
          <p className="text-muted mt-3 fw-medium">Loading pharmacy catalogue...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  if (error) {
    return (
      <div className="container py-5 min-vh-100" style={{ paddingTop: "100px" }}>
        <div className="alert alert-danger rounded-4 d-flex align-items-center gap-3 p-4 shadow-sm" role="alert">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <h6 className="fw-bold mb-1">Unable to Load Catalogue</h6>
            <span className="small mb-0">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: "90px" }}>
      <div className="container">

        {/* ==========================================
            HEADER
        ========================================== */}
        <div className="mb-4">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-success-subtle text-success border border-success-subtle mb-2">
            <span className="p-1 bg-success rounded-circle"></span>
            <span className="small fw-semibold">Pharmacy Store</span>
          </div>
          <h1 className="fw-bold text-dark mb-1">Explore Medicines</h1>
          <p className="text-muted small mb-0">
            Browse verified pharmaceuticals, health essentials, and over-the-counter products.
          </p>
        </div>

        {/* ==========================================
            FILTER & SORT BAR
        ========================================== */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
          <div className="card-body p-4">
            <div className="row align-items-center g-3">
              
              {/* CATEGORY PILLS */}
              <div className="col-lg-8">
                <label className="form-label fw-bold text-dark small d-flex align-items-center gap-2 mb-2">
                  <svg width="16" height="16" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Browse by Category
                </label>
                
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`btn btn-sm rounded-pill px-3 py-1.5 fw-medium transition-all ${
                        selectedCategory === category
                          ? "btn-success shadow-sm"
                          : "btn-outline-secondary border-light-subtle bg-light text-secondary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT OPTIONS */}
              <div className="col-lg-4">
                <label
                  htmlFor="sortProducts"
                  className="form-label fw-bold text-dark small d-flex align-items-center gap-2 mb-2"
                >
                  <svg width="16" height="16" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Sort By Price
                </label>

                <div className="input-group">
                  <select
                    id="sortProducts"
                    className="form-select form-select-md rounded-3 border-light-subtle shadow-none"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="default">Default (Featured)</option>
                    <option value="low-high">Price: Low → High</option>
                    <option value="high-low">Price: High → Low</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            RESULTS METRICS & ACTIVE FILTERS
        ========================================== */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <p className="text-muted small mb-0">
            Showing <strong className="text-dark">{filteredProducts.length}</strong> available {filteredProducts.length === 1 ? "medicine" : "medicines"}
          </p>

          {selectedCategory !== "All" && (
            <div className="d-flex align-items-center gap-2">
              <span className="small text-muted">Active filter:</span>
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-pill d-inline-flex align-items-center gap-1.5 px-2.5 py-1 text-secondary"
                onClick={() => setSelectedCategory("All")}
              >
                <span>{selectedCategory}</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            PRODUCTS GRID
        ========================================== */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-4 bg-white">
            <div className="py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-light text-muted rounded-circle mb-3"
                style={{ width: "72px", height: "72px" }}
              >
                <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="fw-bold text-dark mb-1">No medicines found</h4>
              <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "340px" }}>
                We couldn't find any medications matching the category "{selectedCategory}".
              </p>
              <button
                type="button"
                className="btn btn-success rounded-pill px-4 py-2 fw-semibold"
                onClick={() => setSelectedCategory("All")}
              >
                View All Products
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;