import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import { RingLoader } from "react-spinners";

const CategoryProducts = () => {
  let { category } = useParams();
  const { fetchProduct, products } = useProduct([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Change this number to adjust the number of products per page

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
  // if (category.includes("-")) {
  //   // Replace hyphens with spaces
  //   category = category.replace(/-/g, " ");
  // }
  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <div className="container mt-5">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <RingLoader color="#fc031c" size={150} loading={loading} />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h2 className="mb-4 text-center" style={{ color: "#3498db" }}>
            {category.charAt(0).toUpperCase() + category.slice(1)} Products
          </h2>
          <div className="row">
            {currentProducts.length === 0 ? (
              <div className="col-12 text-center">
                <p>Sorry, No products found.</p>
              </div>
            ) : (
              currentProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-3">
                  <div className="card">
                    <Link to={`/product/${product._id}`} className="card-link">
                      <div
                        style={{
                          position: "relative",
                          paddingBottom: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.picture}
                          className="card-img-top img-fluid"
                          alt={product.name}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
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
          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                {[...Array(totalPages).keys()].map((number) => (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => paginate(number + 1)}
                      className="page-link"
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
