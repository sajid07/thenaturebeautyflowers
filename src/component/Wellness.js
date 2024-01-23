import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/products/ProductState';
import Footer from './Footer';
import { RingLoader } from 'react-spinners'; // Import the RingLoader component

const Wellness = () => {
  const productInitial = [];
  const { products, fetchProduct } = useProduct(productInitial);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await fetchProduct({ category: 'wellness' }); // Include category filter for Pool Lights
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed dependency array to fetch data only on component mount

  const poolLightsProducts = products.filter((product) => product.category.toLowerCase() === 'wellness');
  const backgroundStyle = {
    backgroundImage: `url(${'/img/banner/out.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    filter: 'blur(0px)',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px', // You can adjust the border radius as per your preference
    padding: '10px',
    marginBottom: '20px',
    overflow: 'hidden', // Add this line to hide overflow content
  };

  return (
    <>
      <div style={backgroundStyle}></div>

      {loading ? ( // Show spinner when loading is true
        <div style={containerStyle}>
          <RingLoader color="#fc031c" size={150} loading={loading} />
        </div>
      ) : (
        <div className="container mt-5">
        <h2 className="mb-4 text-center" style={{ color: 'red' }}>Wellness</h2>
          <div className="row">
            {poolLightsProducts.map((product) => (
              <div key={product._id} className="col-md-3 mb-3">
                <div className="card" style={boxStyle}>
                  <Link to={`/product/${product._id}`} className="card-link">
                    <img
                      src={product.picture}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '250px', width: '302px' }}
                    />
                  </Link>
                  <div className="card-body" style={{ height: '120px' }}>
                    {/* Set a fixed height */}
                    <h5 className="card-title">
                      <Link to={`/product/${product._id}`} className="card-link">
                        {product.name}
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
 
};

export default Wellness