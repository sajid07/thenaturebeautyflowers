import React from "react";

const Contact = () => {
  return (
    <section id="cta" class="cta">
      <div class="container">
        <div class="row" data-aos="zoom-in">
          <div class="col-lg-9 text-center text-lg-start">
            <h3>Get In Touch</h3>
            <p> Email: nbflower@emirates.net.ae</p>

            <p>Company: THE NATURE BEAUTY FLOWER</p>
            <p>Shop # 02, Street 2A, Al Barsha 2,P.O Box :32258, Dubai - UAE</p>
          </div>
          <div class="col-lg-3 cta-btn-container text-center">
            <a
              class="cta-btn align-middle"
              href="https://www.google.com/maps/search/?api=1&query=Al+Barsha"
              target="_blank"
            >
              Location: Al Barsha
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
