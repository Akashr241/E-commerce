import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    return (
        <div className="home-page">

            {/* HERO */}
            <section className="hero-section">
                <div className="hero-content">

                    <div className="hero-badge">
                        ✨ AI-Powered Pharmacy
                    </div>

                    <h1>
                        Your Prescription.
                        <br />
                        <span>Understood by AI.</span>
                    </h1>

                    <p>
                        Upload your prescription and let our AI identify
                        medicines, understand instructions and help you
                        find the right medicines.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/prescription"
                            className="primary-button"
                        >
                            📷 Upload Prescription
                        </Link>

                        <Link
                            to="/products"
                            className="secondary-button"
                        >
                            Browse Medicines →
                        </Link>
                    </div>

                    <div className="hero-trust">
                        <span>✓ AI Prescription Analysis</span>
                        <span>✓ Medicine Search</span>
                        <span>✓ Easy Ordering</span>
                    </div>

                </div>

                <div className="hero-visual">
                    <div className="ai-card">

                        <div className="ai-card-header">
                            <div className="ai-icon">🤖</div>
                            <div>
                                <strong>MediAI Assistant</strong>
                                <small>AI Pharmacy Assistant</small>
                            </div>
                        </div>

                        <div className="ai-message">
                            👋 Hello! Upload your prescription and
                            I'll help you understand your medicines.
                        </div>

                        <div className="medicine-preview">
                            <div className="medicine-icon">💊</div>

                            <div>
                                <strong>Medicine detected</strong>
                                <p>Paracetamol 500mg</p>
                            </div>

                            <span className="verified">✓</span>
                        </div>

                        <div className="ai-status">
                            <span></span>
                            AI analysis ready
                        </div>

                    </div>

                    <div className="floating-pill pill-one">
                        💊
                    </div>

                    <div className="floating-pill pill-two">
                        ✨
                    </div>

                    <div className="floating-pill pill-three">
                        🩺
                    </div>
                </div>
            </section>


            {/* HOW IT WORKS */}
            <section className="how-section">

                <div className="section-heading">
                    <span>HOW IT WORKS</span>
                    <h2>From prescription to medicine in minutes</h2>
                    <p>
                        Our AI-powered system makes finding your medicines
                        simple.
                    </p>
                </div>

                <div className="steps-container">

                    <div className="step-card">
                        <div className="step-number">01</div>
                        <div className="step-icon">📷</div>
                        <h3>Upload</h3>
                        <p>
                            Upload a photo of your handwritten or
                            printed prescription.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <div className="step-icon">🤖</div>
                        <h3>AI Understands</h3>
                        <p>
                            OCR and Gemini AI analyze the prescription
                            and identify medicines.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <div className="step-icon">💊</div>
                        <h3>Find Medicines</h3>
                        <p>
                            Get medicine information and relevant
                            suggestions.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">04</div>
                        <div className="step-icon">🚚</div>
                        <h3>Order</h3>
                        <p>
                            Add medicines to your cart and complete
                            your order securely.
                        </p>
                    </div>

                </div>
            </section>


            {/* AI FEATURE */}
            <section className="ai-feature-section">

                <div className="ai-feature-content">

                    <div className="feature-label">
                        🤖 INTELLIGENT PRESCRIPTION ANALYSIS
                    </div>

                    <h2>
                        Your doctor's handwriting.
                        <br />
                        <span>Our AI's understanding.</span>
                    </h2>

                    <p>
                        No more struggling to understand a prescription.
                        MediAI uses OCR and Gemini AI to extract medicine
                        names and instructions from your prescription.
                    </p>

                    <Link
                        to="/prescription"
                        className="primary-button"
                    >
                        Try Prescription AI →
                    </Link>

                </div>

                <div className="prescription-demo">

                    <div className="paper">
                        <div className="paper-title">
                            PRESCRIPTION
                        </div>

                        <div className="fake-line">
                            Patient: __________
                        </div>

                        <div className="handwriting">
                            Paracetamol 500mg
                        </div>

                        <div className="handwriting">
                            1 tablet × 2 daily
                        </div>

                        <div className="fake-line">
                            __________________
                        </div>
                    </div>

                    <div className="ai-arrow">
                        →
                    </div>

                    <div className="ai-result">

                        <div className="result-header">
                            ✨ AI Result
                        </div>

                        <div className="result-medicine">
                            <span>💊</span>

                            <div>
                                <strong>Paracetamol 500mg</strong>
                                <small>1 tablet × 2 daily</small>
                            </div>

                            <b>✓</b>
                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="features-section">

                <div className="section-heading">
                    <span>WHY MEDIAI?</span>
                    <h2>More than an online pharmacy</h2>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div>🤖</div>
                        <h3>AI Powered</h3>
                        <p>
                            Gemini AI helps understand prescription
                            information.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div>🔍</div>
                        <h3>Smart Search</h3>
                        <p>
                            Find medicines using intelligent medicine
                            matching.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div>🔒</div>
                        <h3>Secure</h3>
                        <p>
                            Secure authentication and protected
                            transactions.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div>🚚</div>
                        <h3>Easy Ordering</h3>
                        <p>
                            Find your medicines and order them easily.
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="cta-section">

                <h2>
                    Have a prescription?
                </h2>

                <p>
                    Let MediAI understand it for you.
                </p>

                <Link
                    to="/prescription"
                    className="cta-button"
                >
                    Upload Prescription →
                </Link>

            </section>

        </div>
    );
};

export default Home;