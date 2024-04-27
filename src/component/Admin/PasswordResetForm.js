import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import PasswordResetConfirmation from "./PasswordResetConfirmation ";

const PasswordResetForm = () => {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Parse URL parameters to extract the token value
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setResetToken(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        ` ${process.env.REACT_APP_BASE_URI}/api/auth/reset-password-form`,
        {
          resetToken,
          newPassword,
        }
      );
      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.response.data.error);
    }

    setLoading(false);
  };

  if (success) {
    return <PasswordResetConfirmation />;
  }

  return (
    <div className="center-container cta3">
      <div className="password-reset-container">
        <h2 className="mb-4">Password Reset</h2>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" value={resetToken} />

          <Form.Group controlId="newPassword">
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Reset Password"}
          </Button>
        </Form>
        {message && (
          <Alert variant="danger" className="mt-3">
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default PasswordResetForm;
