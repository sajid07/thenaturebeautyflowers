import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Admin/Navbar";
import { Link } from "react-router-dom";

const LinkForm = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    googleMap: "",
  });

  const host = env.process.REACT_APP_BASE_URI;

  const api = axios.create({
    baseURL: host,
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
  }, [api]);

  return (
    <>
      <NavBar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link class="nav-link" to="/Dashboard">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>
                <div class="sb-sidenav-menu-heading">Products</div>
                <Link
                  class="nav-link collapsed"
                  to="/ProductForm"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-columns"></i>
                  </div>
                  Add Products
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="fas fa-angle-down"></i>
                  </div>
                </Link>

                <Link
                  class="nav-link collapsed"
                  to="/UpdateContact"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-book-open"></i>
                  </div>
                  Update Contacts
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="fas fa-angle-down"></i>
                  </div>
                </Link>

                <div class="sb-sidenav-menu-heading">Projects</div>
                <Link class="nav-link" to="/socialLinks">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-chart-area"></i>
                  </div>
                  Add New Social Link
                </Link>
                <Link class="nav-link" to="/addProject">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-chart-area"></i>
                  </div>
                  Add New Project
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Start Bootstrap
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
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
            </div>
          </main>
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
        </div>
      </div>
    </>
  );
};

// Styling
const formContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
