import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [projects, setProjects] = useState([]);
  const host = env.process.BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.get("/api/project/fetchallprojects");
        setProjects(projectsResponse.data.slice(0, 4));
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
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.2s;
            cursor: pointer;
            background-color: #fff;
          }

          .gallery-item:hover {
            transform: scale(1.05);
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

          .see-more-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            text-decoration: none;
            color: #FF5733;
            font-size: 20px;
          }
        `}
      </style>

      <hr />
      <h2
        style={{ textAlign: "center", color: "#007bff", marginBottom: "30px" }}
      >
        Projects Gallery
      </h2>
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
        <Link to="/showProject" className="see-more-link">
          See More
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default List;
