import React, { useState } from "react";
import axios from "axios";

const AdminPasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const host = process.env.REACT_APP_BASE_URI;
  const handlePasswordResetRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${host}/api/auth/reset-password`, {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="center-container cta3">
      {" "}
      {/* Apply center-container class */}
      <div className="password">
        {" "}
        {/* Apply password-reset-container class */}
        <h2 className="heading">Admin Password Reset Request</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <button
          onClick={handlePasswordResetRequest}
          disabled={!isValidEmail(email) || loading}
          className="reset-button"
        >
          {" "}
          {/* Apply reset-button class */}
          {loading ? "Loading..." : "Request Reset"}
        </button>
        {message && (
          <p
            style={{ color: message.includes("success") ? "green" : "red" }}
            className="message"
          >
            {message}
          </p>
        )}{" "}
        {/* Apply message class */}
      </div>
    </div>
  );
};

export default AdminPasswordResetRequest;
