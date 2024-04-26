// AdminNavbar.js
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Start the logout timer
      startLogoutTimer();
    }

    // Function to handle user activity
    const handleActivity = () => {
      resetLogoutTimer();
    };

    // Event listeners for various user activities
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      // Cleanup function to remove event listeners
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      clearTimeout(logoutTimeoutRef.current);
    };
  }, [navigate]);

  const startLogoutTimer = () => {
    logoutTimeoutRef.current = setTimeout(logout, 1 * 60 * 1000); // 10 minutes
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimeoutRef.current);
    startLogoutTimer();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    // Clear the logout timer and logout immediately
    clearTimeout(logoutTimeoutRef.current);
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed">
      <div className="container-fluid">
        <Link to="/Admin/Admin" className="navbar-brand">
          The Nature Beauty Flowers
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                <button type="button" className="btn btn-primary">
                  Create Admin
                </button>
              </Link>
            </li>

            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleLogoutClick}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
