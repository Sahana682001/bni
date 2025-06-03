import React from 'react';
import './memberDetail.css';

// Sample image imports (you would import actual images in a real app)
import defaultProfile from '../asset/avatar.jpg';

function MemberDetail({ member, onBack, onContact }) {
  // Use member.image if available, otherwise use default profile
  const profileImage = member.image || defaultProfile;
  
  return (
    <div className="member-detail">
      <button onClick={onBack} className="back-button">
        &larr; Back to Members
      </button>
      
      <div className="detail-content">
        <div className="profile-header">
          <div className="profile-image-container">
            <img 
              src={profileImage} 
              alt={member.name} 
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = defaultProfile;
              }}
            />
          </div>
          <div className="profile-info">
            <h2>{member.name}</h2>
            <p className="title-company">{member.title} at {member.company}</p>
            <p className="industry">{member.industry}</p>
          </div>
        </div>
        
        <div className="detail-body">
          <h3>About</h3>
          <p>{member.bio}</p>
          
          <h3>Contact Information</h3>
          <ul className="contact-info">
            <li>Email: {member.email}</li>
            <li>Phone: {member.phone}</li>
          </ul>
        </div>
        
        <button onClick={onContact} className="contact-button">
          Contact {member.name}
        </button>
      </div>
    </div>
  );
}

export default MemberDetail;