import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaGlobe, FaShare } from 'react-icons/fa';
import './AboutusTab.css'; // 👈 CSS file

const AboutusTab = () => {
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
    <div className="aboutus">
      <div className='d-flex mx-auto mt-5'>
        <img src={member.businessImg} alt={member.businessName} className='d-flex mx-auto'/>
      </div>
   
      <div className='text mt-5'>
          
          <h1 className='text-center'>{member.aboutHeading}</h1>
          <p className='para text-center mt-4'>{member.aboutPara}</p>
      </div>
    </div>
  );
};

export default AboutusTab;
