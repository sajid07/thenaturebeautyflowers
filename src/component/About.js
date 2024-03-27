import React from "react";

const About = () => {
  return (
    <section id="why-us" className="why-us">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-5 col-md-12 align-items-stretch position-relative video-box"
            data-aos="fade-right"
          >
            <img
              src="/img/about.jpg"
              className="img-fluid"
              alt="About Us"
              style={{ maxWidth: "100%", height: "auto" }} // Ensure image responsiveness
            />
          </div>

          <div
            className="col-lg-7 col-md-12 d-flex flex-column justify-content-center align-items-stretch"
            data-aos="fade-left"
          >
            <div className="content">
              <h2>THE NATURE BEAUTY FLOWERS</h2>
              <p>
                Welcome to <strong>"The Nature Beauty Flower</strong>," your
                premier destination for exceptional pool services. We are
                dedicated to enhancing your pool experience with our expertise
                and commitment. Discover what sets us apart:
              </p>
            </div>

            <div className="accordion-list">
              <ul>
                <li data-aos="fade-up" data-aos-delay="100">
                  <a
                    data-bs-toggle="collapse"
                    className="collapse"
                    data-bs-target="#accordion-list-1"
                  >
                    <span>01</span> Natural Aesthetics{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="accordion-list-1"
                    className="collapse show"
                    data-bs-parent=".accordion-list"
                  >
                    <p>
                      Natural Aesthetics: We bring the beauty of nature to your
                      pool, creating a serene and visually stunning oasis.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="200">
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-list-2"
                    className="collapsed"
                  >
                    <span>02</span> Experienced Team{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="accordion-list-2"
                    className="collapse"
                    data-bs-parent=".accordion-list"
                  >
                    <p>
                      Pool Expertise: Our team's in-depth knowledge ensures your
                      pool is in the best hands, from maintenance to design.
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="300">
                  <a
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-list-3"
                    className="collapsed"
                  >
                    <span>03</span> Satisfaction{" "}
                    <i className="bx bx-chevron-down icon-show"></i>
                    <i className="bx bx-chevron-up icon-close"></i>
                  </a>
                  <div
                    id="accordion-list-3"
                    className="collapse"
                    data-bs-parent=".accordion-list"
                  >
                    <p>
                      Your satisfaction is our priority, and we tailor our
                      services to meet your unique pool needs.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
