import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import "aos/dist/aos.css";
import "./App.css";

import AOS from "aos";
import Index from "./component/Index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
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
import WhatsAppUpdateButton from "./component/Admin/WhatsAppUpdateButton";
import SocialIcons from "./component/SocialIcons";
import LinkForm from "./component/Admin/LinkForm";
import AddProject from "./component/Admin/AddProject";
import ShowProjects from "./component/ShowProjects";
import NotFound from "./component/NotFound";
import CategoryProducts from "./component/CategoryProducts";
import Footer from "./component/Footer";
import CategoryManagement from "./component/Admin/CategoryManagement";

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
          <NavBar />
          <SocialIcons />
          <div className="alert-container">
            <Alert alert={alert}></Alert>
          </div>
          <Routes>
            {/* Client Routes with Footer */}
            <Route
              element={
                <>
                  <div className="route-body">
                    <Outlet />
                  </div>
                  <Footer />
                </>
              }
            >
              <Route exact path="/" element={<Index />} />
              <Route
                exact
                path="/signup"
                element={<CreateAdmin showAlert={showAlert} />}
              />
              <Route
                exact
                path="*"
                element={<NotFound showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route exact path="/show-project" element={<ShowProjects />} />
              <Route exact path="/show-projects" element={<ShowProjects />} />
              <Route
                path="/category/:category"
                element={<CategoryProducts />}
              />
              <Route exact path="/swimming-pool" element={<SwimmingPool />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route exact path="/projects" element={<Projects />} />
              <Route exact path="/contact-us" element={<ContactUs />} />
            </Route>

            {/* Admin Routes without Footer */}
            <Route
              element={
                <>
                  <div className="route-body">
                    <Outlet />
                  </div>
                </>
              }
            >
              <Route exact path="/add-project" element={<AddProject />} />
              <Route
                exact
                path="/add-Category"
                element={<CategoryManagement />}
              />

              <Route exact path="dashboard" element={<Admin />} />
              <Route
                exact
                path="update-contact"
                element={<WhatsAppUpdateButton />}
              />
              <Route exact path="/social-links" element={<LinkForm />} />
              <Route exact path="/product-form" element={<ProductForm />} />
            </Route>
          </Routes>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
