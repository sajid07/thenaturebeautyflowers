import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Admin/Navbar";
import SideNavbar from "./SideNavbar";

const LinkForm = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    googleMap: "",
  });

  const host = process.env.REACT_APP_BASE_URI;

  const api = axios.create({
    baseURL: host,
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const handleUpdateSocialLinks = async () => {
    try {
      const response = await api.put("/api/socialLink/Update-links", {
        socialLinks: {
          facebook: socialLinks.facebook,
          youtube: socialLinks.youtube,
          instagram: socialLinks.instagram,
          twitter: socialLinks.twitter,
          googleMap: socialLinks.googleMap,
        },
      });
      console.log(response);

      alert("Links updated successfully");
    } catch (error) {
      console.error("Error updating social links:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the server and update the state
    const fetchData = async () => {
      try {
        const response = await api.get("/api/socialLink/links");
        const linksData = response.data;
        setSocialLinks(linksData);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <SideNavbar>
        <div style={formContainerStyle}>
          <label style={labelStyle}>Facebook Link:</label>
          <input
            type="text"
            value={socialLinks.facebook}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, facebook: e.target.value })
            }
            style={inputStyle}
          />
          <label style={labelStyle}>YouTube Link:</label>
          <input
            type="text"
            value={socialLinks.youtube}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, youtube: e.target.value })
            }
            style={inputStyle}
          />
          <label style={labelStyle}>Instagram Link:</label>
          <input
            type="text"
            value={socialLinks.instagram}
            onChange={(e) =>
              setSocialLinks({
                ...socialLinks,
                instagram: e.target.value,
              })
            }
            style={inputStyle}
          />
          <label style={labelStyle}>Twitter Link:</label>
          <input
            type="text"
            value={socialLinks.twitter}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, twitter: e.target.value })
            }
            style={inputStyle}
          />
          <label style={labelStyle}>Google Map Link:</label>
          <input
            type="text"
            value={socialLinks.googleMap}
            onChange={(e) =>
              setSocialLinks({
                ...socialLinks,
                googleMap: e.target.value,
              })
            }
            style={inputStyle}
          />
          <button onClick={handleUpdateSocialLinks} style={buttonStyle}>
            Update Social Links
          </button>
        </div>
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Your Website 2023
              </div>
              <div>
                <a href="/AddSalesitems">Privacy Policy</a>
                &middot;
                <a href="/AddSalesitems">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </SideNavbar>
    </>
  );
};

// Styling
const formContainerStyle = {
  margin: "20px auto",
  width: "100%", // Adjust the width as needed
  maxWidth: "900px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
  display: "block",
  margin: "10px 0",
  fontSize: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "5px 0 20px",
  display: "inline-block",
  border: "3px solid #ccc",
  boxSizing: "border-box",
  borderRadius: "6px",
};

const buttonStyle = {
  background: "#4CAF50",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default LinkForm;
