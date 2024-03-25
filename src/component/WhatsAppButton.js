import React from "react";
import { Button } from "react-bootstrap";

const WhatsAppButton = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <Button
      href={whatsappUrl}
      target="_blank"
      className="whatsapp-btn"
      size="lg"
    >
      Send Message on WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
