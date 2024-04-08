import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const containerStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative", // Change to 'relative' instead of 'fixed'
    zIndex: 0, // Change to 0 or a positive value
    filter: "blur(0px)",
  };
  return (
    <>
      <section id="services" class="services">
        <div class="container" data-aos="fade-up">
          <div style={containerStyle} data-aos-delay="100">
            <div className="container-xxl py-5">
              <div className="container">
                <div
                  className="text-center mx-auto mb-5 animate__animated animate__fadeInUp"
                  data-aos-delay="100"
                  style={{ maxWidth: "600px" }}
                >
                  <h1 className="mb-3" style={{ color: "#FF5733" }}>
                    Our Services
                  </h1>
                  <p>We provide a wide range of services to meet your needs.</p>
                </div>
                <div className="row g-4">
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="swimming-pool"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/swimming1.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Swimming Pool</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/water fountain"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/fountain1.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Water Fountain</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/wellness"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/spa.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Wellness</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/pool chemical"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/chemical.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Pool Chemical</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/waterfall"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/wfal.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Waterfalls & Water Curtains</h4>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/intex pool"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/iintex.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Intext Pool And Bestway</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/booster pump"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/motor.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Booster Pumps</h4>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <Link
                      to="/category/irregation"
                      className="cat-item d-block bg-light text-center rounded p-3"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/irregation.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                        <h4>Irregation Material</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
