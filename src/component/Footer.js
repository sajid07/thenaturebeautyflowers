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
        const contactsResponse = await api.get("/api/contacts/contacts");
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    const fetchDataa = async () => {
      try {
        const response = await api.get("/api/socialLink/links");
        const linksData = response.data;
        setSocialLinks(linksData);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchData();
    fetchDataa();
  }, []);

  return (
    <footer className=" bg-dark text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <h5 className="mb-4">Get In Touch</h5>
            <p className="mb-3">
              <i className="fa fa-map-marker-alt me-2"></i>
              Shop # 02, Street 2A, Al Barsha 2,P.O Box :32258, Dubai - UAE
            </p>
            <p className="mb-3">
              <i className="fa fa-phone-alt me-2"></i>
              {contacts.whatsappContact}
            </p>
            <p className="mb-3">
              <i className="fa fa-envelope me-2"></i>
              nbflower@emirates.net.ae
            </p>
            <div className="d-flex">
              <a href={socialLinks.twitter} className="me-3 text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={socialLinks.facebook} className="me-3 text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={socialLinks.youtube} className="me-3 text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href={socialLinks.instagram} className="me-3 text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-4">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/swimmingPool"
                  className="text-white text-decoration-none"
                >
                  Swimming Pool Services
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contactUs"
                  className="text-white text-decoration-none"
                >
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/swimmingPool"
                  className="text-white text-decoration-none"
                >
                  Swimming Pool Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-dark py-3">
        <div className="container text-center">
          <p className="m-0 text-white">
            &copy; {new Date().getFullYear()} The Nature Beauty Flowers. All
            Rights Reserved.
          </p>
          <p className="m-0 text-white">Developed by SAJID ISHAQ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
