import React, { useEffect, useState } from "react";
import "./AdminProducts.css";

import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../../services/adminProductService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: ""
  });

  // ===============================
  // LOAD PRODUCTS
  // ===============================
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      if (error.response) {
        console.error("Backend:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ===============================
  // ADD / UPDATE PRODUCT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        alert("Product updated successfully");
      } else {
        await addProduct(productData);
        alert("Product added successfully");
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.error("Product operation failed:", error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Backend:", error.response.data);
      }
    }
  };

  // ===============================
  // EDIT PRODUCT
  // ===============================
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // ===============================
  // DELETE PRODUCT
  // ===============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      loadProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "",
      price: "",
      description: "",
      stock: ""
    });
  };

  // Stock Analytics Helpers
  const inStockCount = products.filter((p) => Number(p.stock) > 0).length;
  const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;

  return (
    <div className="admin-products-page">
      <div className="admin-container">
        
        {/* =================================
            PAGE HEADER & METRICS
        ================================= */}
        <div className="admin-page-header">
          <div>
            <div className="admin-breadcrumb-tag">
              <span className="dot"></span>
              Admin Dashboard / Inventory
            </div>
            <h1 className="admin-page-title">Product Management</h1>
            <p className="admin-page-subtitle">
              Add new medicines, maintain stock levels, and control catalog pricing.
            </p>
          </div>

          <div className="admin-stats-strip">
            <div className="stat-card">
              <span className="stat-label">Total SKUs</span>
              <strong className="stat-value">{products.length}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">In Stock</span>
              <strong className="stat-value text-success">{inStockCount}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Out of Stock</span>
              <strong className="stat-value text-danger">{outOfStockCount}</strong>
            </div>
          </div>
        </div>

        {/* =================================
            ADD / EDIT PRODUCT FORM
        ================================= */}
        <div className="product-form-card">
          <div className="form-card-header">
            <div className={`form-icon-pill ${editingId ? "edit-mode" : "add-mode"}`}>
              {editingId ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>

            <div>
              <h2 className="form-title">
                {editingId ? "Update Medicine Record" : "Add New Medicine"}
              </h2>
              <p className="form-subtitle">
                {editingId
                  ? `Editing Product ID: #${editingId}. Click update to save changes.`
                  : "Fill in the details to register a new pharmaceutical product in the store."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="product-form-grid">
              
              {/* Product Name */}
              <div className="form-group product-name-field">
                <label className="form-label">
                  Medicine Name <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <svg className="field-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Paracetamol 500mg"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">
                  Category <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <svg className="field-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Cold & Cough">Cold & Cough</option>
                    <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                    <option value="Digestive Health">Digestive Health</option>
                    <option value="Allergy">Allergy</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Diabetes Care">Diabetes Care</option>
                    <option value="First Aid">First Aid</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className="form-group">
                <label className="form-label">
                  Unit Price (INR) <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="field-currency">₹</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    step="0.01"
                    min="1"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="form-group">
                <label className="form-label">
                  Stock Units <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <svg className="field-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <input
                    type="number"
                    name="stock"
                    placeholder="e.g., 100"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group description-field">
                <label className="form-label">
                  Description & Usage <span className="req">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Provide therapeutic indications, dosage guidelines, or manufacturer notes..."
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* FORM ACTIONS */}
            <div className="form-actions">
              <button type="submit" className="primary-admin-btn">
                {editingId ? (
                  <>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Update Product</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add to Inventory</span>
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-admin-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* =================================
            PRODUCTS TABLE CARD
        ================================= */}
        <div className="products-table-card">
          <div className="table-header">
            <div>
              <h2 className="table-title">Current Inventory</h2>
              <p className="table-subtitle">Live view of all medicines registered in the database.</p>
            </div>

            <button className="refresh-btn" onClick={loadProducts} title="Reload records">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="admin-loading">
              <div className="loading-spinner"></div>
              <p>Fetching inventory catalogue...</p>
            </div>
          ) : products.length === 0 ? (
            /* Empty */
            <div className="admin-empty">
              <div className="empty-icon-box">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3>No products registered yet</h3>
              <p>Add your first medicine using the creation form above.</p>
            </div>
          ) : (
            /* Table */
            <div className="admin-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>MEDICINE</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>STATUS</th>
                    <th className="text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      {/* ID */}
                      <td>
                        <span className="product-id">#{product.id}</span>
                      </td>

                      {/* Product */}
                      <td>
                        <div className="product-info">
                          <div className="product-avatar">
                            {product.name?.charAt(0)?.toUpperCase() || "M"}
                          </div>
                          <div>
                            <strong className="product-name-text">{product.name}</strong>
                            <small className="product-desc-text">
                              {product.description
                                ? product.description.substring(0, 45) + (product.description.length > 45 ? "..." : "")
                                : "No description"}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="category-badge">
                          {product.category || "General"}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="product-price">
                          ₹{Number(product.price || 0).toFixed(2)}
                        </span>
                      </td>

                      {/* Stock */}
                      <td>
                        <span
                          className={`stock-pill ${
                            product.stock > 15
                              ? "stock-good"
                              : product.stock > 0
                              ? "stock-low"
                              : "stock-out"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        {product.stock > 0 ? (
                          <span className="status-badge available">
                            <span className="status-dot"></span> Available
                          </span>
                        ) : (
                          <span className="status-badge unavailable">
                            <span className="status-dot"></span> Out of stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="text-end">
                        <div className="table-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                          >
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit</span>
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(product.id)}
                            title="Delete product"
                          >
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminProducts;