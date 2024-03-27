import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AutoplaySlider = () => {
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
    <section id="services" class="services">
      <div className="container">
        <div className="section-title">
          <h2>Brands</h2>
          <p>
            Explore our curated selection of top-tier brands that exemplify
            quality, innovation, and style. Each brand we represent is carefully
            chosen to deliver exceptional products and services, aligning with
            our commitment to excellence.
          </p>
        </div>

        <Slider {...settings}>
          <div>
            <img src="img/brand/aqua.png" alt="Aqua" />
          </div>
          <div>
            <img src="img/brand/astral.png" alt="Astral" />
          </div>
          <div>
            <img src="img/brand/cepex.png" alt="Cepex" />
          </div>
          <div>
            <img src="img/brand/certikin.png" alt="Certikin" />
          </div>
          <div>
            <img src="img/brand/hayward.png" alt="Hayward" />
          </div>
          <div>
            <img src="img/brand/kripsol.png" alt="Kripsol" />
          </div>
          <div>
            <img src="img/brand/mapei.png" alt="Mapei" />
          </div>
          <div>
            <img src="img/brand/pentair.png" alt="Pentair" />
          </div>
          <div>
            <img src="img/brand/source.png" alt="Source" />
          </div>
          <div>
            <img src="img/brand/terraco.png" alt="Terraco" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default AutoplaySlider;
