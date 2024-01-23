import React, { useState, useEffect } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/project/fetchallprojects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Project Gallery</h1>
      <div style={styles.gallery}>
        {projects.map((project) => (
          <div style={styles.projectCard} key={project._id}>
            <img src={project.picture} alt={project.name} style={styles.projectImage} />
            <div style={styles.projectInfo}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
            <button style={styles.deleteButton} onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  projectCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  projectImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  projectInfo: {
    padding: '16px',
    flex: '1',
  },
  deleteButton: {
    width: '100%',
    backgroundColor: '#ff6347',
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '0 0 8px 8px',
    cursor: 'pointer',
  },
};

export default ProjectList;
