import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import { addReminder } from "../services/reminderService";

const MedicineReminder = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dosage, setDosage] = useState("1 tablet");
  const [times, setTimes] = useState(["09:00"]);
  const [duration, setDuration] = useState(5);
  const [message, setMessage] = useState("");

  /*
   * Get medicine
   */
  useEffect(() => {
    const loadMedicine = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error loading medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedicine();
  }, [id]);

  /*
   * Add another medicine time
   */
  const addTime = (defaultTime = "18:00") => {
    setTimes([...times, defaultTime]);
  };

  /*
   * Change medicine time
   */
  const changeTime = (index, value) => {
    const updatedTimes = [...times];
    updatedTimes[index] = value;
    setTimes(updatedTimes);
  };

  /*
   * Remove medicine time
   */
  const removeTime = (index) => {
    if (times.length === 1) {
      return;
    }
    setTimes(times.filter((_, i) => i !== index));
  };

  /*
   * Enable browser notification
   */
  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  /*
   * Save reminder
   */
  const handleSaveReminder = async () => {
    if (!product) {
      return;
    }

    const notificationAllowed = await enableNotifications();

    const reminder = {
      medicineId: product.id,
      medicineName: product.name,
      dosage: dosage,
      times: times,
      duration: Number(duration),
      notificationAllowed: notificationAllowed,
    };

    addReminder(reminder);

    setMessage("Medicine reminder successfully created!");
    setTimeout(() => setMessage(""), 5000);
  };

  /*
   * Loading State
   */
  if (loading) {
    return (
      <div 
        className="min-vh-100 bg-light d-flex justify-content-center align-items-center"
        style={{ paddingTop: "80px" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          />
          <p className="text-muted mt-3 fw-medium">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  /*
   * Product not found State
   */
  if (!product) {
    return (
      <div 
        className="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: "100px" }}
      >
        <div className="p-4 bg-white rounded-4 shadow-sm border text-center" style={{ maxWidth: "450px" }}>
          <div className="text-danger mb-3">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="fw-bold text-dark">Medicine Not Found</h3>
          <p className="text-muted">The medicine you're looking for does not exist or has been removed.</p>
          <Link to="/products" className="btn btn-success px-4 py-2 rounded-pill mt-2">
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5" style={{ paddingTop: "90px" }}>
      <div className="container">
        
        {/* Navigation & Header */}
        <div className="mb-4">
          <Link
            to={`/products/${product.id}`}
            className="text-success text-decoration-none fw-semibold d-inline-flex align-items-center gap-2 mb-3"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Medicine
          </Link>

          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill border border-success-subtle d-inline-flex align-items-center gap-2">
              <span className="p-1 bg-success rounded-circle"></span>
              Smart Medication Reminder
            </span>
          </div>
          <h1 className="fw-bold text-dark mb-1">Set Medicine Reminder</h1>
          <p className="text-muted fs-6 mb-0">
            Never miss a dose. Configure your custom alert schedule below.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="row g-4 align-items-start">
          
          {/* LEFT: Configuration Forms */}
          <div className="col-lg-7">
            
            {/* Medicine Brief Header */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-4 bg-success text-white d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "54px", height: "54px" }}
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="badge bg-light text-muted border mb-1">ID: #{product.id}</span>
                    <h5 className="fw-bold text-dark mb-0">{product.name}</h5>
                    <small className="text-muted">{product.description || "Healthcare medication"}</small>
                  </div>
                </div>
                <div className="text-end">
                  <span className="badge bg-success-subtle text-success fs-6 fw-bold px-3 py-2 rounded-3">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Form Schedule */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <h4 className="fw-bold text-dark mb-1">Medication Schedule</h4>
                <p className="text-muted small mb-4">
                  Tell MediPharm when you need to take this medicine.
                </p>

                {/* Dosage Picker */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                    <svg width="18" height="18" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Dosage Amount
                  </label>
                  
                  {/* Visual Dosage Select Chips */}
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {["1 tablet", "2 tablets", "1 capsule", "2 capsules", "5 ml"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setDosage(item)}
                        className={`btn btn-sm rounded-pill px-3 ${
                          dosage === item ? "btn-success" : "btn-outline-secondary"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Fallback Custom Select */}
                  <select
                    className="form-select form-select-lg mt-2 rounded-3"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                  >
                    <option value="1 tablet">1 tablet</option>
                    <option value="2 tablets">2 tablets</option>
                    <option value="1 capsule">1 capsule</option>
                    <option value="2 capsules">2 capsules</option>
                    <option value="5 ml">5 ml</option>
                    <option value="10 ml">10 ml</option>
                    <option value="1 drop">1 drop</option>
                  </select>
                </div>

                {/* Reminder Times */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                      <svg width="18" height="18" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Reminder Times
                    </label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success rounded-pill px-3 fw-semibold"
                      onClick={() => addTime("18:00")}
                    >
                      + Add Time
                    </button>
                  </div>

                  {/* Time Inputs List */}
                  <div className="d-flex flex-column gap-3">
                    {times.map((time, index) => (
                      <div className="d-flex gap-2 align-items-center" key={index}>
                        <div className="input-group input-group-lg shadow-sm">
                          <span className="input-group-text bg-light border-end-0 text-success">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </span>
                          <input
                            type="time"
                            className="form-control border-start-0 ps-0"
                            value={time}
                            onChange={(e) => changeTime(index, e.target.value)}
                          />
                        </div>

                        {times.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-lg px-3 rounded-3"
                            onClick={() => removeTime(index)}
                            title="Remove alarm"
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                    <svg width="18" height="18" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Treatment Duration
                  </label>
                  <div className="input-group input-group-lg shadow-sm">
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="365"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                    <span className="input-group-text bg-light text-muted fw-semibold">
                      days
                    </span>
                  </div>
                </div>

                {/* Browser Notification Banner */}
                <div className="alert alert-success-subtle border border-success-subtle rounded-4 p-3 mb-4">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="text-success fs-3">
                      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <strong className="text-success d-block">Browser Notifications</strong>
                      <p className="mb-0 small text-muted">
                        MediPharm will ask permission so you get alerted even when your browser is in the background.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Success Alert */}
                {message && (
                  <div className="alert alert-success rounded-4 d-flex align-items-center gap-2 mb-4">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="fw-medium">{message}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="button"
                  className="btn btn-success btn-lg rounded-pill w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  onClick={handleSaveReminder}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Set Medicine Reminder
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview Summary Card (Offset fixed navbar properly) */}
          <div className="col-lg-5">
            <div 
              className="card bg-dark text-white border-0 shadow-lg rounded-4 p-4 sticky-top" 
              style={{ top: "6.5rem", zIndex: 10 }}
            >
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
                <h5 className="fw-bold mb-0 text-light d-flex align-items-center gap-2">
                  <svg width="18" height="18" className="text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Schedule Summary
                </h5>
                <span className="badge bg-success text-white rounded-pill px-3 py-1">
                  Live Preview
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3 bg-secondary bg-opacity-25 rounded-3 border border-secondary border-opacity-50 mb-4">
                <div className="small text-secondary mb-1">Medication Target</div>
                <h6 className="fw-bold text-white mb-1">{product.name}</h6>
                <div className="small text-success fw-medium">Dosage: {dosage}</div>
              </div>

              {/* Scheduled Alarms */}
              <div className="mb-4">
                <div className="small text-secondary fw-semibold text-uppercase tracking-wider mb-2">
                  Alarm Times ({times.length})
                </div>
                <div className="d-flex flex-column gap-2">
                  {times.map((t, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center p-2 px-3 rounded-2 bg-secondary bg-opacity-10 border border-secondary border-opacity-25"
                    >
                      <span className="text-light small d-flex align-items-center gap-2">
                        <span className="p-1 bg-success rounded-circle"></span>
                        Alarm #{idx + 1}
                      </span>
                      <span className="font-monospace fw-bold text-success">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Calculation */}
              <div className="row g-2 pt-3 border-top border-secondary">
                <div className="col-6">
                  <div className="p-3 bg-secondary bg-opacity-10 rounded-3 text-center border border-secondary border-opacity-25">
                    <div className="text-secondary small">Course Length</div>
                    <div className="fs-5 fw-bold text-white mt-1">{duration} Days</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-secondary bg-opacity-10 rounded-3 text-center border border-secondary border-opacity-25">
                    <div className="text-secondary small">Total Doses</div>
                    <div className="fs-5 fw-bold text-success mt-1">
                      {Number(duration) * times.length} times
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

export default MedicineReminder;