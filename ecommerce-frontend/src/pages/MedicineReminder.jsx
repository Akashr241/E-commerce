import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import { addReminder } from "../services/reminderService";

const MedicineReminder = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [dosage, setDosage] =
        useState("1 tablet");

    const [times, setTimes] =
        useState(["09:00"]);

    const [duration, setDuration] =
        useState(5);

    const [message, setMessage] =
        useState("");

    /*
     * Get medicine
     */

    useEffect(() => {

        const loadMedicine = async () => {

            try {

                const response =
                    await api.get(`/products/${id}`);

                setProduct(response.data);

            } catch (error) {

                console.error(
                    "Error loading medicine:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadMedicine();

    }, [id]);


    /*
     * Add another medicine time
     */

    const addTime = () => {

        setTimes([
            ...times,
            "18:00"
        ]);

    };


    /*
     * Change medicine time
     */

    const changeTime = (index, value) => {

        const updatedTimes =
            [...times];

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

        setTimes(
            times.filter(
                (_, i) => i !== index
            )
        );

    };


    /*
     * Enable browser notification
     */

    const enableNotifications = async () => {

        if (!("Notification" in window)) {

            alert(
                "Your browser does not support notifications."
            );

            return false;
        }

        if (Notification.permission === "granted") {

            return true;

        }

        const permission =
            await Notification.requestPermission();

        return permission === "granted";

    };


    /*
     * Save reminder
     */

    const handleSaveReminder = async () => {

        if (!product) {
            return;
        }

        const notificationAllowed =
            await enableNotifications();

        const reminder = {

            medicineId: product.id,

            medicineName: product.name,

            dosage: dosage,

            times: times,

            duration: Number(duration),

            notificationAllowed:
                notificationAllowed

        };


        addReminder(reminder);


        setMessage(
            "Medicine reminder successfully created!"
        );

    };


    if (loading) {

        return (
            <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    />

                    <p className="text-muted mt-3">
                        Loading medicine...
                    </p>

                </div>

            </div>
        );

    }


    if (!product) {

        return (
            <div className="container py-5 text-center">

                <h3>
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

                {/* HEADER */}

                <div className="mb-5">

                    <Link
                        to={`/products/${product.id}`}
                        className="text-success text-decoration-none"
                    >
                        ← Back to Medicine
                    </Link>

                    <div className="mt-4">

                        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

                            ⏰ Medication Reminder

                        </span>

                        <h1 className="fw-bold mt-3">
                            Set Medicine Reminder
                        </h1>

                        <p className="text-muted fs-5">
                            Never forget to take your medicine.
                        </p>

                    </div>

                </div>


                <div className="row g-4">


                    {/* MEDICINE */}

                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4 p-lg-5">

                                <div
                                    className="
                                        bg-success-subtle
                                        rounded-4
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                        mb-4
                                    "
                                    style={{
                                        height: "220px"
                                    }}
                                >

                                    <span
                                        style={{
                                            fontSize: "100px"
                                        }}
                                    >
                                        💊
                                    </span>

                                </div>


                                <span className="badge bg-success rounded-pill">
                                    Medicine
                                </span>


                                <h3 className="fw-bold mt-3">
                                    {product.name}
                                </h3>


                                <p className="text-muted">
                                    {product.description}
                                </p>


                                <hr />


                                <div className="d-flex justify-content-between">

                                    <span className="text-muted">
                                        Price
                                    </span>

                                    <strong className="text-success">
                                        ₹{product.price}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* REMINDER FORM */}

                    <div className="col-lg-7">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4 p-lg-5">


                                <h4 className="fw-bold">
                                    Medication Schedule
                                </h4>

                                <p className="text-muted">
                                    Tell MediPharm when you need
                                    to take this medicine.
                                </p>


                                {/* DOSAGE */}

                                <div className="mt-4">

                                    <label className="form-label fw-semibold">
                                        💊 Dosage
                                    </label>

                                    <select
                                        className="form-select form-select-lg"
                                        value={dosage}
                                        onChange={(e) =>
                                            setDosage(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>
                                            1 tablet
                                        </option>

                                        <option>
                                            2 tablets
                                        </option>

                                        <option>
                                            1 capsule
                                        </option>

                                        <option>
                                            2 capsules
                                        </option>

                                        <option>
                                            5 ml
                                        </option>

                                    </select>

                                </div>


                                {/* TIMES */}

                                <div className="mt-4">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <label className="form-label fw-semibold">
                                            ⏰ Reminder Times
                                        </label>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success rounded-pill"
                                            onClick={addTime}
                                        >
                                            + Add Time
                                        </button>

                                    </div>


                                    {times.map(
                                        (time, index) => (

                                            <div
                                                className="d-flex gap-2 mb-3"
                                                key={index}
                                            >

                                                <div className="input-group">

                                                    <span className="input-group-text bg-success-subtle">
                                                        🔔
                                                    </span>

                                                    <input
                                                        type="time"
                                                        className="form-control form-control-lg"
                                                        value={time}
                                                        onChange={(e) =>
                                                            changeTime(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                {times.length > 1 && (

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            removeTime(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        ×
                                                    </button>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* DURATION */}

                                <div className="mt-4">

                                    <label className="form-label fw-semibold">
                                        📅 Duration
                                    </label>

                                    <div className="input-group input-group-lg">

                                        <input
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            max="365"
                                            value={duration}
                                            onChange={(e) =>
                                                setDuration(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="input-group-text">
                                            days
                                        </span>

                                    </div>

                                </div>


                                {/* INFO */}

                                <div className="alert alert-success border-0 rounded-4 mt-4">

                                    <div className="d-flex gap-3">

                                        <div className="fs-4">
                                            🔔
                                        </div>

                                        <div>

                                            <strong>
                                                Browser Reminder
                                            </strong>

                                            <p className="mb-0 small mt-1">
                                                MediPharm will ask for
                                                notification permission
                                                so you can receive your
                                                medicine reminder.
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* SUCCESS */}

                                {message && (

                                    <div className="alert alert-success rounded-4">

                                        ✓ {message}

                                    </div>

                                )}


                                {/* SAVE */}

                                <button
                                    type="button"
                                    className="
                                        btn
                                        btn-success
                                        btn-lg
                                        rounded-pill
                                        w-100
                                        mt-3
                                    "
                                    onClick={
                                        handleSaveReminder
                                    }
                                >

                                    🔔 Set Medicine Reminder

                                </button>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default MedicineReminder;