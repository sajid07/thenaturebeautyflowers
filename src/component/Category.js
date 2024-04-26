// import React from "react";
// import { Link } from "react-router-dom";

// const Category = () => {
//   const containerStyle = {
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     minHeight: "100vh",
//     position: "relative", // Change to 'relative' instead of 'fixed'
//     zIndex: 0, // Change to 0 or a positive value
//     filter: "blur(0px)",
//   };
//   return (
//     <>
//       <section id="services" className="services">
//         <div className="container" data-aos="fade-up">
//           <div style={containerStyle} data-aos-delay="100">
//             <div className="container-xxl py-5">
//               <div className="container">
//                 <div
//                   className="text-center mx-auto mb-5 animate__animated animate__fadeInUp"
//                   data-aos-delay="100"
//                   style={{ maxWidth: "600px" }}
//                 >
//                   <h1 className="mb-3" style={{ color: "#FF5733" }}>
//                     Our Services
//                   </h1>
//                   <p>We provide a wide range of services to meet your needs.</p>
//                 </div>
//                 <div className="row g-4">
//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="swimming-pool"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/swimming1.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Swimming Pool</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/water-fountain"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/fountain1.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Water Fountain</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/wellness"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/spa.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Wellness</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/pool-chemical"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/chemical.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Pool Chemical</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/waterfall"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/wfal.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Waterfalls & Water Curtains</h4>
//                       </div>
//                     </Link>
//                   </div>
//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/intex-pool"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/iintex.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Intext Pool And Bestway</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/booster-pump"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/motor.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Booster Pumps</h4>
//                       </div>
//                     </Link>
//                   </div>

//                   <div
//                     className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
//                     data-aos-delay="0.3s"
//                   >
//                     <Link
//                       to="/category/irregation"
//                       className="cat-item d-block bg-light text-center rounded p-3"
//                     >
//                       <div className="rounded p-4">
//                         <div className="icon mb-3">
//                           <img
//                             src="img/category/irregation.jpg"
//                             alt="Icon"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </div>
//                         <h4>Irregation Material</h4>
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Category;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/products/ProductState";
import Button from "react-bootstrap/Button";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { getCategories } = useProduct([]);

  useEffect(() => {
    // Fetch categories from the database or an API
    const fetchCategories = async () => {
      try {
        // Example fetch request
        const categoriesData = await getCategories(); // Call the function to fetch categories

        // Update state with fetched categories
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error if necessary
      }
    };

    fetchCategories();
  }, []);
  // const containerStyle = {
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center",
  //   minHeight: "100vh",
  //   position: "relative",
  //   zIndex: 0,
  //   filter: "blur(0px)",
  // };

  return (
    <>
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">
          <div data-aos-delay="100">
            <div className="container-xxl py-5">
              <div className="container">
                <div
                  className="text-center mx-auto mb-5 animate__animated animate__fadeInUp"
                  data-aos-delay="100"
                  style={{ maxWidth: "600px" }}
                >
                  <h1 className="mb-3" style={{ color: "#FF5733" }}>
                    Our Services
                  </h1>
                  <p>We provide a wide range of services to meet your needs.</p>
                </div>
                <div className="row g-4">
                  {categories.slice(0, 8).map((category) => (
                    <div
                      key={category.id} // Assuming each category has a unique 'id' property
                      className="col-lg-3 col-sm-6 animate__animated animate__fadeInUp"
                      data-aos-delay="0.3s"
                    >
                      <Link
                        to={`/category/${category.value}`} // Assuming each category has a 'slug' property for the URL
                        className="cat-item d-block bg-light text-center rounded p-3"
                      >
                        <div className="rounded p-4">
                          <div className="icon mb-3">
                            <img
                              src={`${category.picture_url}`} // Assuming each category has an 'image' property for the image URL
                              alt={category.name}
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                          <h4>{category.name}</h4>
                        </div>
                      </Link>
                    </div>
                  ))}
                  <Button
                    href="/Swimming-Pool"
                    className="text-white"
                    variant="info"
                  >
                    See More Categories
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
