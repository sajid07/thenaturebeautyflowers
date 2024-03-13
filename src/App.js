import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Index from "./component/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SwimmingPool from "./component/SwimmingPool";
import Projects from "./component/Projects";
import ContactUs from "./component/ContactUs";
import WaterFountain from "./component/WaterFountain";
import Wellness from "./component/Wellness";
import Admin from "./component/Admin/Admin";
import ProductForm from "./component/Admin/ProductForm";
import ProductState from "./context/products/ProductState";
import Filtration from "./component/Filtration";
import ProductDetail from "./component/ProductDetail";
import PoolPumpProducts from "./component/PoolPumpProducts";
import PoolLights from "./component/PoolLights";
import CleaningProduct from "./component/CleaningProduct";
import HeatCoolPump from "./component/HeatCoolPump";
import DosingSystem from "./component/DosingSystem";
import SurroundedEquipments from "./component/SurroundedEquipments";
import SafetyProduct from "./component/SafetyProduct";
import PoolTiles from "./component/PoolTiles";
import CommercialEquipment from "./component/CommercialEquipment";
import ControlPanel from "./component/ControlPanel";
import PoolFitting from "./component/PoolFitting";
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
import PoolChemical from "./component/PoolChemical";
import Waterfalls from "./component/Waterfall";
import IntexPool from "./component/IntexPool";
import BoosterPump from "./component/BoosterPump";
import Irregation from "./component/Irregation";

function App() {
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
              {/* Add a container for the alert */}
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
              <Route
                path="/category/pool-pump"
                element={<PoolPumpProducts />}
              />
              <Route path="/category/pool-lights" element={<PoolLights />} />
              <Route path="/category/pool-fitting" element={<PoolFitting />} />

              <Route exact path="/" element={<Index />} />
              <Route exact path="/showProjects" element={<ShowProjects />} />

              <Route exact path="/swimmingPool" element={<SwimmingPool />} />
              <Route exact path="/filtration" element={<Filtration />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cleaning-product" element={<CleaningProduct />} />
              <Route path="/heat-cool-pump" element={<HeatCoolPump />} />
              <Route path="/dosing-system" element={<DosingSystem />} />
              <Route
                path="/surrounded-equipments"
                element={<SurroundedEquipments />}
              />
              <Route path="/safety-product" element={<SafetyProduct />} />
              <Route path="/pool-tiles" element={<PoolTiles />} />
              <Route
                path="/commercial-equipment"
                element={<CommercialEquipment />}
              />
              <Route path="/control-panel" element={<ControlPanel />} />

              <Route exact path="/Projects" element={<Projects />} />
              <Route exact path="/ContactUs" element={<ContactUs />} />
              <Route exact path="/WaterFountain" element={<WaterFountain />} />
              <Route exact path="/Wellness" element={<Wellness />} />
              <Route exact path="/poolchemical" element={<PoolChemical />} />
              <Route exact path="/waterfall" element={<Waterfalls />} />
              <Route exact path="/intexpool" element={<IntexPool />} />
              <Route exact path="/boosterpump" element={<BoosterPump />} />
              <Route exact path="/irregation" element={<Irregation />} />
            </Routes>
          </div>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
