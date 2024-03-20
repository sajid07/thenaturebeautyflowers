import React, { useContext, useState } from "react";
import productContext from "../../context/products/productContext";
import NavBar from "../Admin/Navbar";
import { Link } from "react-router-dom";
import SideNavbar from "./SideNavbar";

const ProductForm = (props) => {
  const context = useContext(productContext);
  const { addProduct } = context || {};

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    picture: "",
    pdfFile: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting form
    try {
      // Pass the entire product object to the addProduct function
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
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
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
          <form className=" my-3" encType="multipart/form-data">
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
                <option value="filtration">Filtration</option>
                <option value="filtration">Filtration</option>
                <option value="pool pump">Pool Pump</option>
                <option value="pool light">Pool Light</option>
                <option value="pool fitting">Pool Fitting</option>
                <option value="cleaning product">Cleaning Product</option>
                <option value="heat cool pump">Heat & Cool Pump</option>
                <option value="dosing system">Dosing System</option>
                <option value="surrounded equipment">
                  Surrounded Equipments
                </option>
                <option value="safety product">Safety Product</option>
                <option value="commercial equipments">
                  Commercial Equipments
                </option>
                <option value="control panel">Control Panel</option>
                <option value="water fountain">Water Fountain</option>
                <option value="wellness">Wellness</option>
                <option value="pool chemical">Pool Chemical</option>
                <option value="waterfall">Waterfall</option>
                <option value="intex pool">Intex pool</option>
                <option value="booster pump">Booster Pumps</option>
                <option value="pool tiles">Pool Tiles</option>
                <option value="irregation">Irregation</option>
                {/* Add more options as needed */}
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
              <input type="file" name="pdfFile" onChange={onChange} />
            </div>
            <button
              disabled={
                loading ||
                product.name.length < 1 ||
                product.description.length < 1
              }
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
        <footer class="py-4 bg-light mt-auto">
          <div class="container-fluid px-4">
            <div class="d-flex align-items-center justify-content-between small"></div>
          </div>
        </footer>
      </SideNavbar>
    </>
  );
};

export default ProductForm;
