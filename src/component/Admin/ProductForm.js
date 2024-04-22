import React, { useState, useEffect, useContext } from "react";
import productContext from "../../context/products/productContext";
import axios from "axios";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

const host = process.env.REACT_APP_BASE_URI;

const ProductForm = () => {
  const context = useContext(productContext);
  const { addProduct } = context || {};
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]); // State for storing features
  const [feature, setFeature] = useState(""); // State for the feature input // State for storing features
  const api = axios.create({
    baseURL: host,
  });
  useEffect(() => {
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
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    picture: "",
    pdfFile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("features", JSON.stringify(features)); // Append features to form data
      await addProduct(formData);
      setProduct({
        name: "",
        description: "",
        category: "",
        picture: "",
        pdfFile: "",
      });
      setLoading(false);
      setFeatures([]); // Clear features state after adding product
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "picture" || e.target.name === "pdfFile") {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 100 * 1024 * 1024) {
          alert("Maximum file size allowed is 100 MB");
          e.target.value = "";
        } else {
          setProduct({ ...product, [e.target.name]: file });
        }
      }
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
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

  return (
    <>
      <Container className="my-3">
        <h2 style={{ color: "#3498db" }} className="mt-5">
          Add a Product
        </h2>
        <Form
          className="my-3"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter The Product Name"
              name="name"
              value={product.name}
              onChange={onChange}
              minLength={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter The Product Description"
              name="description"
              value={product.description}
              onChange={onChange}
              minLength={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>Category</Form.Label>
            <Form.Select
              value={product.category}
              onChange={onChange}
              name="category"
              required
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
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>Picture</Form.Label>
            <Form.Control type="file" name="picture" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "green" }}>PDF File</Form.Label>
            <Form.Control
              type="file"
              name="pdfFile"
              accept=".pdf"
              onChange={onChange}
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
          <Button
            disabled={
              loading ||
              product.name.length < 1 ||
              product.description.length < 1
            }
            type="submit"
            variant="primary"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </Form>
      </Container>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small"></div>
        </div>
      </footer>
    </>
  );
};

export default ProductForm;
