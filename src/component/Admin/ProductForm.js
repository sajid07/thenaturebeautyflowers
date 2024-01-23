import React, { useContext, useState } from 'react';
import productContext from '../../context/products/productContext';
import NavBar from '../Admin/Navbar';
import { Link } from 'react-router-dom';

const ProductForm = (props) => {
  const context = useContext(productContext);
  
  const { addProduct } = context || {};

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    picture: '',
    pdfFile: '',
  });

  const handleClick = (e) => {
    e.preventDefault();
    // Pass the entire product object to the addProduct function
    addProduct(product);
    setProduct({
      name: '',
      description: '',
      category: '',
      picture: '',
      pdfFile: '',
    });
  };

  const onChange = (e) => {
    if (e.target.name === 'picture' || e.target.name === 'pdfFile') {
      // Handle file inputs
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      // Handle text inputs
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
    <NavBar/>
    <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <Link class="nav-link" to="/Dashboard">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div class="sb-sidenav-menu-heading">Products</div>
                            <Link class="nav-link collapsed" to="/ProductForm" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Add Products
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </Link>
                         
                            <Link class="nav-link collapsed" to="/UpdateContact" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                Update Contacts
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </Link>
                          
                            <div class="sb-sidenav-menu-heading">Projects</div>
                            <Link class="nav-link" to="/socialLinks">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                Add New Social Link
                            </Link>
                            <Link class="nav-link" to="/addProject">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-chart-area"></i>
                  </div>
                  Add New Project
                </Link>
                           
                        </div>
                    </div>
                   
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <div className="container my-3">
                        <h2 style={{ color: '#3498db' }} className="mt-5">
                  Add a Product
                </h2>      <form className=" my-3" encType="multipart/form-data">
        <div className="mb-3">
          <h5 htmlFor="name" className="form-label"  style={{ color: 'green' }}>
            Name
          </h5>
          <input
            type="text"
            placeholder='Enter The Product Name'
            className="form-control form-control-lg"
            id="name"
            name="name"
            value={product.name}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <h5 htmlFor="description" style={{ color: 'green' }} className="form-label">
            Description
          </h5>
          <textarea
  placeholder='Enter The Product Description'
  className="form-control form-control-lg"
  id="description"
  name="description"
  value={product.description}
  onChange={onChange}
  minLength={5}
  required
/>

        </div>
        <div className="mb-3">
          <h5 htmlFor="category" style={{ color: 'green' }} className="form-label">
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
        <option value="" disabled>Select a Category</option>
        <option value="filtration">Filtration</option>
        <option value="pool pump">Pool Pump</option>
        <option value="pool light">Pool Light</option>
        <option value="pool fitting">Pool Fitting</option>
        <option value="cleaning product">Cleaning Product</option>
        <option value="heat cool pump">Heat & Cool Pump</option>
        <option value="dosing system">Dosing System</option>
        <option value="surrounded equipment">Surrounded Equipments</option>
        <option value="safety product">Safety Product</option>
        <option value="commercial equipments">Commercial Equipments</option>
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
          <h5 htmlFor="picture" style={{ color: 'green' }} className="form-label">
            Picture
          </h5>
          <input type="file" name="picture" onChange={onChange} />
        </div>
        <div className="mb-3">
          <h5 htmlFor="pdfFile" style={{ color: 'green' }} className="form-label">
            PDF File
          </h5>
          <input type="file" name="pdfFile" onChange={onChange} />
        </div>

        <button
          disabled={product.name.length < 5 || product.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Product
        </button>
      </form>
    </div>
                       
                    
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    
    </>
  );
};

export default ProductForm;
