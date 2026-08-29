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

            setProducts(data);

        } catch (error) {

            console.error("Failed to load products:", error);

            if (error.response) {
                console.error(
                    "Backend:",
                    error.response.data
                );
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
    // ADD / UPDATE
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

                await updateProduct(
                    editingId,
                    productData
                );

                alert("Product updated successfully");

            } else {

                await addProduct(productData);

                alert("Product added successfully");

            }

            resetForm();
            loadProducts();

        } catch (error) {

            console.error(
                "Product operation failed:",
                error
            );

            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend:",
                    error.response.data
                );

            }

        }

    };

    // ===============================
    // EDIT
    // ===============================

    const handleEdit = (product) => {

        setEditingId(product.id);

        setForm({
            name: product.name || "",
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
    // DELETE
    // ===============================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
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

            console.error(
                "Delete failed:",
                error
            );

        }

    };

    // ===============================
    // RESET
    // ===============================

    const resetForm = () => {

        setEditingId(null);

        setForm({
            name: "",
            price: "",
            description: "",
            stock: ""
        });

    };

    return (

        <div className="admin-products-page">

            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="admin-page-header">

                <div>
                    <p className="admin-breadcrumb">
                        Admin / Products
                    </p>

                    <h1>
                        Product Management
                    </h1>

                    <p className="admin-page-subtitle">
                        Add, update and manage medicines in your store.
                    </p>
                </div>

                <div className="product-count-badge">
                    <span>
                        {products.length}
                    </span>
                    Products
                </div>

            </div>


            {/* =================================
                ADD / EDIT PRODUCT
            ================================= */}

            <div className="product-form-card">

                <div className="form-card-header">

                    <div className="form-icon">
                        {editingId ? "✎" : "+"}
                    </div>

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Product"
                                : "Add New Product"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update the selected product details."
                                : "Add a new medicine to your inventory."}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="product-form-grid">

                        {/* PRODUCT NAME */}

                        <div className="form-group product-name-field">

                            <label>
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* PRICE */}

                        <div className="form-group">

                            <label>
                                Price
                            </label>

                            <div className="input-with-symbol">

                                <span>₹</span>

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* STOCK */}

                        <div className="form-group">

                            <label>
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                placeholder="Enter stock quantity"
                                value={form.stock}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group description-field">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Enter product description..."
                                rows="4"
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* FORM BUTTONS */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-admin-btn"
                        >

                            <span>
                                {editingId ? "✓" : "+"}
                            </span>

                            {editingId
                                ? "Update Product"
                                : "Add Product"}

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-admin-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =================================
                PRODUCTS TABLE
            ================================= */}

            <div className="products-table-card">

                <div className="table-header">

                    <div>

                        <h2>
                            All Products
                        </h2>

                        <p>
                            Manage your current medicine inventory.
                        </p>

                    </div>

                    <button
                        className="refresh-btn"
                        onClick={loadProducts}
                    >
                        ↻ Refresh
                    </button>

                </div>


                {loading ? (

                    <div className="admin-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading products...
                        </p>

                    </div>

                ) : products.length === 0 ? (

                    <div className="admin-empty">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Add your first product using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-products-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>PRODUCT</th>

                                    <th>PRICE</th>

                                    <th>STOCK</th>

                                    <th>STATUS</th>

                                    <th>ACTIONS</th>

                                </tr>

                            </thead>


                            <tbody>

                                {products.map(
                                    (product) => (

                                    <tr key={product.id}>

                                        {/* ID */}

                                        <td>

                                            <span className="product-id">
                                                #{product.id}
                                            </span>

                                        </td>


                                        {/* PRODUCT */}

                                        <td>

                                            <div className="product-info">

                                                <div className="product-avatar">
                                                    {product.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {product.name}
                                                    </strong>

                                                    <small>
                                                        {product.description
                                                            ? product.description.substring(
                                                                0,
                                                                45
                                                            )
                                                            : "No description"}
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        {/* PRICE */}

                                        <td>

                                            <span className="product-price">
                                                ₹{Number(product.price).toFixed(2)}
                                            </span>

                                        </td>


                                        {/* STOCK */}

                                        <td>

                                            <span
                                                className={
                                                    product.stock > 10
                                                        ? "stock-good"
                                                        : product.stock > 0
                                                            ? "stock-low"
                                                            : "stock-out"
                                                }
                                            >
                                                {product.stock}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            {product.stock > 0 ? (

                                                <span className="status-badge available">
                                                    ● Available
                                                </span>

                                            ) : (

                                                <span className="status-badge unavailable">
                                                    ● Out of stock
                                                </span>

                                            )}

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="table-actions">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Delete
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

    );

}

export default AdminProducts;