import React, { useEffect, useState } from "react";
import axios from "axios";
const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    googleMap: "",
  });
  const [contacts, setContacts] = useState({});
  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contacts
        const contactsResponse = await api.get("/api/contacts/contacts");
        setContacts(contactsResponse.data);

        // Fetch product based on productId using GET method
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const fetchDataa = async () => {
      try {
        const response = await api.get("/api/socialLink/links");
        const linksData = response.data;
        setSocialLinks(linksData);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchDataa();
  }, []);

  return (
    <div>
      {" "}
      <div
        className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Get In Touch</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>Shop # 02, Street
                2A, Al Barsha 2,P.O Box :32258, Dubai - UAE
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>
                {contacts.whatsappContact}
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>nbflower@emirates.net.ae
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social"
                  href={socialLinks.twitter}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href={socialLinks.facebook}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href={socialLinks.youtube}
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  className="btn btn-outline-light btn-social"
                  href={socialLinks.instagram}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <a className="btn btn-link text-white-50" href="/contactUs">
                Contact Us
              </a>
              <a className="btn btn-link text-white-50" href="/swimmingPool">
                Our Services
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href="/">Home</a>
                  <a href="/swimmingPool">products</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
