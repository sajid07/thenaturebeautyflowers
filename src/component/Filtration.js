import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import Footer from "./Footer";
import { RingLoader } from "react-spinners"; // Import the RingLoader component

const Filtration = () => {
  const productInitial = [];
  const { products, fetchProduct } = useProduct(productInitial);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await fetchProduct({ category: "filtration" }); // Include category filter
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundStyle = {
    // backgroundImage: `url(${'/img/banner/out.jpg'})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    filter: "blur(0px)",
  };

  return (
    <>
      <div style={backgroundStyle}></div>

      {loading ? ( // Show spinner when loading is true
        <div className="container mt-5">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <RingLoader color="#fc031c" size={150} loading={loading} />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h2 className="mb-4">Filtration Products</h2>
          <div className="row">
            {products
              .filter(
                (product) => product.category.toLowerCase() === "filtration"
              )
              .map((product) => (
                <div key={product._id} className="col-md-3 mb-3">
                  <div className="card">
                    <Link to={`/product/${product._id}`} className="card-link">
                      <div
                        style={{
                          position: "relative",
                          paddingBottom: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.picture}
                          className="card-img-top"
                          alt={product.name}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link
                          to={`/product/${product._id}`}
                          className="card-link"
                        >
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

export default Filtration;
