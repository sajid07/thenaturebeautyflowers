import React from 'react';

const Category = () => {
  const containerStyle = {
    // backgroundImage: `url(${'/img/banner/outk.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative', // Change to 'relative' instead of 'fixed'
    zIndex: 0, // Change to 0 or a positive value
    filter: 'blur(0px)',
  };
  return (
    <>
    <div style={containerStyle}>

    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
        <h1 className="mb-3" style={{ color: '#FF5733' }}>Our Services</h1>
          <p>We provide a wide range of services to meet your needs.</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href='/swimmingPool'>
              <div className="rounded p-4">
               <div className="icon mb-3">
                  <img
                    src="img/category/swimming.png"
                    alt="Icon"
                    style={{ height: '200px', width: 'auto' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
               
             <h4>Swimming Pool</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/waterfountain">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/fountain.jpg"
                    alt="Icon"
                    style={{ height: '200px', width: 'auto' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Water Fountain</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/wellness">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/wellness.png"
                    alt="Icon"
                    style={{ height: '200px', width: 'auto' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Wellness</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/poolchemical">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/pool-chemical.jpg"
                    alt="Icon"
                    style={{ height: '200px', width: 'auto' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Pool Chemical</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/waterfall">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/waterfall.png"
                    alt="Icon"
                    style={{ height: '200px', width: '200px' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Waterfalls & Water Curtains</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/intexpool">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/intex.png"
                    alt="Icon"
                    style={{ height: '200px', width: 'auto' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Intext Pool And Bestway</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/boosterpump">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/pool-pump.jpg"
                    alt="Icon"
                    style={{ height: '228px', width: '200px' }} // Set a fixed height and adjust width for aspect ratio
                  />
                </div>
                <h4>Booster Pumps</h4>
                
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <a className="cat-item d-block bg-light text-center rounded p-3" href="/irregation">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img
                    src="img/category/irregation.jpg"
                    alt="Icon"
                    style={{ height: '228px', width: '200px' }} // Set a fixed height and adjust width for aspect ratio
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
    </>
  );
};

export default Category;




