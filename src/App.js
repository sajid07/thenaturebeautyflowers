import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import "aos/dist/aos.css";

import "./App.css";

import AOS from "aos";
import Index from "./component/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SwimmingPool from "./component/SwimmingPool";
import Projects from "./component/Projects";
import ContactUs from "./component/ContactUs";
import Admin from "./component/Admin/Admin";
import ProductForm from "./component/Admin/ProductForm";
import ProductState from "./context/products/ProductState";
import ProductDetail from "./component/ProductDetail";
import CreateAdmin from "./component/CreateAdmin";
import Alert from "./component/Alert";
import { Login } from "./component/Login";
import { useState } from "react";
import NavBar from "./component/NavBar";
import WhatsAppUpdateButton from "./component/WhatsAppUpdateButton";
import SocialIcons from "./component/SocialIcons";
import LinkForm from "./component/Admin/LinkForm";
import AddProject from "./component/Admin/AddProject";
import ShowProjects from "./component/ShowProjects";

import CategoryProducts from "./component/CategoryProducts";

function App() {
  AOS.init();

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <ProductState>
        <Router>
          <div className="">
            <NavBar />
            <SocialIcons />
            <div className="alert-container">
              {" "}
              <Alert alert={alert}></Alert>
            </div>
            <Routes>
              <Route
                exact
                path="/signup"
                element={<CreateAdmin showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route exact path="/addProject" element={<AddProject />} />

              <Route exact path="Dashboard" element={<Admin />} />
              <Route
                exact
                path="UpdateContact"
                element={<WhatsAppUpdateButton />}
              />
              <Route exact path="/socialLinks" element={<LinkForm />} />
              <Route exact path="/showProject" element={<ShowProjects />} />

              <Route exact path="ProductForm" element={<ProductForm />} />

              <Route exact path="/" element={<Index />} />
              <Route exact path="/showProjects" element={<ShowProjects />} />
              <Route
                path="/category/:category"
                element={<CategoryProducts />}
              />

              <Route exact path="/swimmingPool" element={<SwimmingPool />} />
              <Route path="/product/:productId" element={<ProductDetail />} />

              <Route exact path="/Projects" element={<Projects />} />
              <Route exact path="/ContactUs" element={<ContactUs />} />
            </Routes>
          </div>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
