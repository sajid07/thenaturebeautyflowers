import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/api/category/category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Extract the first 5 categories
  const firstFiveCategories = categories.slice(0, 5);
  // Extract the remaining categories
  const remainingCategories = categories.slice(5);

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
              {/* Display the first 5 categories */}
              {firstFiveCategories.map((category) => (
                <NavDropdown.Item
                  key={category._id}
                  as={Link}
                  to={`/category/${category.value}`}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
              {/* Dropdown for remaining categories */}
              {remainingCategories.length > 0 && (
                <NavDropdown title="More">
                  {remainingCategories.map((category) => (
                    <NavDropdown.Item
                      key={category._id}
                      as={Link}
                      to={`/category/${category.value}`}
                    >
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              )}
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
