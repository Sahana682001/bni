import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './GalleryTab.css';

const GalleryTab = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!response.ok) throw new Error('Failed to fetch member');
        const data = await response.json();
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchMember();
  }, [id]);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + member.photos.length) % member.photos.length);
  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % member.photos.length);

  if (isLoading) return <div className="loading">Loading member data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!member) return <div className="not-found">Member not found</div>;

  return (
    <div className="galley">
      <h1 className='mt-3 text-center'>Explore Our Photo Wall</h1>
      <div className="row mt-5 container d-flex mx-auto justify-content-center">
        {member.photos.map((photo, index) => (
          <div className="col-md-4 mt-5" key={index}>
            <img
              src={photo}
              alt={member.businessName}
              className="img-fluid gallery-image"
              onClick={() => openModal(index)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox">
          <button className="close-btn" onClick={closeModal}><FaTimes /></button>
          <button className="nav-btn left" onClick={prevImage}><FaChevronLeft /></button>
          <img src={member.photos[selectedIndex]} alt={`Selected ${selectedIndex}`} className="lightbox-image" />
          <button className="nav-btn right" onClick={nextImage}><FaChevronRight /></button>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
