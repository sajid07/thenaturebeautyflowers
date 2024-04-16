import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import productContext from "../../context/products/productContext";
import { ListGroup, Button } from "react-bootstrap";

const host = process.env.REACT_APP_BASE_URI;

const CategoryList = () => {
  const context = useContext(productContext);
  const { deleteCategory } = context;

  const [categories, setCategories] = useState([]);
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

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="section-title">
        <h2>Category List</h2>
      </div>
      <ListGroup as="ul">
        {categories.map((category) => (
          <ListGroup.Item as="li" key={category._id}>
            <div className="d-flex justify-content-between align-items-center">
              <span className="section-title">{category.name}</span>
              <Button
                variant="danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default CategoryList;
