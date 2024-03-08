// SocialIcons.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const SocialIcons = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    googleMap: "",
  });
  const host = env.process.BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    // Fetch data from the server and update the state
    const fetchData = async () => {
      try {
        const response = await api.get("/api/socialLink/links");
        const linksData = response.data;
        setSocialLinks(linksData);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchData();
  }, [api]);
  // eslint-disable-next-line
  {
    console.log(socialLinks);
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "60%",
        right: "20px",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
        <img
          src="img/social/y.png"
          alt="YouTube"
          style={{ width: "40px", margin: "0 5px" }}
        />
      </a>
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
        <img
          src="img/social/fb.png"
          alt="Facebook"
          style={{ width: "40px", margin: "0 5px" }}
        />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
        <img
          src="img/social/in.png"
          alt="LinkedIn"
          style={{ width: "40px", margin: "0 5px" }}
        />
      </a>
      <a href={socialLinks.googleMap} target="_blank" rel="noopener noreferrer">
        <img
          src="img/social/map.png"
          alt="Google Maps"
          style={{ width: "40px", margin: "0 5px" }}
        />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        <img
          src="img/social/t.png"
          alt="Twitter"
          style={{ width: "40px", margin: "0 5px" }}
        />
      </a>
    </div>
  );
};

export default SocialIcons;
