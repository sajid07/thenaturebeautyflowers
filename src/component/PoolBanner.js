import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import WhatsAppButton from "./WhatsAppButton";
import axios from "axios";

const PoolBanner = () => {
  const [contacts, setContacts] = useState({});
  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await api.get("/api/contacts/contacts");
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const slideStyle = {
    position: "relative",
    width: "100%",
    height: "700px", // Set a fixed height for all images
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    background: "FFFFFF",
    padding: "50px",
    borderRadius: "1px",
    fontSize: "20px",
  };

  const buttonContainerStyle = {
    position: "absolute",
    bottom: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyle = {
    background: "#040575",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "3px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    whiteSpace: "nowrap", // Ensure text is displayed on one line
  };
  const textStyles = {
    color: "#211e1f", // Change the text color to red
  };
  const handleDownload = () => {
    // Replace 'path/to/your/pdf/file.pdf' with the actual path to your PDF file
    const pdfPath = "/brochure/nbflower-_-Brouchure.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "NBFlower|Brochure.pdf";
    link.click();
  };
  return (
    <>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
      >
        <div style={slideStyle}>
          <img
            src="/img/banner/banner11.png"
            alt="Slide 1"
            style={{ width: "100%", height: "100%" }}
          />
          <div style={textOverlayStyle}>
            <h1 style={textStyles}>Discover Our Pool Products</h1>
            <p style={textStyles}>
              Explore a wide range of pool equipment and accessories.
            </p>
            <div style={buttonContainerStyle}>
              {/* <button style={buttonStyle}>Request A Quote</button> */}
              <WhatsAppButton
                phoneNumber={contacts.whatsappContact}
                message="Hello, I have a question!"
              />

              <button style={buttonStyle} onClick={handleDownload}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        <div style={slideStyle}>
          <img
            src="/img/banner/banner12.png"
            alt="Slide 1"
            style={{ width: "100%", height: "100%" }}
          />
          <div style={textOverlayStyle}>
            <div style={buttonContainerStyle}>
              {/* <button style={buttonStyle}>Request A Quote</button> */}
              <WhatsAppButton
                phoneNumber="+971555821382"
                message="Hello, I have a question!"
              />
              <button style={buttonStyle} onClick={handleDownload}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        <div style={slideStyle}>
          <img
            src="/img/banner/banner14.png"
            alt="Slide 1"
            style={{ width: "100%", height: "100%" }}
          />
          <div style={textOverlayStyle}>
            <h1 style={textStyles}>Discover Our Pool Products</h1>
            <p style={textStyles}>
              {" "}
              Explore a wide range of pool equipment and accessories.
            </p>
            <div style={buttonContainerStyle}>
              {/* <button style={buttonStyle}>Request A Quote</button> */}
              <WhatsAppButton
                phoneNumber="+971555821382"
                message="Hello, I have a question!"
              />{" "}
              <button style={buttonStyle} onClick={handleDownload}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default PoolBanner;
