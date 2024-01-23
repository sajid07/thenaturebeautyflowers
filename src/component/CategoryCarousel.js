import React from "react";
import Slider from "react-slick";

const CategoryCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Autoplay the slider
    autoplaySpeed: 2000, // Set the autoplay speed in milliseconds (2 seconds)
    pauseOnHover: true, // Pause the slider on hover
  };

  return (
    <div>
      <h2>Category Carousel</h2>
      <Slider {...settings}>
        <div>
          <img src="/images/slide1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="/images/slide2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="/images/slide3.jpg" alt="Slide 3" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
