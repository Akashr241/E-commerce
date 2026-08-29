import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

function AdminProducts() {

    return (
        <div>

            <AdminNavbar />

            <div className="admin-page">

                <div className="admin-page-header">

                    <div>
                        <h1>Product Management</h1>

                        <p>
                            Manage medicines available in MediPharm.
                        </p>
                    </div>

                    <button className="add-product-btn">
                        + Add Product
                    </button>

                </div>


                <div className="admin-product-section">

                    <h2>Products</h2>

                    <p>
                        Your products will appear here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AdminProducts;