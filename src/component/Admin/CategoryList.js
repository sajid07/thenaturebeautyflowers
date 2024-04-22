import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import productContext from "../../context/products/productContext";
import Image from "react-bootstrap/Image";
import Datatable from "./Datatable";

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

  return (
    <>
      <div className="section-title">
        <h2>Category List</h2>
      </div>
      <Datatable
        loading={loading}
        columns={columns}
        tableData={categories}
        initSorting={initSorting}
        itemDeleteFn={handleDelete}
      />
    </>
  );
};

export default CategoryList;
