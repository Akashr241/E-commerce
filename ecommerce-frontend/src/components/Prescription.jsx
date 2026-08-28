import React, { useState } from "react";
import { uploadPrescription } from "../services/prescriptionService";

function PrescriptionAI() {

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setError("");
        setResult(null);

        // Image preview
        const imageUrl = URL.createObjectURL(selectedFile);

        setPreview(imageUrl);
    };

    const handleUpload = async () => {

        if (!file) {

            setError("Please select a prescription image first.");

            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {

            console.log("Uploading prescription...");

            const response = await uploadPrescription(file);

            console.log("Prescription AI response:", response);

            setResult(response);

        } catch (error) {

            console.log("Prescription upload error:", error);

            if (error.response?.data?.message) {

                setError(error.response.data.message);

            } else {

                setError(
                    "Unable to analyze prescription. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-5">

            {/* HEADER */}

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Prescription AI
                </h1>

                <p className="text-muted fs-5">
                    Upload your prescription and let MediAI
                    understand your medicines.
                </p>

            </div>


            {/* UPLOAD CARD */}

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-5 text-center">

                            <div className="fs-1 mb-3">
                                📄
                            </div>

                            <h4 className="fw-bold">
                                Upload Prescription
                            </h4>

                            <p className="text-muted">
                                Upload a prescription image and our
                                AI will extract the medicine information.
                            </p>


                            {/* FILE INPUT */}

                            <input
                                type="file"
                                className="form-control mt-4"
                                accept="image/*"
                                onChange={handleFileChange}
                            />


                            {/* PREVIEW */}

                            {preview && (

                                <div className="mt-4">

                                    <p className="fw-semibold">
                                        Selected Prescription
                                    </p>

                                    <img
                                        src={preview}
                                        alt="Prescription preview"
                                        className="img-fluid rounded-4 shadow-sm"
                                        style={{
                                            maxHeight: "400px"
                                        }}
                                    />

                                </div>

                            )}


                            {/* ERROR */}

                            {error && (

                                <div className="alert alert-danger mt-4">
                                    {error}
                                </div>

                            )}


                            {/* BUTTON */}

                            <button
                                className="btn btn-success btn-lg rounded-pill w-100 mt-4"
                                onClick={handleUpload}
                                disabled={loading || !file}
                            >

                                {loading
                                    ? "🤖 MediAI is analyzing..."
                                    : "🔍 Analyze Prescription"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* RESULT */}

            {result && (

                <div className="row justify-content-center mt-5">

                    <div className="col-md-9">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4">

                                <h3 className="fw-bold mb-4">
                                    🤖 MediAI Results
                                </h3>

                                <pre
                                    className="bg-light p-4 rounded-4"
                                    style={{
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {typeof result === "string"
                                        ? result
                                        : JSON.stringify(result, null, 2)
                                    }
                                </pre>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default PrescriptionAI;