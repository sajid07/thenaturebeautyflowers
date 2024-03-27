import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

const ShowProjects = () => {
  const [projects, setProjects] = useState([]);
  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.get("/api/project/fetchallprojects");
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <style>
        {`
          .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }

          .gallery-item {
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s;
            cursor: pointer;
            border-radius: 8px;
            background-color: #fff;
          }

          .gallery-item:hover {
            transform: scale(2.05);
          }

          .gallery-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
          }

          .gallery-content {
            padding: 16px;
          }

          h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
          }

          p {
            margin-top: 8px;
            font-size: 14px;
            color: #666;
          }

          h2 {
            text-align: center;
            margin: 50px;
            color: red ;
          }
        `}
      </style>
      <div className="section-title">
        <h2>Portfolio</h2>
        <p>Explore our stunning swimming pool projects...</p>
      </div>

      <div className="container">
        <div className="image-gallery">
          {projects.map((project) => (
            <div key={project._id} className="gallery-item">
              {project.picture && (
                <img
                  src={project.picture}
                  alt={project.name}
                  className="gallery-image"
                />
              )}
              <div className="gallery-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ShowProjects;
