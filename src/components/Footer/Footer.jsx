import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const fullWidthRoutes = ['/login', '/dashboard'];
  const isFullWidth = fullWidthRoutes.includes(location.pathname);

  return (
    <div className='footer'>
      <footer
        className="custom-footer text-light py-3"
        style={{ width: isFullWidth ? '100%' : '1080px' }}
      >
        <div className="container text-center">
          © 2025 <strong>bni-india.in</strong> All rights reserved. Designed & Developed by <strong>DIGIWORQ</strong>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
