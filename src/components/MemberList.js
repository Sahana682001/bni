import React from 'react';
import './memberList.css';

function MemberList({ members, onMemberSelect }) {
  return (
    <div className="member-list">
      <h2>BNI Members</h2>
      <div className="members-grid">
        {members.map(member => (
          <div 
            key={member.id} 
            className="member-card"
            onClick={() => onMemberSelect(member)}
          >
            <h3>{member.name}</h3>
            <p>{member.title} at {member.company}</p>
            <p className="industry">{member.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;