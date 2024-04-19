import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import WhatsAppButton from "./WhatsAppButton";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [contacts, setContacts] = useState({});
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await api.get("/api/contacts/contacts");
        setContacts(contactsResponse.data);

        console.log("Fetching product data...");
        const productResponse = await api.get(`/api/product/${productId}`);
        console.log("Product Response:", productResponse.data);
        setProduct(productResponse.data);
        setLoading(false);
        console.log("Product set successfully!", product);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "justify",
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const backgroundStyle = {
    backgroundImage: `url(${"/img/banner/out.jpg"})`,
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

  const descriptionStyle = {
    color: "black",
    maxWidth: "600px",
    fontSize: "26px",
    margin: "auto",
  };

  const productDescription = product.description;
  const formattedDescription = productDescription
    ? productDescription.replace(/\n/g, "<br>")
    : "";

  return (
    <>
      {loading ? (
        <div style={containerStyle}>
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />{" "}
        </div>
      ) : (
        <div style={containerStyle} className="cta">
          <div className="cta">
            <div className="card text-center">
              <div className="card-header ">
                <h2 style={{ color: "black" }}>{product.name}</h2>
              </div>
              <div className="card-body">
                <img
                  src={product.picture}
                  className="card-img-top "
                  alt={product.name}
                  style={{ height: "100%", width: "100%" }}
                />
                <div>
                  <p
                    style={descriptionStyle}
                    dangerouslySetInnerHTML={{ __html: formattedDescription }}
                  />
                </div>
              </div>
              <div id="cta" className="cta">
                <div className="container">
                  <div className="row" data-aos="zoom-in">
                    <div className="col-lg-3 cta-btn-container text-center"></div>
                  </div>
                </div>
                <div className="card-footer">
                  <a
                    href={product.pdfFile}
                    className="cta-btn align-middle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Brochure
                  </a>
                  <WhatsAppButton
                    phoneNumber={contacts.whatsappContact}
                    message={`Hi! Interested in ${product.name}. Could you share more details?`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
