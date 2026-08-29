import React, { useEffect, useState } from "react";

import {
    getAllUsers
} from "../../services/adminUserService";

import AdminNavbar from "../../components/AdminNavbar";


function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // LOAD USERS
    // ==========================================

    const loadUsers = async () => {

        try {

            setLoading(true);

            const data = await getAllUsers();

            console.log(
                "========== ADMIN USERS =========="
            );

            console.log(data);

            setUsers(data);

        } catch (error) {

            console.error(
                "Failed to load users:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadUsers();

    }, []);


    return (

        <div className="bg-light min-vh-100">

            {/* =================================
                ADMIN NAVBAR
            ================================= */}

            <AdminNavbar />


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <div className="container py-5">


                {/* =================================
                    PAGE HEADER
                ================================= */}

                <div className="d-flex justify-content-between
                                align-items-center mb-5">

                    <div>

                        <div className="text-uppercase
                                        text-secondary
                                        fw-semibold
                                        small
                                        mb-2">

                            Pharmacy Administration

                        </div>


                        <h1 className="fw-bold mb-2">

                            User Management

                        </h1>


                        <p className="text-secondary mb-0">

                            View registered customers and
                            manage account information.

                        </p>

                    </div>


                    {/* USER COUNT */}

                    <div className="d-none d-md-block">

                        <div className="bg-white
                                        border
                                        rounded-4
                                        shadow-sm
                                        px-4
                                        py-3">

                            <small className="text-secondary d-block">

                                Total Users

                            </small>

                            <h4 className="fw-bold mb-0">

                                {users.length}

                            </h4>

                        </div>

                    </div>

                </div>


                {/* =================================
                    LOADING
                ================================= */}

                {loading ? (

                    <div className="card border-0
                                    shadow-sm
                                    rounded-4">

                        <div className="card-body
                                        text-center
                                        py-5">

                            <div
                                className="spinner-border text-success mb-3"
                                role="status"
                            >
                            </div>

                            <p className="text-secondary mb-0">

                                Loading users...

                            </p>

                        </div>

                    </div>

                ) : users.length === 0 ? (

                    /* =================================
                        NO USERS
                    ================================= */

                    <div className="card border-0
                                    shadow-sm
                                    rounded-4">

                        <div className="card-body
                                        text-center
                                        py-5">

                            <h5 className="fw-bold">

                                No Users Found

                            </h5>

                            <p className="text-secondary mb-0">

                                There are no registered users
                                in the system.

                            </p>

                        </div>

                    </div>

                ) : (

                    /* =================================
                        USERS TABLE
                    ================================= */

                    <div className="card border-0
                                    shadow-sm
                                    rounded-4
                                    overflow-hidden">


                        {/* TABLE HEADER */}

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table
                                    className="table
                                               table-hover
                                               align-middle
                                               mb-0"
                                >

                                    <thead
                                        className="table-light"
                                    >

                                        <tr>

                                            <th className="px-4 py-3">

                                                ID

                                            </th>

                                            <th className="py-3">

                                                Name

                                            </th>

                                            <th className="py-3">

                                                Email

                                            </th>

                                            <th className="py-3">

                                                Role

                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.map(
                                            (user) => (

                                            <tr key={user.id}>


                                                {/* ID */}

                                                <td className="px-4">

                                                    <span
                                                        className="text-secondary
                                                                   fw-semibold"
                                                    >

                                                        #{user.id}

                                                    </span>

                                                </td>


                                                {/* NAME */}

                                                <td>

                                                    <div
                                                        className="d-flex
                                                                   align-items-center"
                                                    >

                                                        <div
                                                            className="rounded-circle
                                                                       bg-success
                                                                       bg-opacity-10
                                                                       text-success
                                                                       d-flex
                                                                       align-items-center
                                                                       justify-content-center
                                                                       fw-bold
                                                                       me-3"
                                                            style={{
                                                                width: "40px",
                                                                height: "40px"
                                                            }}
                                                        >

                                                            {user.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}

                                                        </div>


                                                        <span className="fw-semibold">

                                                            {user.name}

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* EMAIL */}

                                                <td>

                                                    <span
                                                        className="text-secondary"
                                                    >

                                                        {user.email}

                                                    </span>

                                                </td>


                                                {/* ROLE */}

                                                <td>

                                                    {user.role === "ADMIN" ? (

                                                        <span
                                                            className="badge
                                                                       bg-dark
                                                                       rounded-pill
                                                                       px-3
                                                                       py-2"
                                                        >

                                                            ADMIN

                                                        </span>

                                                    ) : (

                                                        <span
                                                            className="badge
                                                                       bg-secondary
                                                                       rounded-pill
                                                                       px-3
                                                                       py-2"
                                                        >

                                                            USER

                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}


                {/* =================================
                    INFORMATION CARD
                ================================= */}

                <div className="card
                                border-0
                                shadow-sm
                                rounded-4
                                mt-4">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h5 className="fw-bold mb-2">

                                    Registered Customers

                                </h5>

                                <p className="text-secondary mb-0">

                                    This section displays customer
                                    names, email addresses and
                                    account roles.

                                </p>

                            </div>


                            <div className="col-md-4
                                            text-md-end
                                            mt-3
                                            mt-md-0">

                                <span
                                    className="badge
                                               text-bg-light
                                               border
                                               px-3
                                               py-2"
                                >

                                    🔐 Admin Access

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AdminUsers;