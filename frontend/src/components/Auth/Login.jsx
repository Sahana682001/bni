import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import loginlogo from '../../asset/loginlogo.png';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="container login-page">
      <div className="row vh-100">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block login-image" />

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="login-box">
            <h2 className="brand-name text-center mb-4">
              <img src={loginlogo} alt="loginlogo" className="img-fluid" style={{ maxHeight: '100px' }} />
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex gap-3">
                <button type="submit" className="btn btn-danger w-50">Sign In</button>
                <button type="button" className="btn btn-outline-secondary w-50" onClick={handleBackHome}>
                  Back to Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
