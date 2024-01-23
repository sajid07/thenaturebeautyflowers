// AutoplaySlider.js
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AutoplaySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };

  return (
    <div>
<h1 style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>Our Brands</h1>
<h5 style={{ textAlign: 'center', color: '#03bafc',marginTop: '40px',marginBottom:'20px' }}>
    Explore our curated selection of top-tier brands that exemplify quality, innovation,
    and style.<br></br> Each brand we represent is carefully chosen to deliver exceptional products
    and services, aligning with our commitment to excellence.
  </h5>
  <Slider {...settings}>
       <div>
       <img src="img/brand/aqua.png" alt="Slide 1" />
          </div>
          <div>
          <img src="img/brand/astral.png" alt="Slide 2" />
          </div>
          <div>
          <img src="img/brand/cepex.png" alt="Slide 3" />
          </div>
          <div>
          <img src="img/brand/certikin.png" alt="Slide 4" />
          </div>
          <div>
          <img src="img/brand/hayward.png" alt="Slide 5" />
          </div>
          <div>
          <img src="img/brand/kripsol.png" alt="Slide 6" />
          </div>

          <div>
          <img src="img/brand/mapei.png" alt="Slide 6" />
          </div>
          <div>
          <img src="img/brand/pentair.png" alt="Slide 6" />
          </div>
          <div>
          <img src="img/brand/source.png" alt="Slide 6" />
          </div>
          <div>
          <img src="img/brand/terraco.png" alt="Slide 6" />
          </div>
    </Slider>
    </div>
  );
};

export default AutoplaySlider;
