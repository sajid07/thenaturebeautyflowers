import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import productContext from "../../context/products/productContext";
import Image from "react-bootstrap/Image";
import Datatable from "./Datatable";
import CategoryEditModal from "./CategoryEditModal"; // Import the modal component

const host = process.env.REACT_APP_BASE_URI;

const CategoryList = ({ categoryAdded }) => {
  const columns = {
    name: { title: "Category Name" },
    picture_url: {
      title: "Category Image",
      disableSorting: true,
      disableFiltering: true,
      template: (cell) => (
        <Image src={cell.getValue()} width={130} thumbnail fluid />
      ),
    },
  };
  const initSorting = [{ id: "name", desc: false }];
  const context = useContext(productContext);
  const { deleteCategory } = context;
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // trigger category list re-render
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State variable to hold the selected category for editing
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility
  const api = axios.create({
    baseURL: host,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts

      const response = await api.get("/api/category/category");
      const categoriesWithValues = response.data.map((category) => ({
        ...category,
        value: category.value,
      }));
      setCategories(categoriesWithValues);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(
    () => {
      fetchCategories();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      fetchCategories();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryAdded]
  );
  const handleEdit = async (category) => {
    // Set the selected category and open the modal for editing
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (category) => {
    try {
      // Check if there are any products associated with the category
      const productsResponse = await api.get(
        `/api/product/category/${category.value}`
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
      await deleteCategory(category._id);
      alert("Category deleted successfully"); // Display a simple alert message
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleSave = async (editedCategory) => {
    try {
      // Call the backend function to update category data
      const response = await api.put(`/api/category/category`, editedCategory);
      // Handle response from the backend if needed
      console.log("Category updated successfully:", response.data);
      // Close the modal after saving
      setShowModal(false);
      // Fetch categories to update the list
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return (
    <>
      <div className="section-title">
        <h2 style={{ color: "#3498db" }} className="mt-5">
          Category List
        </h2>
      </div>
      <Datatable
        loading={loading}
        columns={columns}
        tableData={categories}
        initSorting={initSorting}
        itemDeleteFn={handleDelete}
        itemEditFn={handleEdit}
      />
      {/* Render the modal if showModal state is true */}
      {showModal && (
        <CategoryEditModal
          category={selectedCategory}
          onSave={handleSave} // Pass the handleSave function to the modal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CategoryList;
