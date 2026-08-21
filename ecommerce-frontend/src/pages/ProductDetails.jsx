import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const response = await api.get(`/products/${id}`);

                setProduct(response.data);

            } catch (error) {

                console.error(
                    "Error fetching product:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadProduct();

    }, [id]);


    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                />

                <p className="text-muted mt-3">
                    Loading medicine...
                </p>

            </div>
        );
    }


    if (!product) {

        return (
            <div className="container py-5 text-center">

                <div className="display-3">
                    💊
                </div>

                <h3 className="fw-bold mt-3">
                    Medicine not found
                </h3>

                <Link
                    to="/products"
                    className="btn btn-success mt-3"
                >
                    Browse Medicines
                </Link>

            </div>
        );
    }


    return (
        <div className="bg-light min-vh-100">

            <div className="container py-5">


                {/* BREADCRUMB */}

                <nav className="mb-4">

                    <Link
                        to="/products"
                        className="text-success text-decoration-none"
                    >
                        Medicines
                    </Link>

                    <span className="text-muted mx-2">
                        /
                    </span>

                    <span className="text-muted">
                        {product.name}
                    </span>

                </nav>


                {/* MAIN PRODUCT */}

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                    <div className="row g-0">


                        {/* IMAGE */}

                        <div className="col-lg-5">

                            <div
                                className="
                                    bg-success-subtle
                                    h-100
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                "
                                style={{ minHeight: "450px" }}
                            >

                                <div className="text-center">

                                    <div className="display-1 mb-3">
                                        💊
                                    </div>

                                    <span className="badge bg-success rounded-pill px-3 py-2">
                                        MediPharm
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* DETAILS */}

                        <div className="col-lg-7">

                            <div className="p-4 p-lg-5">

                                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 mb-3">
                                    Healthcare Product
                                </span>

                                <h1 className="fw-bold mb-3">
                                    {product.name}
                                </h1>

                                <p className="text-muted fs-5">
                                    {product.description ||
                                        "Reliable healthcare product available through MediPharm."}
                                </p>


                                <hr className="my-4" />


                                <div className="mb-4">

                                    <small className="text-muted">
                                        Price
                                    </small>

                                    <div className="display-6 fw-bold text-success">
                                        ₹{product.price}
                                    </div>

                                </div>


                                <div className="alert alert-success border-0 rounded-4">

                                    <strong>
                                        ✓ Quality healthcare
                                    </strong>

                                    <br />

                                    <small>
                                        Shop medicines conveniently
                                        through MediPharm.
                                    </small>

                                </div>


                                <div className="d-flex gap-3 mt-4">

                                    <button
                                        className="btn btn-success btn-lg rounded-pill px-4"
                                    >
                                        🛒 Add to Cart
                                    </button>

                                    <Link
                                        to="/products"
                                        className="btn btn-outline-secondary btn-lg rounded-pill px-4"
                                    >
                                        Back
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* INFORMATION */}

                <div className="row g-4 mt-4">

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="fs-2 mb-3">
                                    🛡️
                                </div>

                                <h5 className="fw-bold">
                                    Trusted Healthcare
                                </h5>

                                <p className="text-muted mb-0">
                                    Quality products for your
                                    healthcare needs.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="fs-2 mb-3">
                                    🚚
                                </div>

                                <h5 className="fw-bold">
                                    Easy Ordering
                                </h5>

                                <p className="text-muted mb-0">
                                    Add medicines to your cart
                                    and order easily.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="fs-2 mb-3">
                                    🤖
                                </div>

                                <h5 className="fw-bold">
                                    MediAI Support
                                </h5>

                                <p className="text-muted mb-0">
                                    Ask our AI assistant about
                                    medicines and prescriptions.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;