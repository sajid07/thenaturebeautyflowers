import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import productContext from "../../context/products/productContext";
import { ListGroup, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const host = process.env.REACT_APP_BASE_URI;

const CategoryList = () => {
  const context = useContext(productContext);
  const { deleteCategory } = context;
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts

        const response = await api.get("/api/category/category");
        const categoriesWithValues = response.data.map((category) => ({
          ...category,
          value: category.value,
        }));
        setLoading(false); // Set loading to false when data is fetched

        setCategories(categoriesWithValues);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryValue, categoryId) => {
    try {
      // Check if there are any products associated with the category
      const productsResponse = await api.get(
        `/api/product/category/${categoryValue}`
      );
      const productCount = productsResponse.data.productCount;
      console.log("productCount", productCount);
      // If there are products associated with the category, display a message and abort deletion
      if (productCount > 0) {
        // Display a message indicating that there are products associated with the category
        alert(
          `There are ${productCount} products associated with this category. Deletion aborted.`
        );
        console.log(
          `There are ${productCount} products associated with this category. Deletion aborted.`
        );
        return;
      }

      // If there are no products associated with the category, proceed with deletion
      await deleteCategory(categoryId);
      setCategories(
        categories.filter((category) => category._id !== categoryValue)
      );
      alert("Category deleted successfully"); // Display a simple alert message
      navigate("/dashboard/add-Category");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />{" "}
        </div>
      ) : (
        <div>
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
                    onClick={() => handleDelete(category.value, category._id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </>
  );
};

export default CategoryList;
