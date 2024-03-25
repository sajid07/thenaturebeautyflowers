import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import productContext from "../context/products/productContext";
import SideNavbar from "./Admin/SideNavbar";
import NavBar from "./Admin/Navbar";
import { useNavigate } from "react-router-dom";

const WhatsAppUpdateButton = ({ onUpdate }) => {
  const [newWhatsAppContact, setNewWhatsAppContact] = useState("");
  const [newCallContact, setNewCallContact] = useState("");
  const host = process.env.REACT_APP_BASE_URI;
  const context = useContext(productContext);

  const { updateContacts } = context || {};
  const api = axios.create({
    baseURL: host,
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  const [loggedIn, setLoggedIn] = useState(true); // Assume the user is logged in initially
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If token doesn't exist, user is not logged in
        setLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (!loggedIn) {
    // If user is not logged in, redirect to login page
    navigate("/login");
  }
  const handleUpdateContacts = async (e) => {
    try {
      // Make API call to update contacts on the server
      const response = await api.put("/api/contacts/update-contacts", {
        newWhatsAppContact,
        newCallContact,
      });

      // Check if the API call was successful
      if (response.status === 200) {
        // If successful, call the updateContacts function from productContext
        if (updateContacts) {
          await updateContacts(newWhatsAppContact, newCallContact, host);

          // Notify the parent component about the update
          // onUpdate();

          // Optionally, reset the form or close the modal after submission

          // Log success or perform other actions if needed
          console.log("Contacts updated successfully!");
        }
      } else {
        // Log an error or perform other actions if needed
        console.error("Error updating contacts:", response.data);
      }
    } catch (error) {
      // Handle other errors if any
      console.error("Error updating contacts:", error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <SideNavbar>
        <div style={formContainerStyle}>
          <label style={labelStyle}>New WhatsApp Contact:</label>
          <input
            type="text"
            value={newWhatsAppContact}
            onChange={(e) => setNewWhatsAppContact(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>New Call Contact:</label>
          <input
            type="text"
            value={newCallContact}
            onChange={(e) => setNewCallContact(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleUpdateContacts} style={buttonStyle}>
            Update Contacts
          </button>
        </div>
      </SideNavbar>
    </>
  );
};

// Styling
const formContainerStyle = {
  maxWidth: "400px",
  margin: "100px auto 0", // Adjust margin from the top
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
  display: "block",
  margin: "10px 0",
  fontSize: "25px", // Increased font size
};

const inputStyle = {
  width: "100%",
  padding: "12px", // Increased padding
  margin: "5px 0 20px", // Increased margin
  display: "inline-block",
  border: "3px solid #ccc",
  boxSizing: "border-box",
  borderRadius: "6px", // Increased border radius
};

const buttonStyle = {
  background: "#4CAF50",
  color: "white",
  padding: "12px 20px", // Increased padding
  border: "none",
  borderRadius: "6px", // Increased border radius
  cursor: "pointer",
};

export default WhatsAppUpdateButton;
