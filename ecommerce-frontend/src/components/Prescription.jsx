import React from "react";

const Prescription = () => {

    return (
        <div className="container py-5">

            <div className="text-center">

                <h1 className="fw-bold text-success">
                    Prescription AI
                </h1>

                <p className="text-muted">
                    Upload your prescription and let MediAI
                    understand your medicines.
                </p>

                <div className="card border-0 shadow-sm rounded-4 mt-4">

                    <div className="card-body p-5">

                        <div className="display-4 mb-3">
                            📄
                        </div>

                        <h4 className="fw-bold">
                            Upload Prescription
                        </h4>

                        <p className="text-muted">
                            Upload a prescription image and our AI
                            will extract the medicine information.
                        </p>

                        <button className="btn btn-success px-4">
                            Upload Prescription
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Prescription;