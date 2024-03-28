import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="cta" class="cta1">
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: "white" }}>Our other Services</h2>
        </div>

        <Slider {...settings}>
          <div style={{ color: "white" }}>
            <img src="img/services/construction.jpg" alt="construction" />
            <p className="text-below-images">Swimming pool Construction</p>
          </div>
          <div>
            <img src="img/services/fountain.jpg" alt="fountain" />
            <p className="text-below-images">Water Fountain Construction</p>
          </div>
          <div>
            <img src="img/services/pool-maintenance.jpg" alt="Cepex" />
            <p className="text-below-images">Swimming Pool Maintenance</p>
          </div>
          <div>
            <img src="img/services/renovation.jpg" alt="renovation" />
            <p className="text-below-images">Swimming Pool Renovation</p>
          </div>
          <div>
            <img src="img/services/troubleshooter.jpg" alt="troubleshooter" />
            <p className="text-below-images">Troubleshooting</p>
          </div>
          <div>
            <img src="img/services/wellness.jpg" alt="wellness" />
            <p className="text-below-images">Wellness Equipments Instalation</p>
          </div>
          <div>
            <img src="img/services/dosing.jpg" alt="dosing" />
            <p className="text-below-images">Dosing system Instalation</p>
          </div>
          <div>
            <img src="img/services/heat.jpg" alt="heat" />
            <p className="text-below-images">Heat and Chiller Instalation</p>
          </div>
          <div>
            <img src="img/services/tiles.jpg" alt="tiles" />
            <p className="text-below-images">Tile Fixing Under Water</p>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Services;
