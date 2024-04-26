import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "./Pagination";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PoolItems = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { getCategories } = useProduct();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
        const sortedCategories = categoriesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [getCategories]);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on the number of filtered categories
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for slicing categories to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  return (
    <>
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto mb-5 animate__animated animate__fadeInUp"
                data-aos-delay="100"
                style={{ maxWidth: "600px" }}
              >
                <h1 className="mb-3" style={{ color: "#FF5733" }}>
                  Our Services
                </h1>
                <p>We provide a wide range of services to meet your needs.</p>
              </div>
              {/* Search bar */}

              <Form.Group controlId="searchCategories">
                <Form.Control
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: "1px solid #ced4da" }}
                />
              </Form.Group>
              <div className="row g-4">
                {loading ? (
                  <div className="spinner">
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                  </div>
                ) : (
                  filteredCategories
                    .slice(startIndex, endIndex)
                    .map((category, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                        data-aos-delay="0.3s"
                      >
                        <Link
                          to={`/category/${category.value}`}
                          className="cat-item d-block bg-light text-center rounded p-3"
                        >
                          <div className="rounded p-4">
                            <div className="icon mb-3">
                              <img
                                src={category.picture_url}
                                alt={category.name}
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                            <h4>{category.name}</h4>
                          </div>
                        </Link>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Render the Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PoolItems;
