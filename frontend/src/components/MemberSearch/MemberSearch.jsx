import React, { useState, useEffect } from 'react';

const MemberSearch = ({ members }) => {
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const filtered = members.filter((member) => {
      const nameMatch = member.personName.toLowerCase().includes(searchName.toLowerCase());
      const categoryMatch = member.businessCategory.toLowerCase().includes(searchCategory.toLowerCase());
      return nameMatch && categoryMatch;
    });

    setFilteredMembers(filtered);
  }, [searchName, searchCategory, members]);

  return (
    <div className="member-search-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <div className="results">
        {filteredMembers.map((member) => (
          <div key={member._id} className="member-card">
            <h3>{member.personName}</h3>
            <p>{member.businessCategory}</p>
            <p>{member.companyName}</p>
            {/* Add other fields as needed */}
          </div>
        ))}
        {filteredMembers.length === 0 && <p>No matching members found.</p>}
      </div>
    </div>
  );
};

export default MemberSearch;
