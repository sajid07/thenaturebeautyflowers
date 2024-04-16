import React, { useContext, useState } from "react";
import productContext from "../../context/products/productContext";
import NavBar from "../Admin/Navbar";
import SideNavbar from "./SideNavbar";
import CategoryList from "./CategoryList";

const CategoryManagement = () => {
  const context = useContext(productContext);
  const host = process.env.REACT_APP_BASE_URI;

  const { addCategory } = context || {};

  const [category, setCategory] = useState({
    name: "",
    picture: "",
  });

  const checkDuplicateCategory = async (categoryName) => {
    try {
      const response = await fetch(
        `${host}/api/category/exists?name=${categoryName}`
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking category existence:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the category name already exists
    const isDuplicate = await checkDuplicateCategory(category.name);

    if (isDuplicate) {
      alert(
        "Category with this name already exists. Please choose a different name."
      );
      return; // Prevent form submission
    }

    // If category name doesn't exist, proceed with form submission
    const formData = new FormData(e.target);
    await addCategory(formData);
    setCategory({
      name: "",
      picture: "",
    });
  };

  const onChange = (e) => {
    if (e.target.name === "picture" || e.target.name === "pdfFile") {
      // Handle file inputs
      setCategory({ ...category, [e.target.name]: e.target.files[0] });
    } else {
      // Handle text inputs
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <NavBar />
      <SideNavbar>
        {" "}
        <h1 className="mt-4">Dashboard</h1>
        <div className="container my-3">
          <h2>Add Category</h2>
          <form
            className="my-3"
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Category Name Here"
                className="form-control"
                id="name"
                name="name"
                value={category.name}
                onChange={onChange}
                minLength={1}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="picture" className="form-label">
                Picture
              </label>
              <input type="file" name="picture" onChange={onChange} required />
              <label className="form-label">Picture Dimension 640*426</label>
            </div>
            <button
              disabled={category.name.length < 1}
              type="submit"
              className="btn btn-primary"
            >
              Add Category
            </button>
          </form>
          <CategoryList></CategoryList>
        </div>
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small"></div>
          </div>
        </footer>
      </SideNavbar>
    </>
  );
};
export default CategoryManagement;
