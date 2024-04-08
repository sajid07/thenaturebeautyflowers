import React from "react";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <>
      <div className="not-found-container">
        <div className="content">
          <h1>404 - Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotFound;
