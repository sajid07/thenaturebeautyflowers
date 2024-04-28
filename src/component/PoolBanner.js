import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Image } from "react-bootstrap";

import WhatsAppButton from "./WhatsAppButton";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PoolBanner = () => {
  const [contacts, setContacts] = useState({});
  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  const settings = {
    autoplay: true,
    fade: true,
    adaptiveHeight: false,
    variableWidth: false,
    infinite: true,
    dots: false,
    arrows: false,
  };

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
      <div className="pool-banner">
        <Slider {...settings}>
          <Image src="/img/banner/banner1.jpg" alt="Banner 1" fluid />

          <Image src="/img/banner/banner2.jpg" alt="Banner 2" fluid />

          <Image src="/img/banner/banner3.jpg" alt="Banner 3" fluid />
        </Slider>

        <div className="pool-banner-caption">
          <h1 className="pool-banner-caption-text">
            Discover Our Pool Products
          </h1>
          <p className="lead pool-banner-caption-text">
            Explore a wide range of pool equipment and accessories.
          </p>
          <div className="pool-banner-caption-btn ">
            <WhatsAppButton
              phoneNumber={contacts.whatsappContact}
              message="Hello, I have a question!"
            />

            <Button
              variant="warning"
              style={{ marginLeft: "10px" }}
              onClick={handleDownload}
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolBanner;
