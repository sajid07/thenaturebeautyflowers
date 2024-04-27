import React from "react";

const PasswordResetConfirmation = () => {
  return (
    <div className="confirmation-container">
      <h2>Password Changed Successfully</h2>
      <p>your password have been changed,click below to to login</p>
      {/* Optionally, add a link/button to redirect users to the password reset form */}
      <button onClick={() => history.push("/login")} className="reset-button">
        Login
      </button>
    </div>
  );
};

export default PasswordResetConfirmation;
