import React, { useEffect, useState } from "react";
import { useProduct } from "../context/products/ProductState";
import EditProductModal from "./EditProductModal";
import axios from "axios";
import Pagination from "./Pagination"; // Import the Pagination component

const ProductList = () => {
  const productInitial = [];
  const { products, fetchProduct, deleteProduct, editProduct, fetchUserName } =
    useProduct(productInitial);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [categories, setCategories] = useState([]);
  const host = process.env.REACT_APP_BASE_URI;

  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products
      await fetchProduct();

      // Fetch user information
      const user = await fetchUserName();
      setUserName(user);
    };

    fetchData();
    // eslint-disable-next-line
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/category/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset currentPage to 1 when category changes
  };

  const handleReadMore = (productId) => {
    setExpandedProduct(productId === expandedProduct ? null : productId);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Implement the actual deleteProduct functionality
      await deleteProduct(productId);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productId) => {
    console.log("Editing product with ID:", productId);

    // Find the product object by ID
    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleSaveChanges = async (editedProduct) => {
    // Implement the actual editProduct functionality
    try {
      await editProduct(editedProduct);

      console.log("Product updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Sort products alphabetically by name
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={{ color: "#3498db" }}>
          Welcome {userName ? `${userName}!` : ""} to the Management Hub
        </h2>
        <p className="lead text-center" style={{ color: "red" }}>
          Your central control for overseeing and managing operations.
        </p>
      </div>

      <div className="mb-3">
        <label
          htmlFor="categoryFilter"
          className="form-label"
          style={{ color: "#3498db", fontSize: "1.25rem" }}
        >
          Filter by Category:
        </label>

        <div className="container mt-3">
          <select
            className="form-select form-select-lg border border-primary"
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {paginatedProducts.map((product) => (
          <div key={product._id} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={product.picture}
                className="card-img-top img-fluid"
                alt={product.name}
                style={{ height: "225px" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "green" }}>
                  {product.name}
                </h5>
                <p className="card-text">
                  {expandedProduct === product._id
                    ? product.description
                    : `${product.description?.slice(0, 100)}...`}
                </p>
                {product.description && product.description.length > 100 && (
                  <button
                    className="btn btn-link"
                    onClick={() => handleReadMore(product._id)}
                  >
                    {expandedProduct === product._id
                      ? "Read Less"
                      : "Read More"}
                  </button>
                )}
                <p className="card-text">
                  <strong>Category:</strong> {product.category}
                </p>
                <a
                  href={product.pdfFile}
                  className="btn btn-outline-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Brochure
                </a>
                {/* Button to delete a product */}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete Product
                </button>
                {/* Button to update a product */}
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleEditProduct(product._id)}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-5 text-center">
        <div className="text-center">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditProductModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveChanges}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
