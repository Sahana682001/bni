import React, { useState } from 'react';
import './Tabs.css';
import AboutUs from '../AboutusTab/AboutusTab';
import Gallery from '../GalleryTab/GalleryTab';
import OurServices from '../ServicesTab/ServicesTab';
import Refer from '../ReferForm/ReferForm';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('AboutUs');

  const renderContent = () => {
    switch (activeTab) {
      case 'AboutUs':
        return <AboutUs />;
      case 'Gallery':
        return <Gallery />;
      case 'OurServices':
        return <OurServices />;
      case 'Refer':
        return <Refer />;
      default:
        return <AboutUs />;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button
          className={activeTab === 'AboutUs' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('AboutUs')}
        >
          About us
        </button>
        <button
          className={activeTab === 'Gallery' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('Gallery')}
        >
          Gallery
        </button>
        <button
          className={activeTab === 'OurServices' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('OurServices')}
        >
          Our Services
        </button>
        <button
          className={activeTab === 'Refer' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('Refer')}
        >
          Refer
        </button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
