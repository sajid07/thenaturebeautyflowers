import React from "react";
import { Link } from "react-router-dom";

const SideNavbar = ({ children }) => {
  return (
    <>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav">
                <div class="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/dashboard">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>
                <div class="sb-sidenav-menu-heading">Products</div>
                <Link class="nav-link" to="/product-form">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  Add Products
                </Link>
                <Link class="nav-link" to="/update-contact">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  Update Contacts
                </Link>

                <div class="sb-sidenav-menu-heading">Projects</div>
                <Link class="nav-link" to="/social-links">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  Add New Social Link
                </Link>
                <Link class="nav-link" to="/add-project">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-briefcase"></i>
                  </div>
                  Add New Project
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
