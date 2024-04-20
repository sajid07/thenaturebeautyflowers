import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "./Pagination"; // Import the Pagination component

const CategoryProducts = () => {
  let { category } = useParams();
  const { fetchProduct, products } = useProduct([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Change this number to adjust the number of products per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await fetchProduct();
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [category]);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  // Filter products by search term
  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = searchedProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4 text-center" style={{ color: "#3498db" }}>
          {category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Products
        </h2>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />{" "}
          </div>
        ) : (
          <div className="row">
            {currentProducts.length === 0 ? (
              <div className="col-12 text-center">
                <p>No products found.</p>
              </div>
            ) : (
              currentProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-3">
                  <div className="card">
                    <Link to={`/product/${product._id}`} className="card-link">
                      <div>
                        <img
                          src={product.picture}
                          className="card-img-top img-fluid"
                          alt={product.name}
                          style={{ height: "225px", width: "180px" }}
                        />
                      </div>
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link
                          to={`/product/${product._id}`}
                          className="card-link"
                        >
                          {product.name}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
