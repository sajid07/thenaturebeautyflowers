import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProductList from "../ProductList";
import WhatsAppUpdateButton from "../WhatsAppUpdateButton";

const SideNavbar = () => {
  const location = useLocation();

  // Check if the current route is "/UpdateContact"
  const isUpdateContactPage = location.pathname === "/UpdateContact";

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
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              {/* <ProductList/> */}

              {isUpdateContactPage ? <WhatsAppUpdateButton /> : <ProductList />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
