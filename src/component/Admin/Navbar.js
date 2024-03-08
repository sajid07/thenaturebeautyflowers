import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/Admin/Admin" className="navbar-brand">The Nature Beauty Flowers</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                <button type="button" className="btn btn-primary">Create Admin</button>
                            </Link>
                        </li>

                        <li className="nav-item">
                            {!localStorage.getItem('token') ? (
                                <Link to='/login' className='nav-link'>
                                    <button className='btn btn-primary'>Login</button>
                                </Link>
                            ) : (
                                <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
