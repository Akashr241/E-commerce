import React from "react";

const CheckoutForm = ({ formData, handleChange }) => {
  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-4">Shipping Address</h3>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter Full Name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Address"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;