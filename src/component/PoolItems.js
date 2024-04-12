import React from "react";
import { Link } from "react-router-dom";

const PoolItems = () => {
  const categoryData = {
    categoryName: "filtration",
  };
  const backgroundStyle = {
    // backgroundImage: `url(${'/img/banner/out.jpg'})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    filter: "blur(0px)",
  };
  return (
    <>
      <div style={backgroundStyle}></div>

      <div className="container-xxl py-5 ">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 animate__animated animate__fadeInUp"
            data-aos-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3" style={{ color: "#FF5733" }}>
              Swimming Pool Items
            </h1>
            <p>We provide a wide range of items to meet your needs.</p>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.1s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/filtration"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/filtration.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Filtration</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.3s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/pool pump"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/pool-pump.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Pool Pumps</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.5s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/pool light"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/pool-light.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Pool Lights</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.7s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/pool fitting"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/inlet.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Pool Fitting</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.1s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/cleaning product"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/cleaning.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Cleaning Product</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.3s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/heat cool pump"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/heat.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Heat & Cool Pump</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.5s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/dosing system"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/dosing.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Dosing Sysytem</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.7s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/surrounded equipments"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/stairs.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Surrounded Equipments</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.1s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/safety product"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/safety.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Safety Products</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.3s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/pool tiles"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/tiles.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Pool Tiles</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-aos-delay="0.5s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/commercial equipment"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/category/equipment.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Commercial Equipments</h4>
                </div>
              </Link>
            </div>
            <div
              className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
              data-wow-delay="0.7s"
            >
              <Link
                className="cat-item d-block bg-light text-center rounded p-3"
                to="/category/control panel"
              >
                <div className="rounded p-4">
                  <div className="icon mb-3">
                    <img
                      src="img/poolItemImg/cpanel.jpg"
                      alt="Icon"
                      style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                    />
                  </div>
                  <h4>Control Panel</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolItems;
