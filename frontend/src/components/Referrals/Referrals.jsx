import React, { useEffect, useState } from 'react';
import './Referrals.css';

const ReferralTable = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetch('/api/referrals')
      .then((res) => res.json())
      .then((data) => setReferrals(data))
      .catch((err) => console.error('Error fetching referrals:', err));
  }, []);

  return (
    <div className="referral-table-container">
      <h2>Referral List</h2>
      <div className="table-wrapper">
      <table className="members-table">
        <thead>
          <tr>
            <th>Membership</th>
              <th>Referred By</th>
            <th>Referrer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Referral Text</th>
            <th>Referral Business</th>
            {/* <th>Agreement</th> */}
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((ref, index) => (
            <tr key={index}>
              <td>{ref.membership}</td>
              <td>{ref.referredBy}</td>
              <td>{ref.referrerName}</td>
              <td>{ref.referrerEmail}</td>
              <td>{ref.referrerPhone}</td>
              <td>{ref.gender}</td>
              <td>{ref.referralText}</td>
              <td>{ref.referralBusiness}</td>
           
              {/* <td>{ref.agreement ? 'Yes' : 'No'}</td> */}
              <td>{new Date(ref.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default ReferralTable;
