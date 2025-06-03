// App.js (or HomePageLayout.jsx)
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar.js";
import Dashboard from "./Dashboard.jsx";
import MembersList from "./Memberdet/Memberdet.jsx";
import Referrals from "./Referrals/Referrals.jsx";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "members":
        return <MembersList />;
      case "activities":
        return <Referrals/>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container-fluid main">
      <div>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div style={{  padding: "20px", width: "100%" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
