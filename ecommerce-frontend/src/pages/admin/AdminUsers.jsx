import React, { useEffect, useState } from "react";

import {
    getAllUsers
} from "../../services/adminUserService";


function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);


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

        <div className="container py-4">

            <h2 className="mb-4">
                User Management
            </h2>


            {loading ? (

                <p>
                    Loading users...
                </p>

            ) : (

                <div className="card shadow-sm">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Role</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map(
                                        (user) => (

                                        <tr key={user.id}>

                                            <td>
                                                {user.id}
                                            </td>

                                            <td>
                                                {user.name}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        user.role === "ADMIN"
                                                            ? "badge bg-dark"
                                                            : "badge bg-secondary"
                                                    }
                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminUsers;