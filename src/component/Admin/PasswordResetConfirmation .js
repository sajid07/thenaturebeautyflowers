import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="confirmation-container">
      <h2>Password Changed Successfully</h2>
      <p>Your password has been changed. Click below to login.</p>
      <button onClick={handleLoginClick} className="reset-button">
        Login
      </button>
    </div>
  );
};

export default PasswordResetConfirmation;
