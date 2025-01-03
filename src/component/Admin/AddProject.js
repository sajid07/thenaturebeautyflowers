import React, { useContext, useState } from "react";
import productContext from "../../context/products/productContext";
import ProjectList from "./ProjectList";

const AddProject = () => {
  const context = useContext(productContext);

  const { addProject } = context || {};

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the entire product object to the addProduct function
    await addProject(new FormData(e.currentTarget));
    setProduct({
      name: "",
      description: "",
      picture: "",
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
      <div className="section-title">
        <h2 style={{ color: "#3498db" }} className="mt-5">
          Add Project
        </h2>
      </div>
      <div className="container my-3">
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
              minLength={1}
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
              minLength={1}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="picture" className="form-label">
              Picture
            </label>
            <input type="file" name="picture" onChange={onChange} required />
          </div>

          <button
            disabled={product.name.length < 1 || product.description.length < 1}
            type="submit"
            className="btn btn-primary"
          >
            Add Project
          </button>
        </form>
        <ProjectList></ProjectList>
      </div>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small"></div>
        </div>
      </footer>
    </>
  );
};
export default AddProject;
