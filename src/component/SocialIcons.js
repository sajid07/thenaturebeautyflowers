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
  const host = process.env.REACT_APP_BASE_URI;
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
  }, []);
  // eslint-disable-next-line

  return (
    <div className="pool-social-links">
      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
        <img src="/img/social/y.png" alt="YouTube" />
      </a>
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
        <img src="/img/social/fb.png" alt="Facebook" />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
        <img src="/img/social/in.png" alt="LinkedIn" />
      </a>
      <a href={socialLinks.googleMap} target="_blank" rel="noopener noreferrer">
        <img src="/img/social/map.png" alt="Google Maps" />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        <img src="/img/social/t.png" alt="Twitter" />
      </a>
    </div>
  );
};

export default SocialIcons;
