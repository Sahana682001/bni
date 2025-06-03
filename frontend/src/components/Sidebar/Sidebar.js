import React from "react";
import { FaTachometerAlt, FaUsers, FaRegHandshake } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2>BNI® Platform</h2>
      <ul>
        <li
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </li>

        <li
          className={activeTab === "members" ? "active" : ""}
          onClick={() => setActiveTab("members")}
        >
          <FaUsers className="me-2" />
          Business® Members
        </li>

        <li
          className={activeTab === "activities" ? "active" : ""}
          onClick={() => setActiveTab("activities")}
        >
          <FaRegHandshake className="me-2" />
          Referral Form Details
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
