import React, { useState } from 'react';

const EditProductModal = ({ isModalOpen, onClose, onSave, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [selectedCategory, setSelectedCategory] = useState(product.category);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle category separately
    if (name === 'category') {
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
    <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Edit Product</h5>
          <button type="button" className="close text-white" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
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
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
  
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category:</label>
              {/* <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
              /> */}
            <select
          className="form-select"
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

  
            <button type="button" className="btn btn-primary" onClick={handleSave}>
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
