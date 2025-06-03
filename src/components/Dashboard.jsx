import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardGraph from "./DashboardGraph.jsx";
import { FaUsers, FaRegShareSquare, FaChartLine, FaRegClock } from "react-icons/fa";
import "./DashboardStats.css"; // make sure this CSS file exists

const Dashboard = () => {
  
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalActiveMembers, setTotalActiveMembers] = useState(0);
  const [totalInactiveMembers, setTotalInactiveMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, referralsRes, activeRes, inactiveRes] = await Promise.all([
          fetch("http://localhost:5000/api/members"),
          fetch("http://localhost:5000/api/referrals"),
          fetch("http://localhost:5000/api/members/active"),
          fetch("http://localhost:5000/api/members/inactive"),
        ]);

        if (!membersRes.ok || !referralsRes.ok || !activeRes.ok || !inactiveRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const membersData = await membersRes.json();
        const referralsData = await referralsRes.json();
        const activeMembersData = await activeRes.json();
        const inactiveMembersData = await inactiveRes.json();

        setTotalMembers(membersData.length);
        setTotalReferrals(referralsData.length);
        setTotalActiveMembers(activeMembersData.length);
        setTotalInactiveMembers(inactiveMembersData.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Members",
      value: totalMembers,
      icon: <FaUsers />,
      color: "#dcd6f7",
      iconColor: "#6c5ce7"
    },
    {
      label: "Total Referrals Members",
      value: totalReferrals,
      icon: <FaRegShareSquare />,
      color: "#fff4d6",
      iconColor: "#f4a261"
    },
    {
      label: "Active Member",
      value: totalActiveMembers,
      icon: <FaChartLine />,
      color: "#d2f8e5",
      iconColor: "#2ecc71"
    },
    {
      label: "Inactive Members",
      value: totalInactiveMembers,
      icon: <FaRegClock />,
      color: "#ffe2d1",
      iconColor: "#ff6b6b"
    }
  ];

  return (
    <div>
      <h3>Dashboard</h3>
      <div style={{ marginTop: "20px" }} id="dashboard">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="dashboard-stats row">
            {stats.map((stat, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <div className="stat-card d-flex justify-content-between align-items-center p-3 rounded shadow-sm">
                  <div>
                    <div className="text-muted small">{stat.label}</div>
                    <div className="h5 fw-bold">{stat.value}</div>
                  </div>
                  <div
                    className="stat-icon d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: stat.color,
                      color: stat.iconColor
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <DashboardGraph />
      </div>

     
    </div>
  );
};

export default Dashboard;
