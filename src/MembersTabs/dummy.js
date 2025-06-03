import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MembersTabs.css'
import { FaSearch } from 'react-icons/fa';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('Leadership Team');

  const tabs = [
    'Leadership Team',
    'Our Members',
    'Gold Members',
    'Green hero',
    'Best Performers',
    'Crorepathi Givers',
  ];

  useEffect(() => {
    // Fetch members from the backend
    axios.get('http://localhost:5000/api/members')
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className="tab-wrapper bg-white">
        <div className="nav nav-tabs custom-tabs d-flex justify-content-around">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-link custom-tab ${activeTab === tab ? 'active' : ''
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center flex-wrap my-4 container">
        <h2 className="member-title m-0">
          <span className="red-bold">Business<sup>®</sup></span> Members of our network
        </h2>
        <div className="search-box shadow-sm">
          <input
            type="text"
            className="form-control border-0"
            placeholder="Find your member"
          />
          <FaSearch className="search-icon text-danger" />
        </div>
      </div>
        <div className="tab-content p-3">
          <h5>{activeTab}</h5>
          <p>This is the content for <strong>{activeTab}</strong> tab.</p>
        </div>
      </div>
      
      <ul>
        {members.length > 0 ? (
          members.map((member, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {member.personName}</p> 
              <p><strong>Business:</strong> {member.businessName}</p>
            </li>
          ))
        ) : (
          <p>No members found</p>
        )}
      </ul>
    </div>
  );
};

export default MemberList;
