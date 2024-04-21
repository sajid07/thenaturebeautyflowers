import NavBar from "../Admin/Navbar";
import SideNavbar from "./SideNavbar";
import ProductList from "../ProductList";
import productContext from "../../context/products/productContext";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const Admin = () => {
  const context = useContext(productContext);
  const { fetchProduct } = context;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await fetchProduct();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />{" "}
        </div>
      ) : (
        <SideNavbar>
          <ProductList />
        </SideNavbar>
      )}
    </>
  );
};

export default Admin;
