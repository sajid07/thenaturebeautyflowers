import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container-fluid nav-bar bg-transparent top-header">
      <Navbar expand="lg" bg="white" variant="light" className="py-0 px-4">
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center text-center"
        >
          <div className="icon p-2 me-2">
            <img
              src="/img/banner/logo.jpg"
              alt="Icon"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <h1 className="m-0 text-success">The Nature Beauty Flowers</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarCollapse" />

        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="">
              Home
            </Nav.Link>

            <NavDropdown title="Products">
              <NavDropdown.Item as={Link} to="/swimming-pool">
                Swimming Pool
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Water Fountain">
                Water Fountain
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Wellness">
                Wellness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/pool chemical">
                Pool Chemicals
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/waterfall">
                Waterfalls & Water Curtains
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/intex pool">
                Intex Pool & Bestway
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/booster pump">
                Booster Pumps
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/projects">
              Projects
            </Nav.Link>

            <Nav.Link as={Link} to="/contact-us">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
