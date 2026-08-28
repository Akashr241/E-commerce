import React, { useState } from "react";
import { analyzePrescription } from "../services/prescriptionService";
import { addToCart } from "../services/cartService";


function Prescription() {

    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setError("");
        setSuccess("");
        setResults([]);
    };


    const handleUpload = async () => {

        if (!file) {
            setError("Please select a prescription image.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSuccess("");
            setResults([]);

            const data = await analyzePrescription(file);

            console.log("========== PRESCRIPTION AI RESULT ==========");
            console.log(data);
            console.log("============================================");

            setResults(data);

        } catch (err) {

            console.error(
                "Prescription upload error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to analyze prescription."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleAddToCart = async (productId) => {

        try {

            console.log(
                "Adding product to cart:",
                productId
            );

            await addToCart(productId, 1);

            setSuccess(
                "Medicine added to your cart successfully."
            );

        } catch (err) {

            console.error(
                "Add to cart error:",
                err
            );

            setError(
                "Unable to add medicine to cart."
            );
        }
    };


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-5">

                {/* HEADER */}

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        Prescription AI
                    </h1>

                    <p className="text-muted fs-5">
                        Upload your prescription and let
                        MediAI understand your medicines.
                    </p>

                </div>


                {/* UPLOAD CARD */}

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-7">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-5 text-center">

                                <div
                                    className="mb-4"
                                    style={{ fontSize: "55px" }}
                                >
                                    📄
                                </div>


                                <h3 className="fw-bold">
                                    Upload Prescription
                                </h3>

                                <p className="text-muted">
                                    Upload a prescription image and
                                    our AI will extract the medicine
                                    information.
                                </p>


                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control mt-4"
                                    onChange={handleFileChange}
                                />


                                {file && (

                                    <div className="mt-3 text-muted">

                                        Selected:
                                        <strong className="ms-1">
                                            {file.name}
                                        </strong>

                                    </div>

                                )}


                                <button
                                    className="btn btn-success w-100 mt-4"
                                    onClick={handleUpload}
                                    disabled={loading}
                                >

                                    {loading
                                        ? "🤖 AI Analyzing..."
                                        : "🔍 Analyze Prescription"}

                                </button>


                                {error && (

                                    <div className="alert alert-danger mt-4">
                                        {error}
                                    </div>

                                )}


                                {success && (

                                    <div className="alert alert-success mt-4">
                                        {success}
                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>


                {/* AI RESULTS */}

                {results.length > 0 && (

                    <div className="mt-5">

                        <div className="text-center mb-4">

                            <h2 className="fw-bold">
                                🤖 AI Prescription Results
                            </h2>

                            <p className="text-muted">
                                We found {results.length} medicine
                                {results.length > 1 ? "s" : ""} in your
                                prescription.
                            </p>

                        </div>


                        <div className="row g-4">

                            {results.map((medicine) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={medicine.productId}
                                >

                                    <div className="card h-100 border-0 shadow-sm rounded-4">

                                        <div className="card-body p-4">


                                            {/* AI MEDICINE */}

                                            <div className="mb-3">

                                                <span className="badge bg-success-subtle text-success">
                                                    AI Detected
                                                </span>

                                            </div>


                                            <h4 className="fw-bold">

                                                {medicine.medicineName}

                                            </h4>


                                            {/* DOSAGE */}

                                            <div className="mt-3">

                                                <p className="mb-2">

                                                    💊
                                                    <strong>
                                                        Dosage:
                                                    </strong>{" "}

                                                    {medicine.dosage || "Not specified"}

                                                </p>


                                                <p className="mb-2">

                                                    🕐
                                                    <strong>
                                                        Frequency:
                                                    </strong>{" "}

                                                    {medicine.frequency || "Not specified"}

                                                </p>


                                                <p className="mb-2">

                                                    📅
                                                    <strong>
                                                        Duration:
                                                    </strong>{" "}

                                                    {medicine.duration || "Not specified"}

                                                </p>

                                            </div>


                                            <hr />


                                            {/* DATABASE PRODUCT */}

                                            <small className="text-muted">
                                                Matched Product
                                            </small>


                                            <h5 className="fw-bold mt-1">

                                                {medicine.productName}

                                            </h5>


                                            <p className="text-muted mb-2">

                                                {medicine.manufacturerName}

                                            </p>


                                            <p className="small">

                                                {medicine.shortComposition1}

                                                {medicine.shortComposition2 && (
                                                    <>
                                                        <br />
                                                        {medicine.shortComposition2}
                                                    </>
                                                )}

                                            </p>


                                            <div className="d-flex justify-content-between align-items-center mt-3">

                                                <span className="fs-4 fw-bold">

                                                    ₹{medicine.price}

                                                </span>


                                                <button
                                                    className="btn btn-success rounded-pill px-4"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            medicine.productId
                                                        )
                                                    }
                                                >

                                                    🛒 Add to Cart

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Prescription;