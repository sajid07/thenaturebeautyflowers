import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [projects, setProjects] = useState([]);
  const host = process.env.REACT_APP_BASE_URI;
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
            cursor: pointer;
            background-color: #fff;
            transform: translateY(30px);
            transition: transform 0.5s ease;
          }

          .gallery-item:hover {
            transform: scale(1.05) translateY(0);
          }

          .gallery-item:hover img {
            transform: scale(1.1);
          }

          .gallery-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
            transition: transform 0.5s ease;
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
      <section id="services" class="services">
        <div class="container" data-aos="fade-up" data-wow-delay="100">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p className="section-title">
              Explore our stunning swimming pool projects...
            </p>
          </div>
          <div className="container">
            <div className="image-gallery">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="gallery-item"
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                    transform: "translateY(0)",
                  }}
                >
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
        </div>
      </section>
    </div>
  );
};

export default List;
