import React, { useEffect, useState, useRef, useContext } from 'react';
import { FiLock } from 'react-icons/fi';
import logo from '../../asset/logo.png';
import adminlogo from '../../asset/adminlogo.png'
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { adminn, logout } = useContext(AuthContext);
    
  const [admin, setadmin] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessCategory: '',
    companyName: '',
    dob: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    profileImage: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const profileModalRef = useRef(null); // modal ref
  
  const fullWidthRoutes = ['/login', '/dashboard'];
  const isFullWidth = fullWidthRoutes.includes(location.pathname);

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/auth/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setadmin(data);
        localStorage.setItem('adminData', JSON.stringify(data));

        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          businessCategory: data.businessCategory || '',
          companyName: data.companyName || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          description: data.description || '',
          profileImage: data.profileImage || ''
        });
      } catch (err) {
        console.error('Failed to fetch admin:', err);
      }
    };

    fetchAdmin();
  }, []);


  // If on /dashboard, show only a simplified header
  if (location.pathname === '/dashboard') {
    return (
      <header className={`header dashboard-header ${isFullWidth ? 'full-width' : ''}`}
>
        <img src={adminlogo} alt="BNI Logo" className="logo" />
        <div className="admin-info">
          {admin && (
            <>
              
              <img
                src={admin.profileImage || '/default-avatar.png'}
                alt="Profile"
                className="admin-avatar"
                onClick={() => profileModalRef.current?.showModal()}
              />
              <span className="admin-name" onClick={() => profileModalRef.current?.showModal()}>{admin.firstName} {admin.lastName} <br/>Admin</span> 
            </>
          )}
        </div>

        {/* Profile Modal */}
        <dialog ref={profileModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Admin Profile</h3>
            <img src="https://revulonpaints.com/bniImages/profiles/rk.png" alt='admin profile'></img>
            <p><strong>Name:</strong> {admin?.firstName} {admin?.lastName}</p>
            <p><strong>Email:</strong> {admin?.email}</p>
            <p><strong>Phone:</strong> {admin?.phone}</p>
            <p><strong>Company:</strong> {admin?.companyName}</p>
            <p><strong>Category:</strong> {admin?.businessCategory}</p>
            <p><strong>Date of Birth:</strong> {admin?.dob?.slice(0, 10)}</p>
             <p><strong>Logo:</strong>  <img src="https://revulonpaints.com/bniImages/logos/rk.png" alt='admin profile'></img></p>
            <p><strong>Website:</strong> <a href={admin?.website} target="_blank" rel="noreferrer">{admin?.website}</a></p>
            <p><strong>Description:</strong> {admin?.description}</p>

            <form method="dialog" className=" mt-4">
              <button className="btn" onClick={() => {
    profileModalRef.current?.close(); // close modal first
    logout();                         // then log out
  }}>Logout</button>
            </form>

            <form method="dialog" className=" mt-4">
              <button className="btn">Close</button>
            </form>
          </div>
        </dialog>
      </header>
    );
  }

  // Default header for all other routes
  return (
    <header className="header container">
      <div className="left">
        <img src={logo} alt="BNI Logo" className="logo" />
      </div>

      <div className="right">
        {location.pathname === '/dashboard' && admin ? (
          <div className="admin-info">
            <span className="admin-name">
              {admin.firstName} {admin.lastName}
            </span>
            <img
              src={admin.profileImage || '/default-avatar.png'}
              alt="Profile"
              className="admin-avatar"
              onClick={() => profileModalRef.current?.showModal()}
            />
          </div>
        ) : (
          <>
            <button className="login-btn grey-color" onClick={() => navigate('/login')}>
              <FiLock className="icon" />
              Login
            </button>
            <button className="signup-btn">
              Sign up for Members
            </button>
          </>
        )}
      </div>

      {/* profile modal */}
      <dialog ref={profileModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Admin Profile</h3>
          <p><strong>Name:</strong> {admin?.firstName} {admin?.lastName}</p>
          <p><strong>Email:</strong> {admin?.email}</p>
          <p><strong>Phone:</strong> {admin?.phone}</p>
          <p><strong>Company:</strong> {admin?.companyName}</p>
          <p><strong>Category:</strong> {admin?.businessCategory}</p>
          <p><strong>Date of Birth:</strong> {admin?.dob?.slice(0, 10)}</p>
          <p><strong>Website:</strong> <a href={admin?.website} target="_blank" rel="noreferrer">{admin?.website}</a></p>
          <p><strong>Description:</strong> {admin?.description}</p>
          <form method="dialog" className="modal-backdrop mt-4">
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
