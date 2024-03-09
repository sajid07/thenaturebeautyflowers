import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Footer from "./Footer";
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
  }, [api, productId, setProduct]);

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
      <div style={backgroundStyle}></div>

      {loading ? (
        <div style={containerStyle}>
          <RingLoader color="#fc031c" size={150} loading={loading} />
        </div>
      ) : (
        <div style={containerStyle}>
          <div style={contentStyle}>
            <div className="card text-center">
              <div className="card-header">
                <h2 style={{ color: "black" }}>{product.name}</h2>
              </div>
              <div className="card-body">
                <img
                  src={product.picture}
                  className="card-img-top "
                  alt={product.name}
                  style={{ height: "AUTO", width: "AUTO" }}
                />
                <div style={contentStyle}>
                  <p
                    style={descriptionStyle}
                    dangerouslySetInnerHTML={{ __html: formattedDescription }}
                  />
                </div>
              </div>
              <div className="card-footer">
                <a
                  href={product.pdfFile}
                  className="btn btn-primary"
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
      )}

      <Footer />
    </>
  );
};

export default ProductDetail;
