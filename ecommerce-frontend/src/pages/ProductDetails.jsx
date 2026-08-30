import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [cartLoading, setCartLoading] = useState(false);

    const [message, setMessage] = useState("");


    // ==========================================
    // LOAD PRODUCT
    // ==========================================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get(`/products/${id}`);

                console.log(
                    "Product response:",
                    response.data
                );

                setProduct(response.data);

            } catch (error) {

                console.error(
                    "Error fetching product:",
                    error
                );

                setError(
                    "Unable to load medicine details."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = async () => {

        try {

            setCartLoading(true);

            setMessage("");

            await api.post(
                "/cart/add-product",
                {
                    productId: product.id,
                    quantity: quantity
                }
            );

            setMessage(
                "Medicine added to your cart successfully."
            );

        } catch (error) {

            console.error(
                "Add to cart error:",
                error
            );

            setMessage(
                "Unable to add medicine to cart."
            );

        } finally {

            setCartLoading(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    />

                    <p className="mt-3 text-muted">
                        Loading medicine details...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !product) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger rounded-4">
                    {error || "Medicine not found."}
                </div>

                <button
                    className="btn btn-success rounded-pill"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Back to Medicines
                </button>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-5">


                {/* =================================
                    BREADCRUMB
                ================================= */}

                <div className="mb-4">

                    <button
                        className="btn btn-link text-success p-0 text-decoration-none"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Medicines
                    </button>

                    <span className="mx-2 text-muted">
                        /
                    </span>

                    <span className="text-muted">
                        {product.name}
                    </span>

                </div>


                {/* =================================
                    MAIN CARD
                ================================= */}

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="row g-0">


                        {/* =================================
                            LEFT SIDE
                        ================================= */}

                        <div className="col-lg-7">

                            <div className="p-4 p-lg-5">


                                {/* PRODUCT IMAGE */}

                                {product.imageUrl && (

                                    <div className="bg-white border rounded-4 p-4 mb-4 text-center">

                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="img-fluid"
                                            style={{
                                                maxHeight: "260px",
                                                objectFit: "contain"
                                            }}
                                        />

                                    </div>

                                )}


                                {/* MEDICINE INFORMATION */}

                                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

                                    Medicine Information

                                </span>


                                <h2 className="fw-bold mt-3 mb-3">

                                    About this medicine

                                </h2>


                                <p className="text-secondary lh-lg mb-4">

                                    {product.description ||
                                        "No description available for this medicine."}

                                </p>


                                {/* =================================
                                    PRODUCT DETAILS
                                ================================= */}

                                <h5 className="fw-bold mb-3">

                                    Product Details

                                </h5>


                                <div className="row g-3 mb-4">


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3">

                                            <small className="text-muted d-block mb-1">
                                                Medicine
                                            </small>

                                            <strong>
                                                {product.name}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="bg-light rounded-3 p-3">

                                            <small className="text-muted d-block mb-1">
                                                Category
                                            </small>

                                            <strong>
                                                {product.category ||
                                                    "Healthcare"}
                                            </strong>

                                        </div>

                                    </div>


                                </div>


                                {/* =================================
                                    USAGE INFORMATION
                                ================================= */}

                                <h5 className="fw-bold mb-3">

                                    Usage Information

                                </h5>


                                <div className="bg-success-subtle rounded-4 p-4">

                                    <div className="mb-3">

                                        <small className="text-muted d-block">
                                            Dosage
                                        </small>

                                        <strong>
                                            Follow the dosage
                                            prescribed by your doctor.
                                        </strong>

                                    </div>


                                    <div className="mb-3">

                                        <small className="text-muted d-block">
                                            Duration
                                        </small>

                                        <strong>
                                            Follow the prescribed
                                            treatment duration.
                                        </strong>

                                    </div>


                                    <p className="small text-muted mb-0">

                                        Do not change the dosage or
                                        treatment duration without
                                        consulting a healthcare
                                        professional.

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            RIGHT SIDE
                        ================================= */}

                        <div className="col-lg-5 border-start">

                            <div className="p-4 p-lg-5">


                                {/* CATEGORY */}

                                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

                                    Healthcare Product

                                </span>


                                {/* PRODUCT NAME */}

                                <h1 className="fw-bold mt-4 mb-2">

                                    {product.name}

                                </h1>


                                <p className="text-muted mb-4">

                                    {product.category ||
                                        "Quality healthcare medicine"}

                                </p>


                                <hr />


                                {/* PRICE */}

                                <div className="mt-4">

                                    <small className="text-muted">
                                        Price
                                    </small>

                                    <div className="display-5 fw-bold text-success">

                                        ₹{product.price}

                                    </div>

                                </div>


                                {/* QUALITY INFORMATION */}

                                <div className="bg-light border rounded-4 p-4 mt-4">

                                    <strong>
                                        Quality healthcare
                                    </strong>

                                    <p className="text-muted small mb-0 mt-2">

                                        Shop medicines conveniently
                                        through MediPharm.

                                    </p>

                                </div>


                                {/* =================================
                                    QUANTITY
                                ================================= */}

                                <div className="mt-4">

                                    <label className="form-label fw-semibold">

                                        Quantity

                                    </label>


                                    <div className="input-group">


                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(
                                                        1,
                                                        quantity - 1
                                                    )
                                                )
                                            }
                                        >
                                            −
                                        </button>


                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantity}
                                            min="1"
                                            onChange={(e) =>
                                                setQuantity(
                                                    Math.max(
                                                        1,
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                )
                                            }
                                        />


                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setQuantity(
                                                    quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>


                                    </div>

                                </div>


                                {/* MESSAGE */}

                                {message && (

                                    <div className="alert alert-success border-0 rounded-4 mt-4">

                                        {message}

                                    </div>

                                )}


                                {/* =================================
                                    ADD TO CART
                                ================================= */}

                                <button
                                    className="btn btn-success btn-lg rounded-pill w-100 mt-4 fw-semibold"
                                    onClick={
                                        handleAddToCart
                                    }
                                    disabled={cartLoading}
                                >

                                    {cartLoading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            />

                                            Adding...

                                        </>

                                    ) : (

                                        "Add to Cart"

                                    )}

                                </button>


                                {/* =================================
                                    REMINDER
                                ================================= */}

                                <button
                                    className="btn btn-outline-success btn-lg rounded-pill w-100 mt-3 fw-semibold"
                                    onClick={() =>
                                        navigate(
                                            `/reminder/${product.id}`
                                        )
                                    }
                                >

                                    Set Medicine Reminder

                                </button>


                                {/* =================================
                                    BACK
                                ================================= */}

                                <button
                                    className="btn btn-link text-secondary w-100 mt-3"
                                    onClick={() =>
                                        navigate("/products")
                                    }
                                >

                                    Back to Medicines

                                </button>


                                {/* =================================
                                    SAFETY
                                ================================= */}

                                <div className="border-top mt-5 pt-4">


                                    <div className="mb-4">

                                        <strong>
                                            Secure ordering
                                        </strong>

                                        <small className="d-block text-muted mt-1">

                                            Your order information
                                            is securely handled.

                                        </small>

                                    </div>


                                    <div>

                                        <strong>
                                            Prescription guidance
                                        </strong>

                                        <small className="d-block text-muted mt-1">

                                            Always follow your
                                            doctor's prescription.

                                        </small>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ProductDetails;