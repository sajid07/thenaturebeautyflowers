import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const EditProductModal = ({ isModalOpen, onClose, onSave, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]); // State for storing features
  const [feature, setFeature] = useState(""); // State for the feature input // State for storing features

  const [selectedCategory, setSelectedCategory] = useState(
    product.category || ""
  );

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

    if (name === "category") {
      setSelectedCategory(value);
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleClose = () => {
    onClose();
  };
  const handleAddFeature = () => {
    if (feature.trim()) {
      setFeatures([...features, feature.trim()]); // Add new feature to the features array
      setFeature(""); // Clear the input field
    }
  };
  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1); // Remove feature at the specified index
    setFeatures(updatedFeatures); // Update the features state
  };
  const handleSave = () => {
    const updatedProduct = {
      ...editedProduct,
      category: selectedCategory,
      features: features, // Include the features array in the updated product object
    };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal show={isModalOpen} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>Features</Form.Label>
            <div>
              {features.map((feature, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <p className="mb-0 me-2">{feature}</p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter a feature"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddFeature}>
                Add Feature
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={handleInputChange}
              name="category"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.value}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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

export default EditProductModal;
