import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaGlobe, FaShare } from 'react-icons/fa';
import './MemberProfileCard.css'; // 👈 CSS file

const MemberProfileCard = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch member');
        }
        const data = await response.json();
        setMember(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    if (id) {
      fetchMember();
    }
  }, [id]);

  if (isLoading) return <div className="loading">Loading member data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!member) return <div className="not-found">Member not found</div>;

  return (
    <div className="member-profile-card container p-4">
      <div className='row align-items-center'>
        <div className='col-md-4'>
          <img src={member.personImage} alt={member.personName}></img>
        </div>
        <div className='col-md-4'>
       <div className="card-details">
          <div>
            <div className="business-name">{member.businessName}</div>
            <div className="business-category">{member.personName}</div>
            <div className="category"> {member.category}</div>
          </div>

          <div className="detail-row">
            <span className="detail-label">Company: </span>
            <span className="detail-value">
              {" "}
              {member.companyName || "Owner Name"}
            </span>
          </div>

        
            <div className="detail-row">
              <span className="detail-label">Role: </span>
              <span className="detail-value">{member.role}</span>
            </div>
         

          {member.inductions && (
            <div className="detail-row">
              <span className="detail-label">Inductions: </span>
              <span className="detail-value">{member.inductions}</span>
            </div>
          )}

          {member.referrals && (
            <div className="detail-row">
              <span className="detail-label">Referrals: </span>
              <span className="detail-value">{member.referrals}</span>
            </div>
          )}

          {member.visitors && (
            <div className="detail-row">
              <span className="detail-label">Visitors: </span>
              <span className="detail-value">{member.visitors}</span>
            </div>
          )}

          {member.businessGiven && (
            <div className="detail-row">
              <span className="detail-label">Total Business Given: </span>
              <span className="detail-value">{member.businessGiven}</span>
            </div>
          )}

          {member.businessGiveninRupees && (
            <div className="detail-row">
              <span className="detail-label">Business Given in Rupees: </span>
              <span className="detail-value">
                {" "}
                {member.businessGiveninRupees || "6"}
              </span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Phone: </span>
            <span className="detail-value">
              {" "}
              {member.phoneNumber || "+918867808334"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email: </span>
            <span className="detail-value">
              {" "}
              {member.emailId || "kumarp55024@gmail.com"}
            </span>
          </div>

        <div className="detail-row">
  <span className="detail-label">Web: </span>
  <a
    href={
      member.website?.startsWith("http")
        ? member.website
        : `https://${member.website || "www.praveendiamondsjewellery.com"}`
    }
    className="detail-value link"
    target="_blank"
    rel="noopener noreferrer"
  >
    {member.website || "www.praveendiamondsjewellery.com"}
  </a>
</div>

        </div>
        </div>
        <div className='col-md-4'>
        <img src={member.businessLogo} alt={member.companyName}></img>
        </div>
      </div>
    </div>
  );
};

export default MemberProfileCard;
