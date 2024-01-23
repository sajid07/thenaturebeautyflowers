import React from 'react';

const Testimonials = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
          <h1 className="mb-3">Our Clients Say!</h1>
          <p>See what out client says</p>
        </div>
            <div className="testimonial-item bg-light rounded p-3">
            <div className="bg-white border rounded p-4">
              <p>"The Nature Flower Beauty exceeded all our expectations. They turned our ordinary backyard into a pool paradise. Their attention to detail and commitment to quality is truly commendable."</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-1.jpg" style={{ width: "45px", height: "45px" }} alt="Client 1" />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Jessica M.</h6>
                  <small>Profession</small>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item bg-light rounded p-3">
            <div className="bg-white border rounded p-4">
              <p>From the initial design discussions to the final touches, working with this team was an absolute pleasure. Our pool is now the envy of the neighborhood, and we couldn't be happier."</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-2.jpg" style={{ width: "45px", height: "45px" }} alt="Client 2" />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Mark S</h6>
                  <small>Profession</small>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item bg-light rounded p-3">
            <div className="bg-white border rounded p-4">
              <p>I can't thank The Nature Flower Beauty enough for transforming our outdoor space. Their innovative designs and top-notch service made our pool project stress-free. Our family is now enjoying the perfect aquatic retreat."</p>
              <div className="d-flex align-items-center">
                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-3.jpg" style={{ width: "45px", height: "45px" }} alt="Client 3" />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Linda K</h6>
                  <small>Profession</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Testimonials;
