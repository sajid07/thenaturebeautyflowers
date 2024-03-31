import React, { useEffect, useState } from "react";
import { useProduct } from "../context/products/ProductState";
import EditProductModal from "./EditProductModal";
import { Pagination } from "react-bootstrap";

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
  const [totalPages, setTotalPages] = useState(1); // State for total pages

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
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / 10)); // Assuming 10 items per page
  }, [filteredProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 10; // Assuming 10 items per page
  const endIndex = startIndex + 10; // Assuming 10 items per page
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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
            <option value="filtration">Filtration</option>
            <option value="pool pump">Pool Pump</option>
            <option value="pool light">Pool Light</option>
            <option value="pool fitting">Pool Fitting</option>
            <option value="cleaning product">Cleaning Product</option>
            <option value="heat cool pump">Heat & Cool Pump</option>
            <option value="dosing system">Dosing System</option>
            <option value="surrounded equipment">Surrounded Equipments</option>
            <option value="safety product">Safety Product</option>
            <option value="commercial equipments">Commercial Equipments</option>
            <option value="control panel">Control Panel</option>
            <option value="water fountain">Water Fountain</option>
            <option value="wellness">Wellness</option>
            <option value="pool chemical">Pool Chemical</option>
            <option value="waterfall">Waterfall</option>
            <option value="intex pool">Intex pool</option>
            <option value="booster pump">Booster Pumps</option>
            <option value="pool tiles">Pool Tiles</option>
            <option value="irregation">Irregation</option>
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
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
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
