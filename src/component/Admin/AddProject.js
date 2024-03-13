import React, { useContext, useState } from "react";
import productContext from "../../context/products/productContext";
import NavBar from "../Admin/Navbar";
import { Link } from "react-router-dom";
import ProjectList from "./ProjectList";

const AddProject = () => {
  const context = useContext(productContext);

  const { addProject } = context || {};

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    // Pass the entire product object to the addProduct function
    addProject(product);
    setProduct({
      name: "",
      description: "",
      picture: "",
    });
  };

  const onChange = (e) => {
    if (e.target.name === "picture" || e.target.name === "pdfFile") {
      // Handle file inputs
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      // Handle text inputs
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <NavBar />
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
              <h1 class="mt-4">Dashboard</h1>
              <div className="container my-3">
                <h2>Add Project</h2>
                <form className="my-3" encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={onChange}
                      minLength={1}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={onChange}
                      minLength={1}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="picture" className="form-label">
                      Picture
                    </label>
                    <input type="file" name="picture" onChange={onChange} />
                  </div>

                  <button
                    disabled={
                      product.name.length < 1 || product.description.length < 1
                    }
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Add Project
                  </button>
                </form>
                <ProjectList></ProjectList>
              </div>
            </div>
          </main>
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small"></div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default AddProject;
