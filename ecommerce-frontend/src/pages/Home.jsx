import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-page bg-light overflow-hidden" style={{ paddingTop: "80px" }}>
      
      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <section className="py-5 position-relative">
        {/* Background Decorative Gradients */}
        <div 
          className="position-absolute rounded-circle opacity-25"
          style={{
            top: "-100px",
            right: "5%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none"
          }}
        />

        <div className="container py-lg-5">
          <div className="row align-items-center gy-5">
            
            {/* Left Column: Storytelling Headline */}
            <div className="col-lg-6">
              
              {/* Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-success-subtle text-success border border-success-subtle mb-4">
                <span className="p-1 bg-success rounded-circle animate-pulse"></span>
                <span className="small fw-bold tracking-wide">✨ AI-Powered Pharmacy</span>
              </div>

              {/* Title */}
              <h1 className="display-4 fw-extrabold text-dark tracking-tight mb-3 lh-sm">
                Your Prescription. <br />
                <span className="text-success">Understood by AI.</span>
              </h1>

              {/* Description */}
              <p className="text-muted fs-5 mb-4 lead" style={{ maxWidth: "520px" }}>
                Upload your prescription and let our Gemini AI identify medicines, translate doctor handwriting, and order the exact doses seamlessly.
              </p>

              {/* Call to Actions */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link
                  to="/prescription"
                  className="btn btn-success btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm d-inline-flex align-items-center gap-2 text-decoration-none"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Upload Prescription
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-3 fw-semibold text-decoration-none d-inline-flex align-items-center gap-2 bg-white"
                >
                  <span>Browse Medicines</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex flex-wrap gap-4 pt-2 text-muted small fw-medium">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-success fw-bold">✓</span> AI Prescription Analysis
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-success fw-bold">✓</span> Medicine Search
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-success fw-bold">✓</span> Easy Ordering
                </div>
              </div>

            </div>

            {/* Right Column: Interactive AI Assistant Card */}
            <div className="col-lg-6">
              <div className="position-relative mx-auto" style={{ maxWidth: "460px" }}>
                
                {/* Main AI Card */}
                <div className="card border-0 shadow-lg rounded-4 p-4 bg-white position-relative" style={{ zIndex: 2 }}>
                  
                  {/* Card Header */}
                  <div className="d-flex align-items-center gap-3 border-bottom pb-3 mb-3">
                    <div 
                      className="rounded-3 bg-success text-white d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: "44px", height: "44px" }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4" />
                        <line x1="8" y1="16" x2="8.01" y2="16" />
                        <line x1="16" y1="16" x2="16.01" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">MediAI Assistant</h6>
                      <small className="text-success fw-medium">Online • Pharmacy Intelligence</small>
                    </div>
                  </div>

                  {/* AI Message Bubble */}
                  <div className="p-3 rounded-3 bg-light border text-muted small mb-3">
                    👋 <strong>Hello!</strong> Upload your prescription image, and I will extract medicine names, dosages, and safety guidelines for you.
                  </div>

                  {/* Detected Medicine Banner */}
                  <div className="p-3 rounded-3 border border-success-subtle bg-success-subtle d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-3 bg-white text-success d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: "38px", height: "38px" }}
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-dark fw-bold small">Paracetamol 500mg</div>
                        <small className="text-muted">1 tablet • 2 times daily</small>
                      </div>
                    </div>
                    <span className="badge bg-success text-white rounded-pill px-2.5 py-1 small">
                      Verified ✓
                    </span>
                  </div>

                  {/* AI Status Bottom */}
                  <div className="d-flex align-items-center justify-content-between small text-muted pt-2">
                    <span className="d-flex align-items-center gap-2">
                      <span className="p-1 bg-success rounded-circle"></span>
                      Ready for prescription analysis
                    </span>
                    <span className="text-success fw-bold">Gemini AI</span>
                  </div>

                </div>

                {/* Floating Decorative Badges */}
                <div 
                  className="card border-0 shadow-md rounded-3 p-2 bg-white position-absolute d-none d-sm-flex align-items-center gap-2"
                  style={{ top: "-20px", right: "-20px", zIndex: 3 }}
                >
                  <span className="badge bg-success-subtle text-success p-2 rounded-circle">💊</span>
                  <span className="small fw-bold text-dark pe-2">Accurate Extraction</span>
                </div>

                <div 
                  className="card border-0 shadow-md rounded-3 p-2 bg-white position-absolute d-none d-sm-flex align-items-center gap-2"
                  style={{ bottom: "-15px", left: "-20px", zIndex: 3 }}
                >
                  <span className="badge bg-primary-subtle text-primary p-2 rounded-circle">🩺</span>
                  <span className="small fw-bold text-dark pe-2">Instant OCR</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          2. HOW IT WORKS SECTION
      ========================================= */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-4">
          
          <div className="text-center mb-5">
            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1.5 fw-bold text-uppercase tracking-wider small">
              How It Works
            </span>
            <h2 className="fw-bold text-dark mt-2 mb-2">From prescription to medicine in minutes</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "540px" }}>
              Our streamlined AI pipeline removes the friction of reading difficult doctor scripts and searching manually.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                num: "01",
                title: "Upload",
                desc: "Upload a photo or scan of your handwritten or printed prescription.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                )
              },
              {
                num: "02",
                title: "AI Understands",
                desc: "OCR and Gemini AI analyze the prescription to accurately extract medicine details.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                )
              },
              {
                num: "03",
                title: "Find Medicines",
                desc: "Instant dosage information, stock availability, and verified alternatives matched.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )
              },
              {
                num: "04",
                title: "Easy Order",
                desc: "Add recommended medicines directly to your cart and complete checkout securely.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                )
              }
            ].map((step, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 position-relative hover-shadow transition-all bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div 
                      className="rounded-3 bg-success text-white d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: "44px", height: "44px" }}
                    >
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        {step.icon}
                      </svg>
                    </div>
                    <span className="fs-4 fw-extrabold text-muted opacity-50">{step.num}</span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{step.title}</h5>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          3. AI FEATURE SHOWCASE (BEFORE & AFTER DEMO)
      ========================================= */}
      <section className="py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center gy-5">
            
            {/* Left Narrative */}
            <div className="col-lg-5">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-success-subtle text-success border border-success-subtle mb-3">
                <span className="small fw-bold">INTELLIGENT PRESCRIPTION ANALYSIS</span>
              </div>
              <h2 className="display-6 fw-bold text-dark mb-3">
                Your doctor's handwriting. <br />
                <span className="text-success">Our AI's understanding.</span>
              </h2>
              <p className="text-muted mb-4 lead fs-6">
                No more struggling with messy handwriting or confusion about dosage schedules. MediAI converts doctor scribbles into readable, actionable medicine plans.
              </p>
              <Link
                to="/prescription"
                className="btn btn-success btn-lg rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center gap-2 text-decoration-none"
              >
                <span>Try Prescription AI</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Right Interactive Visual Transformation */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
                <div className="row align-items-center gy-4">
                  
                  {/* Prescription Script Side */}
                  <div className="col-sm-5">
                    <div className="p-3 bg-light border border-2 border-dashed rounded-3 text-center position-relative">
                      <div className="small fw-bold text-muted text-uppercase mb-2">Prescription Slip</div>
                      <div className="font-monospace text-muted small my-2 py-3 bg-white rounded border">
                        <div className="text-decoration-line-through text-danger opacity-75">Dr. R. Sharma</div>
                        <div className="fw-bold text-dark fs-6 mt-1" style={{ fontStyle: "italic" }}>
                          Prctml 500mg
                        </div>
                        <div className="small text-muted">1 tab x 2 dly / 5d</div>
                      </div>
                      <span className="badge bg-secondary-subtle text-secondary small">Raw Image Input</span>
                    </div>
                  </div>

                  {/* Transformation Arrow */}
                  <div className="col-sm-2 text-center text-success fs-3">
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>

                  {/* AI Extraction Result Side */}
                  <div className="col-sm-5">
                    <div className="p-3 bg-success-subtle border border-success-subtle rounded-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-success text-white small">✨ AI Recognized</span>
                        <span className="text-success fw-bold small">100% Match</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-2 border shadow-sm mb-2">
                        <div className="fw-bold text-dark small">Paracetamol 500mg</div>
                        <div className="text-muted small">Dosage: 1 tablet, twice daily</div>
                        <div className="text-success small fw-semibold mt-1">Status: In Stock (₹25)</div>
                      </div>
                      <small className="text-muted d-block text-center">Ready to add to cart</small>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. WHY MEDIAI FEATURES GRID
      ========================================= */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          
          <div className="text-center mb-5">
            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1.5 fw-bold text-uppercase tracking-wider small">
              Why MediAI?
            </span>
            <h2 className="fw-bold text-dark mt-2">More than an online pharmacy</h2>
            <p className="text-muted">Designed for clarity, safety, and rapid healthcare delivery.</p>
          </div>

          <div className="row g-4">
            {[
              {
                title: "AI Powered",
                desc: "Gemini AI breaks down complex medical jargon into easy-to-follow patient schedules.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                )
              },
              {
                title: "Smart Search",
                desc: "Find exact medicines or safe, cost-effective generic alternatives in seconds.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )
              },
              {
                title: "Secure & Private",
                desc: "Your uploaded prescriptions and personal medical records are encrypted and protected.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                )
              },
              {
                title: "Easy Ordering",
                desc: "One-click cart addition, automated dosage reminders, and direct home delivery.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                )
              }
            ].map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-light hover-shadow transition-all">
                  <div 
                    className="rounded-3 bg-white text-success d-flex align-items-center justify-content-center shadow-sm mb-3 border"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          5. CTA BANNER
      ========================================= */}
      <section className="py-5 bg-dark text-white position-relative overflow-hidden">
        {/* Glow Accent */}
        <div 
          className="position-absolute rounded-circle opacity-20"
          style={{
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(50px)",
            pointerEvents: "none"
          }}
        />

        <div className="container py-4 text-center position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-6 fw-bold mb-3">Have a prescription ready?</h2>
          <p className="text-secondary fs-5 mx-auto mb-4" style={{ maxWidth: "500px" }}>
            Let MediAI read and organize your medication schedule in seconds.
          </p>
          <Link
            to="/prescription"
            className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-decoration-none d-inline-flex align-items-center gap-2"
          >
            <span>Upload Prescription Now</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;