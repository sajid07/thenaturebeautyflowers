import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CategoryEditModal = ({ category, onClose, onSave }) => {
  const [editedCategory, setEditedCategory] = useState({
    name: category.name,
    picture: null,
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setEditedCategory({
        ...editedCategory,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setEditedCategory({
        ...editedCategory,
        [e.target.name]: e.target.value,
        _id: category._id, // Include the _id property from the category object
      });
    }
  };

  // Function to handle saving edited category details
  const handleSave = () => {
    onSave(editedCategory); // Pass the edited category details to the onSave function
    onClose(); // Close the modal after saving
  };
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            name="name"
            value={editedCategory.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryImage" className="form-label">
            Choose New Image
          </label>
          <input
            type="file"
            className="form-control"
            id="categoryImage"
            name="picture"
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditModal;
