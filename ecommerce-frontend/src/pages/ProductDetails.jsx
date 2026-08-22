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


    /*
     * Load product from Spring Boot
     */

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


    /*
     * Add product to cart
     */

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


    /*
     * Loading
     */

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


    /*
     * Error
     */

    if (error || !product) {

        return (
            <div className="container py-5">

                <div className="alert alert-danger rounded-4">
                    {error || "Medicine not found."}
                </div>

                <button
                    className="btn btn-success rounded-pill"
                    onClick={() => navigate("/products")}
                >
                    ← Back to Medicines
                </button>

            </div>
        );

    }


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-5">


                {/* Breadcrumb */}

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


                {/* MAIN PRODUCT CARD */}

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                    <div className="row g-0">


                        {/* ========================= */}
                        {/* LEFT SIDE */}
                        {/* ========================= */}

                        <div className="col-lg-6">

                            <div className="p-4 p-lg-5 h-100">


                                {/* Product Image */}

                                <div
                                    className="
                                        bg-success-subtle
                                        rounded-4
                                        d-flex
                                        align-items-center
                                        justify-content-center
                                        mb-5
                                    "
                                    style={{
                                        minHeight: "330px"
                                    }}
                                >

                                    {product.imageUrl ? (

                                        <img
                                            src={
                                                product.imageUrl
                                            }
                                            alt={
                                                product.name
                                            }
                                            className="img-fluid"
                                            style={{
                                                maxHeight:
                                                    "280px",
                                                objectFit:
                                                    "contain"
                                            }}
                                        />

                                    ) : (

                                        <div className="text-center">

                                            <div
                                                style={{
                                                    fontSize:
                                                        "100px"
                                                }}
                                            >
                                                💊
                                            </div>

                                            <span className="badge bg-success rounded-pill px-3 py-2">
                                                MediPharm
                                            </span>

                                        </div>

                                    )}

                                </div>


                                {/* Product Description */}

                                <div>

                                    <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                                        Medicine Information
                                    </span>

                                    <h3 className="fw-bold mt-3 mb-3">
                                        About this medicine
                                    </h3>

                                    <p className="text-secondary fs-6 lh-lg">
                                        {product.description ||
                                            "No description available for this medicine."}
                                    </p>

                                </div>


                                {/* Product Information */}

                                <div className="mt-4">

                                    <h5 className="fw-bold mb-3">
                                        Product Details
                                    </h5>


                                    <div className="row g-3">

                                        <div className="col-sm-6">

                                            <div className="bg-light rounded-3 p-3">

                                                <small className="text-muted d-block">
                                                    Category
                                                </small>

                                                <strong>
                                                    {product.category ||
                                                        "Healthcare"}
                                                </strong>

                                            </div>

                                        </div>


                                        <div className="col-sm-6">

                                            <div className="bg-light rounded-3 p-3">

                                                <small className="text-muted d-block">
                                                    Medicine
                                                </small>

                                                <strong>
                                                    {product.name}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Dosage / Duration */}

                                <div className="mt-4">

                                    <h5 className="fw-bold mb-3">
                                        💊 Usage Information
                                    </h5>

                                    <div className="alert alert-success border-0 rounded-4">

                                        <p className="mb-2">
                                            <strong>
                                                Dosage:
                                            </strong>{" "}
                                            Follow the dosage
                                            prescribed by your
                                            doctor.
                                        </p>

                                        <p className="mb-2">
                                            <strong>
                                                Duration:
                                            </strong>{" "}
                                            Follow the prescribed
                                            treatment duration.
                                        </p>

                                        <p className="mb-0 small text-muted">
                                            Do not change the dosage
                                            or duration without
                                            consulting a healthcare
                                            professional.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ========================= */}
                        {/* RIGHT SIDE */}
                        {/* ========================= */}

                        <div className="col-lg-6">

                            <div className="p-4 p-lg-5 h-100 border-start-lg">


                                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                                    Healthcare Product
                                </span>


                                <h1 className="fw-bold display-6 mt-4">
                                    {product.name}
                                </h1>


                                <p className="text-muted fs-5">
                                    {product.category ||
                                        "Quality healthcare medicine"}
                                </p>


                                <hr className="my-4" />


                                {/* Price */}

                                <div>

                                    <span className="text-muted">
                                        Price
                                    </span>

                                    <div className="display-5 fw-bold text-success mt-1">

                                        ₹
                                        {product.price}

                                    </div>

                                </div>


                                {/* Quality */}

                                <div className="bg-success-subtle rounded-4 p-4 mt-4">

                                    <div className="d-flex gap-3">

                                        <div className="fs-4">
                                            ✓
                                        </div>

                                        <div>

                                            <strong>
                                                Quality healthcare
                                            </strong>

                                            <p className="mb-0 text-muted mt-1">
                                                Shop medicines
                                                conveniently through
                                                MediPharm.
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Quantity */}

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
                                                            e.target
                                                                .value
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


                                {/* Cart message */}

                                {message && (

                                    <div className="alert alert-success border-0 rounded-4 mt-4">

                                        ✓ {message}

                                    </div>

                                )}


                                {/* ADD TO CART */}

                                <button
                                    className="
                                        btn
                                        btn-success
                                        btn-lg
                                        rounded-pill
                                        w-100
                                        mt-4
                                    "
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

                                        <>
                                            🛒 Add to Cart
                                        </>

                                    )}

                                </button>


                                {/* REMINDER */}

                                <button
                                    className="
                                        btn
                                        btn-outline-success
                                        btn-lg
                                        rounded-pill
                                        w-100
                                        mt-3
                                    "
                                    onClick={() =>
                                        navigate(
                                            `/reminder/${product.id}`
                                        )
                                    }
                                >

                                    ⏰ Set Medicine Reminder

                                </button>


                                {/* BACK */}

                                <button
                                    className="
                                        btn
                                        btn-link
                                        text-secondary
                                        w-100
                                        mt-3
                                    "
                                    onClick={() =>
                                        navigate("/products")
                                    }
                                >
                                    ← Back to Medicines
                                </button>


                                {/* SAFETY */}

                                <div className="mt-5 pt-4 border-top">

                                    <div className="d-flex gap-3 mb-3">

                                        <span>🔒</span>

                                        <div>
                                            <strong>
                                                Secure ordering
                                            </strong>

                                            <small className="d-block text-muted">
                                                Your order information
                                                is securely handled.
                                            </small>
                                        </div>

                                    </div>


                                    <div className="d-flex gap-3">

                                        <span>👨‍⚕️</span>

                                        <div>
                                            <strong>
                                                Prescription guidance
                                            </strong>

                                            <small className="d-block text-muted">
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

        </div>

    );
};

export default ProductDetails;