import React from "react";

const ChatbotPage = () => {

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <div className="display-3">
                    🤖
                </div>

                <h1 className="fw-bold text-success">
                    MediAI Assistant
                </h1>

                <p className="text-muted">
                    Your intelligent pharmacy assistant
                </p>

            </div>


            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-5 text-center">

                            <h4 className="fw-bold">
                                Ask MediAI
                            </h4>

                            <p className="text-muted">
                                Ask questions about medicines,
                                prescriptions, and pharmacy products.
                            </p>

                            <button className="btn btn-success px-4">
                                Start Chat
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChatbotPage;