import NavBar from '../Admin/Navbar';
import SideNavbar from './SideNavbar';
import productContext from '../../context/products/productContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const Admin = () => {
  const context = useContext(productContext);
  const { fetchProduct, products } = context;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (localStorage.getItem('token')) {
          await fetchProduct();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <RingLoader color="#fc031c" size={150} loading={loading} />
        </div>
      ) : (
        <>
          {/* Your existing content goes here */}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
          <script src="js/scripts.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
          <script src="assets/demo/chart-area-demo.js"></script>
          <script src="assets/demo/chart-bar-demo.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
          <script src="js/datatables-simple-demo.js"></script>
        </>
      )}
            <SideNavbar />

    </>
  );
};

export default Admin;
