import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductModal = ({ isModalOpen, onClose, onSave, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product.category);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle category separately
    if (name === "category") {
      setSelectedCategory(value);
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    // Update the editedProduct with the selectedCategory
    const updatedProduct = { ...editedProduct, category: selectedCategory };
    onSave(updatedProduct);
    onClose();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div
      className={`modal ${isModalOpen ? "show" : ""}`}
      style={{ display: isModalOpen ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="btn btn-info" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <select
                  className="form-select"
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
