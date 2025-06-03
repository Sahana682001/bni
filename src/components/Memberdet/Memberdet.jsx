import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Memberdet.css";
import MemberForm from "../MemberForm/MemberForm.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Leadership Team");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const membersPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
    fetchCategories();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/members");
      if (!response.ok) throw new Error("Network response was not OK");

      const data = await response.json();
      const membersWithTabs = data.map((member) => ({
        ...member,
        tabs: member.tabs || [],
      }));

      setMembers(membersWithTabs);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/members/categories");
      const data = await res.json();
      console.log("Fetched categories:", data); // Add this
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Unexpected category data format:", data);
        setCategories([]); // fallback
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]); // fallback
    }
  };

  const handleAddMember = async (newMember) => {
    try {
      const memberToAdd = {
        ...newMember,
        tabs: newMember.tabs || [],
      };

      const response = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberToAdd),
      });

      if (!response.ok) throw new Error("Failed to save member");

      toast.success("Member created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      const savedMember = await response.json();
      setMembers((prev) => [...prev, savedMember]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Something went wrong while saving the member.");
    }
  };

  const handleUpdateMember = async (updatedMember) => {
    if (!updatedMember._id) throw new Error("Member ID is required for update");

    try {
      const response = await fetch(
        `http://localhost:5000/api/members/${updatedMember._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMember),
        }
      );

      if (!response.ok)
        throw new Error((await response.text()) || "Update failed");

      toast.success("Member updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      const updated = await response.json();

      setMembers((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );
      setShowForm(false);
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleEdit = (member) => {
    setSelectedMember({ ...member, tabs: member.tabs || [] });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete member");

      setMembers((prevMembers) => prevMembers.filter((m) => m._id !== id));
      toast.success("Member deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete member.");
    }
  };

  if (loading) return <p>Loading members...</p>;

  // Filter by tab + name + category
  const filteredMembers = members.filter((member) => {
    const memberTabs = member.tabs || [];

    const matchesTab = (() => {
      switch (activeTab) {
        case "Leadership Team":
          return memberTabs.includes("leadershipTeam");
        case "Our Members":
          return memberTabs.includes("ourMembers");
        case "Gold Members":
          return memberTabs.includes("goldMembers");
        case "Green hero":
          return memberTabs.includes("greenHero");
        case "Best Performers":
          return memberTabs.includes("bestPerformers");
        case "Crorepathi Givers":
          return memberTabs.includes("crorePathi");
        default:
          return true;
      }
    })();

    const matchesCategory = filterCategory
      ? member.businessCategory === filterCategory
      : true;

    const matchesName = filterName
      ? member.personName.toLowerCase().includes(filterName.toLowerCase())
      : true;

    return matchesTab && matchesCategory && matchesName;
  });

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#cc0000" : "white",
      color: state.isFocused ? "white" : "black",
      cursor: "pointer",
      // Optional: Prevent red tint when selecting text with mouse
      userSelect: "none",
    }),
    control: (base) => ({
      ...base,
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#cc0000",
      },
      width: "300px", // 👈 Adjust this to your preferred width
      minHeight: "40px",
    }),
    menu: (base) => ({
      ...base,
      width: "300px", // 👈 Match this with the control width
    }),
  };

  return (
    <div className="members-container">
      <h3 style={{ color: "#64676B" }}>
        <span style={{ color: "#cc0000" }}>
          Business<sup>®</sup>
        </span>{" "}
        Members of our Network
      </h3>

      <div className="filter-controls">
        <div className="filter-group d-flex">
          <FaFilter className="filter-icon" />
          <span className="filter-label">Filter By</span>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <Select
            options={categoryOptions}
            value={categoryOptions.find((opt) => opt.value === filterCategory)}
            onChange={(selected) => setFilterCategory(selected.value)}
            styles={customStyles}
          />
        </div>

        <div className="filter-group">
          <button
            className="add-members-btn"
            onClick={() => {
              setSelectedMember(null);
              setIsEditing(false);
              setShowForm(true);
            }}
          >
            <FaPlus /> Add Members
          </button>
        </div>
      </div>

      {showForm && (
        <MemberForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setSelectedMember(null);
            setIsEditing(false);
          }}
          onSubmit={async (formData) => {
            if (isEditing) {
              await handleUpdateMember(formData);
            } else {
              await handleAddMember(formData);
            }
          }}
          selectedMember={isEditing ? selectedMember : null}
          isEditing={isEditing}
        />
      )}

      <div className="tabss-container">
        <div className="tabss">
          {[
            "Leadership Team",
            "Our Members",
            "Gold Members",
            "Green hero",
            "Best Performers",
            "Crorepathi Givers",
          ].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>


<div className="table-wrapper">
      <table className="members-table">
        <thead>
          <tr>
            <th >Image</th>
            <th>Person Name</th>
            <th>Category</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member._id}>
              <td>
                <img
                  src={member.personImage}
                  alt="Profile"
                  className="profile-img"
                />
              </td>
              <td>{member.personName}</td>
              <td>{member.businessCategory}</td>
              <td>{member.businessName}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.emailId}</td>
              <td className="action-buttons">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/members/${member._id}`)}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(member)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteMember(member._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {currentMembers.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No members found for {activeTab}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <div className="pagination">
  <span className="pagination-info">
    Showing {indexOfFirstMember + 1} – {Math.min(indexOfLastMember, filteredMembers.length)} of {filteredMembers.length}
  </span>
  <div className="pagination-controls">
    <button onClick={handlePrev} disabled={currentPage === 1}>
      <FaChevronLeft />
    </button>
    <button onClick={handleNext} disabled={currentPage === totalPages}>
      <FaChevronRight />
    </button>
  </div>
</div>
    </div>
  );
};

export default MembersTable;
