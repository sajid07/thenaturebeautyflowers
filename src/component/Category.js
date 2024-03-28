import React from "react";

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
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/swimmingPool"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/swimming1.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>

                        <h4>Swimming Pool</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.3s"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/waterfountain"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/fountain1.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Water Fountain</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="0.5s"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/wellness"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/spa.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Wellness</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/poolchemical"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/chemical.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Pool Chemical</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/waterfall"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/wfal.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Waterfalls & Water Curtains</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/intexpool"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/iintex.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Intext Pool And Bestway</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/boosterpump"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/motor.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Booster Pumps</h4>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                    data-aos-delay="100"
                  >
                    <a
                      className="cat-item d-block bg-light text-center rounded p-3"
                      href="/irregation"
                    >
                      <div className="rounded p-4">
                        <div className="icon mb-3">
                          <img
                            src="img/category/irregation.jpg"
                            alt="Icon"
                            style={{ maxWidth: "100%", height: "auto" }} // Make the image responsive
                          />
                        </div>
                        <h4>Irregation Material</h4>
                      </div>
                    </a>
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
