import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import productContext from "../../context/products/productContext";

const CategoryEditModal = ({ category, onClose }) => {
  const [editedCategory, setEditedCategory] = useState({
    name: category.name,
    picture: null,
  });

  const context = useContext(productContext);
  const { editCategoryWithNewData } = context;

  const handleInputChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handlePictureChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      picture: e.target.files[0],
    });
  };

  const handleSave = () => {
    // Check if a picture is selected
    if (!editedCategory.picture) {
      alert("Please select a picture.");
      return; // Stop execution if no picture is selected
    }

    // Prepare data to send to backend
    const formData = new FormData();
    formData.append("name", editedCategory.name);
    formData.append("picture", editedCategory.picture);

    // Send data to backend
    editCategoryWithNewData(category._id, formData);

    // Close modal
    onClose();
  };

  const handleClose = () => {
    // Close modal without saving changes
    onClose();
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedCategory.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="picture">
            <Form.Label>Picture:</Form.Label>

            <Form.Control
              type="file"
              name="picture"
              onChange={handlePictureChange}
            />
          </Form.Group>
          <span>Picture is compulsory:</span>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
