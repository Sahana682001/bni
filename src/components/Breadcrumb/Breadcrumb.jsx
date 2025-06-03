import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import './Breadcrumb.css';

const Breadcrumbs = ({ currentPage }) => {
  const location = useLocation();
  const fromPath = location.state?.from;

  const basePath = fromPath?.startsWith('/dashboard') ? '/dashboard' : '/';
  const baseLabel = basePath === '/dashboard' ? 'Dashboard' : 'Homepage';

  return (
    <div className="breadcrumbs container">
      <Link to={basePath} className="breadcrumb-link">
        {baseLabel}
      </Link>

      <FiChevronRight className="breadcrumb-separator" />

      <span className="breadcrumb-current">
        {currentPage}
      </span>
    </div>
  );
};

export default Breadcrumbs;
