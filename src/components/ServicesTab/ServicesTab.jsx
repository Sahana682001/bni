import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './ServicesTab.css';

const ServicesTab = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!member?.services?.length) return <div>No services found</div>;

  return (
    <div className="row">
      {member.services.map((service, index) => {
        
const Icon = FaIcons[service.icon] || FaIcons.FaCogs;
        return (
          <div key={index} className="col-md-4 mb-4" >
            <div className="text-center border p-3 rounded shadow-sm" style={{height: "280px"}}>
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  backgroundColor: '#D32F2F',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                }}
              >
                <Icon size={36} color="#fff" />
              </div>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default ServicesTab;
