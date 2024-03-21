import React, { useContext, useState } from "react";
import productContext from "../../context/products/productContext";
import NavBar from "../Admin/Navbar";
import SideNavbar from "./SideNavbar";

const AddSalesItems = () => {
  const context = useContext(productContext);

  const { addProduct } = context || {};

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    picture: "",
    pdfFile: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the entire product object to the addProduct function
    await addProduct(new FormData(e.currentTarget));
    setProduct({
      name: "",
      description: "",
      category: "",
      picture: "",
      pdfFile: "",
    });
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
        <h1 class="mt-4">Dashboard</h1>
        <div className="container my-3">
          <h2>Add Sales Product</h2>
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
                className="form-control"
                id="name"
                name="name"
                value={product.name}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={product.description}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={product.category}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture" className="form-label">
                Picture
              </label>
              <input type="file" name="picture" onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pdfFile" className="form-label">
                PDF File
              </label>
              <input type="file" name="pdfFile" onChange={onChange} />
            </div>

            <button
              disabled={
                product.name.length < 5 || product.description.length < 5
              }
              type="submit"
              className="btn btn-primary"
            >
              Add Product
            </button>
          </form>
        </div>
        <footer class="py-4 bg-light mt-auto">
          <div class="container-fluid px-4">
            <div class="d-flex align-items-center justify-content-between small">
              <div class="text-muted">Copyright &copy; Your Website 2023</div>
              <div>
                <a href="sales">Privacy Policy</a>
                &middot;
                <a href="sales">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </SideNavbar>
    </>
  );
};
export default AddSalesItems;
