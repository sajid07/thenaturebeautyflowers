import React from "react";
import { Link } from "react-router-dom";

const SideNavbar = ({ children }) => {
  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/dashboard">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>
                <div className="sb-sidenav-menu-heading">Products</div>
                <Link className="nav-link" to="/product-form">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  Add Products
                </Link>
                <Link className="nav-link" to="/update-contact">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  Update Contacts
                </Link>

                <div className="sb-sidenav-menu-heading">Projects</div>
                <Link className="nav-link" to="/social-links">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  Add New Social Link
                </Link>
                <Link className="nav-link" to="/add-project">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  Add New Project
                </Link>
                <Link className="nav-link" to="/add-category">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  Add New Category
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
