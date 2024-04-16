import React, { useState, useEffect, useContext } from "react";
import productContext from "../../context/products/productContext";
import NavBar from "../Admin/Navbar";
import SideNavbar from "./SideNavbar";
import axios from "axios";
const host = process.env.REACT_APP_BASE_URI;

const ProductForm = () => {
  const context = useContext(productContext);
  const { addProduct } = context || {};
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
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    picture: "",
    pdfFile: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting form
    try {
      // Pass the entire product object to the addProduct function
      const product = new FormData(e.currentTarget);
      await addProduct(product);
      setProduct({
        name: "",
        description: "",
        category: "",
        picture: "",
        pdfFile: "",
      });
      setLoading(false); // Reset loading state after adding product
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false); // Reset loading state if an error occurs
      // Handle error and provide user feedback
    }
  };

  const onChange = (e) => {
    if (e.target.name === "picture" || e.target.name === "pdfFile") {
      // Handle file inputs
      const file = e.target.files[0];
      if (file) {
        // Check if file size exceeds 100 MB
        if (file.size > 100 * 1024 * 1024) {
          // File size exceeds the maximum allowed size (100 MB)
          alert("Maximum file size allowed is 100 MB");
          // Clear the input field
          e.target.value = "";
        } else {
          // File size is within the allowed limit, update the state
          setProduct({ ...product, [e.target.name]: file });
        }
      }
    } else {
      // Handle text inputs
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <NavBar />
      <SideNavbar>
        <div className="container my-3">
          <h2 style={{ color: "#3498db" }} className="mt-5">
            Add a Product
          </h2>
          <form
            className="my-3"
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <h5
                htmlFor="name"
                className="form-label"
                style={{ color: "green" }}
              >
                Name
              </h5>
              <input
                type="text"
                placeholder="Enter The Product Name"
                className="form-control form-control-lg"
                id="name"
                name="name"
                value={product.name}
                onChange={onChange}
                minLength={1}
                required
              />
            </div>
            <div className="mb-3">
              <h5
                htmlFor="description"
                style={{ color: "green" }}
                className="form-label"
              >
                Description
              </h5>
              <textarea
                placeholder="Enter The Product Description"
                className="form-control form-control-lg"
                id="description"
                name="description"
                value={product.description}
                onChange={onChange}
                minLength={1}
                required
              />
            </div>
            <div className="mb-3">
              <h5
                htmlFor="category"
                style={{ color: "green" }}
                className="form-label"
              >
                Category
              </h5>
              <select
                className="form-control form-control-lg"
                id="category"
                name="category"
                value={product.category}
                onChange={onChange}
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
              </select>
            </div>

            <div className="mb-3">
              <h5
                htmlFor="picture"
                style={{ color: "green" }}
                className="form-label"
              >
                Picture
              </h5>
              <input type="file" name="picture" onChange={onChange} />
            </div>
            <div className="mb-3">
              <h5
                htmlFor="pdfFile"
                style={{ color: "green" }}
                className="form-label"
              >
                PDF File
              </h5>
              <input
                type="file"
                name="pdfFile"
                accept=".pdf"
                onChange={onChange}
              />
            </div>
            <button
              disabled={
                loading ||
                product.name.length < 1 ||
                product.description.length < 1
              }
              type="submit"
              className="btn btn-primary"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
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

export default ProductForm;
