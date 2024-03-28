import React from "react";

const Testimonials = () => {
  return (
    <>
      <section id="services" class="services">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Services</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
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
                      src="img/category/swimming.png"
                      alt="Icon"
                      style={{ height: "200px", width: "auto" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/fountain.jpg"
                      alt="Icon"
                      style={{ height: "200px", width: "auto" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/wellness.png"
                      alt="Icon"
                      style={{ height: "200px", width: "auto" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/pool-chemical.jpg"
                      alt="Icon"
                      style={{ height: "200px", width: "auto" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/waterfall.png"
                      alt="Icon"
                      style={{ height: "200px", width: "200px" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/intex.png"
                      alt="Icon"
                      style={{ height: "200px", width: "auto" }} // Set a fixed height and adjust width for aspect ratio
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
                      src="img/category/pool-pump.jpg"
                      alt="Icon"
                      style={{ height: "228px", width: "200px" }} // Set a fixed height and adjust width for aspect ratio
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
                      style={{ height: "228px", width: "200px" }} // Set a fixed height and adjust width for aspect ratio
                    />
                  </div>
                  <h4>Irregation Material</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default Testimonials;
