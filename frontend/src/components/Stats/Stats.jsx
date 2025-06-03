import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Stats.css'; // Create a Stats.css file

const Stats = () => {
  const { id } = useParams(); // Get id from URL

  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStatistics(data.statistics); // Important: Access the `statistics` array
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStatistics();
    }
  }, [id]);

  if (isLoading) return <div className="loading">Loading statistics...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!statistics || statistics.length === 0) return <div className="not-found">Statistics not found</div>;

  return (
    <div className="stats-card">
      {statistics.map((stat, index) => (
        <div className="stat-item" key={index}>
          <h2>{stat.number}</h2>
          <p>{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
