import React from "react";
import { Link } from "react-router-dom";
const WhatsAppButton = ({ phoneNumber, message }) => {
  const buttonStyle = {
    background: "#040575",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "3px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    whiteSpace: "nowrap", // Ensure text is displayed on one line
  };
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <Link to={whatsappUrl} target="_blank">
      <button style={buttonStyle}>Send Message on WhatsApp</button>
    </Link>
  );
};

export default WhatsAppButton;
