import React from "react";

function OrderCard({ order }) {

    return (

        <div className="card mb-3">

            <div className="card-body">

                <h5>Order #{order.id}</h5>

                <p>Status : {order.status}</p>

                <p>Total : ₹{order.totalAmount}</p>

            </div>

        </div>

    );

}

export default OrderCard;