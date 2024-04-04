import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import Footer from "./Footer";
import { RingLoader } from "react-spinners";

const CategoryProducts = () => {
  const { category } = useParams();
  const { fetchProduct, products } = useProduct([]);
  const [loading, setLoading] = useState(true);
  console.log("ctae:", category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await fetchProduct();
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [category]);
  const catProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  return (
    <>
      {loading ? (
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
          <h2 className="mb-4 text-center" style={{ color: "#FF5733" }}>
            {category.charAt(0).toUpperCase() + category.slice(1)} Products
          </h2>
          <div className="row">
            {catProducts.length === 0 ? (
              <div className="col-12 text-center">
                <p>Sorry, No products found.</p>
              </div>
            ) : (
              catProducts.map((product) => (
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
                          className="card-img-top img-fluid"
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
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryProducts;
