import React, { useState } from 'react';
import axios from 'axios';

const ReferForm = () => {
  const [formData, setFormData] = useState({
    membership: 'nonMember',
    referredBy: '',
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    gender: '',
    referralText: '',
    referralBusiness: '',
    referralDate: '',   // <- fix here
  agreed: ''      // <- fix here
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/referrals', formData);
      alert('Referral submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 container" style={{ margin: '0 auto' }}>
      {/* Membership */}
      <div className="mb-3">
        <label className="form-label d-block">Membership</label>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="membership" id="bniMember" value="bniMember" onChange={handleChange} checked={formData.membership === 'bniMember'} />
          <label className="form-check-label" htmlFor="bniMember">BNI member</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="membership" id="nonMember" value="nonMember" onChange={handleChange} checked={formData.membership === 'nonMember'} />
          <label className="form-check-label" htmlFor="nonMember">non member</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Referred By</label>
        <input type="text" name="referredBy" className="form-control" placeholder="Enter name" value={formData.referredBy} onChange={handleChange} />
      </div>

      {/* Referrer Name */}
      <div className="mb-3">
        <label className="form-label">Referrer name</label>
        <input type="text" name="referrerName" className="form-control" placeholder="Enter name" value={formData.referrerName} onChange={handleChange} />
      </div>

      {/* Referrer Email */}
      <div className="mb-3">
        <label className="form-label">Referrer Email ID</label>
        <input type="email" name="referrerEmail" className="form-control" placeholder="Enter email" value={formData.referrerEmail} onChange={handleChange} />
      </div>

      {/* Referrer Phone */}
      <div className="mb-3 d-flex gap-2">
        <label className="form-label">Referrer Phone Number</label>
        <input type="tel" name="referrerPhone" className="form-control" placeholder="Enter phone number" value={formData.referrerPhone} onChange={handleChange} />
      </div>

      {/* Gender */}
      <div className="mb-3 d-flex align-items-center gap-4">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
      </div>

      {/* Business Text */}
      <div className="mb-3">
        <label className="form-label">Write Referral <strong>Business®</strong> Anything</label>
        <input
          type="text"
          name="referralText"
          className="form-control"
          placeholder="Enter your text here"
          value={formData.referralText}
          onChange={handleChange}
        />
      </div>

      {/* Business Dropdown */}
      <div className="mb-3">
        <label className="form-label">Select a Referral <strong>Business®</strong> below</label>
        <select
          className="form-select"
          name="referralBusiness"
          value={formData.referralBusiness}
          onChange={handleChange}
        >
          <option value="">Select Referral Business®</option>
          <option value="Business 1">Business 1</option>
          <option value="Business 2">Business 2</option>
        </select>
      </div>

      {/* Date Picker */}
      <div className="mb-3">
        <label className="form-label">Choose a Date</label>
        <input type="date" name="referralDate" className="form-control" value={formData.referralDate} onChange={handleChange} />
      </div>

      {/* Agreement Checkbox */}
      <div className="mb-3 form-check">
        <input type="checkbox" name="agreed" className="form-check-input" id="exampleCheck" checked={formData.agreed} onChange={handleChange} />
        <label className="form-check-label" htmlFor="exampleCheck">
          In publishing and graphic design, Lorem ipsum is a placeholder text...
        </label>
      </div>

      <button type="submit" className="btn btn-danger w-100">Refer Now</button>
    </form>
  );
};

export default ReferForm;
