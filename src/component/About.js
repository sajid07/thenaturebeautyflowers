import React from "react";
import Accordion from "react-bootstrap/Accordion";

const About = () => {
  return (
    <section id="why-us" class="why-us">
      <div class="row">
        <div
          class="col-lg-5 col-md-12 align-items-stretch position-relative video-box"
          data-aos="fade-right"
        >
          <img
            src="/img/about5.jpg"
            class="img-fluid"
            alt="About Us"
            style={{ maxWidth: "100%", height: "auto" }} // Ensure image responsiveness
          />
        </div>

        <div
          class="col-lg-7 col-md-12 d-flex flex-column justify-content-center align-items-stretch"
          data-aos="fade-left"
        >
          <div class="content">
            <h2>THE NATURE BEAUTY FLOWERS</h2>
            <p>
              Welcome to <strong>"The Nature Beauty Flower</strong>," your
              premier destination for exceptional pool services. We are
              dedicated to enhancing your pool experience with our expertise and
              commitment. Discover what sets us apart:
            </p>
          </div>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item
              eventKey="0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Accordion.Header>
                <span>01</span> Natural Aesthetics{" "}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Natural Aesthetics: We bring the beauty of nature to your
                  pool, creating a serene and visually stunning oasis.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Accordion.Header>
                <span>02</span> Experienced Team{" "}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Pool Expertise: Our team's in-depth knowledge ensures your
                  pool is in the best hands, from maintenance to design.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Accordion.Header>
                <span>03</span> Satisfaction{" "}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Your satisfaction is our priority, and we tailor our services
                  to meet your unique pool needs.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default About;
