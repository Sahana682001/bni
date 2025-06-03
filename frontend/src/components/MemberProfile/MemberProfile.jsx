// MemberProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumb/Breadcrumb';
import MemberProfileCard from '../MemberProfileCard/MemberProfileCard';
import Stats from '../Stats/Stats'
import Tabs from '../Tabs/Tabs';

const MemberProfile = () => {
  // This should properly extract the ID from the URL
  const { id } = useParams(); // Changed from memberId to id
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Extracted ID from URL:', id); // Debug

  useEffect(() => {
    if (!id) {
      setError('No ID found in URL');
      setLoading(false);
      return;
    }

    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!response.ok) throw new Error('Member not found');
        const data = await response.json();
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]); // Changed dependency from memberId to id

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!member) return <div>Member not found</div>;

  return (
    <div className="member-profile " >
        <Breadcrumbs currentPage={member.personName} />
        <MemberProfileCard/>
        <Stats memberId={id}/>
        <Tabs/>
    </div>
  );
};

export default MemberProfile;