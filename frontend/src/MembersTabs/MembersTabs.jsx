import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./MembersTabs.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MemberImage = React.memo(({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="image-container">
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        loading="lazy"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      {hasError && (
        <div className="image-alt-fallback">
          <span>{alt}</span>
        </div>
      )}
    </div>
  );
});

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("Leadership Team");
  const [openFaqId, setOpenFaqId] = useState(null);
  const [visibleFaqs, setVisibleFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      { display: "Leadership Team", key: "leadershipTeam" },
      { display: "Our Members", key: "ourMembers" },
      { display: "Gold Members", key: "goldMembers" },
      { display: "Green hero", key: "greenHero" },
      { display: "Best Performers", key: "bestPerformers" },
      { display: "Crorepathi Givers", key: "crorePathi" },
    ],
    []
  );

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/members");
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchMembers();
  }, []);

  const activeTabKey = useMemo(() => {
    return tabs.find((tab) => tab.display === activeTab)?.key || "";
  }, [activeTab, tabs]);

  const filteredMembers = useMemo(() => {
    let result = members.filter((member) =>
      member.tabs?.includes(activeTabKey)
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (member) =>
          member.personName?.toLowerCase().includes(term) ||
          member.businessName?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [members, activeTabKey, searchTerm]);

  const [selectedTab, setSelectedTab] = useState("leadershipTeam");

  useEffect(() => {
    if (["Leadership Team", "Our Members"].includes(activeTab)) {
      const grouped = {};
      filteredMembers.forEach((member) => {
        member.faqGroups?.forEach((group) => {
          if (group.tab === activeTabKey) {
            const key = group.faqTitle;
            if (!grouped[key]) {
              grouped[key] = {
                question: key,
                members: [],
                id: `${activeTabKey}-${key}`,
              };
            }
            grouped[key].members.push(member);
          }
        });
      });
      setVisibleFaqs(Object.values(grouped));
    } else {
      setVisibleFaqs([]);
    }
    setOpenFaqId(null);
  }, [activeTab, activeTabKey, filteredMembers]);

  const togglePanel = useCallback((faqId) => {
    setOpenFaqId((prevId) => (prevId === faqId ? null : faqId));
  }, []);

  const closeFaq = useCallback(
    (faqId) => {
      setVisibleFaqs((prev) => prev.filter((faq) => faq.id !== faqId));
      if (openFaqId === faqId) {
        setOpenFaqId(null);
      }
    },
    [openFaqId]
  );

  const renderMemberCard = useCallback(
    (member) => (
      <div className="jewelry-card">
        <div className="card-images-container">
          <div className="image-wrapper">
            <MemberImage
              src={member.personImage}
              alt={member.personName || "Owner"}
            />
          </div>

          <div className="image-wrapper">
            <MemberImage src={member.businessLogo} alt="Company Logo" />
          </div>
        </div>

        <div className="card-details">
          <div>
            <div className="business-name">{member.businessName}</div>
            <div className="business-category">{member.personName}</div>
            <div className="category"> {member.category}</div>
          </div>

          <div className="detail-row">
            <span className="detail-label">Company: </span>
            <span className="detail-value">
              {" "}
              {member.companyName || "Owner Name"}
            </span>
          </div>

          {activeTabKey === "leadershipTeam" && member.role && (
            <div className="detail-row">
              <span className="detail-label">Role: </span>
              <span className="detail-value">{member.role}</span>
            </div>
          )}

          {member.inductions && (
            <div className="detail-row">
              <span className="detail-label">Inductions: </span>
              <span className="detail-value">{member.inductions}</span>
            </div>
          )}

          {member.referrals && (
            <div className="detail-row">
              <span className="detail-label">Referrals: </span>
              <span className="detail-value">{member.referrals}</span>
            </div>
          )}

          {member.visitors && (
            <div className="detail-row">
              <span className="detail-label">Visitors: </span>
              <span className="detail-value">{member.visitors}</span>
            </div>
          )}

          {member.businessGiven && (
            <div className="detail-row">
              <span className="detail-label">Total Business Given: </span>
              <span className="detail-value">{member.businessGiven}</span>
            </div>
          )}

          {member.businessGiveninRupees && (
            <div className="detail-row">
              <span className="detail-label">Business Given in Rupees: </span>
              <span className="detail-value">
                {" "}
                {member.businessGiveninRupees || "6"}
              </span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Phone: </span>
            <span className="detail-value">
              {" "}
              {member.phoneNumber || "+918867808334"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email: </span>
            <span className="detail-value">
              {" "}
              {member.emailId || "kumarp55024@gmail.com"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Web: </span>
            <a
              href={
                member.website?.startsWith("http")
                  ? member.website
                  : `https://${
                      member.website || "www.praveendiamondsjewellery.com"
                    }`
              }
              className="detail-value link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {member.website || "www.praveendiamondsjewellery.com"}
            </a>
          </div>
        </div>

        <div className="card-buttons">
          <button
            className="view-detail-btn"
            onClick={() => {
              if (!member._id) {
                console.error("Member ID is missing:", member);
                return;
              }
              navigate(`/members/${member._id}`);
            }}
          >
            View Detail
          </button>
          <button className="referral-btn">Referral</button>
        </div>
      </div>
    ),
    []
  );

  const renderFAQItem = useCallback(
    (faq, index) => (
      <div
        key={faq.id}
        className="accordion-item my-3 border rounded shadow-sm"
      >
        <button
          className="accordion-header w-100 text-start p-3 bg-white border-0 fw-bold d-flex justify-content-between align-items-center"
          onClick={() => togglePanel(faq.id)}
          aria-expanded={openFaqId === faq.id}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="faq-number text-danger">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <span className="faq-title text-uppercase">{faq.question}</span>
          </div>
          <button
            className={`btn btn-circle ${
              openFaqId === faq.id ? "btn-danger" : "btn-outline-secondary"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (openFaqId === faq.id) {
                closeFaq(faq.id);
              } else {
                togglePanel(faq.id);
              }
            }}
            aria-label={
              openFaqId === faq.id
                ? `Close ${faq.question}`
                : `Open ${faq.question}`
            }
          >
            {openFaqId === faq.id ? "×" : "+"}
          </button>
        </button>
        {openFaqId === faq.id && (
          <div
            className="accordion-body p-3 show"
            style={{
              maxHeight: "600px", // Adjust based on your layout
              overflowY: "auto",
            }}
          >
            <div className="row">
              {faq.members.map((member) => (
                <div
                  className="col-md-4 mb-3"
                  key={`${faq.id}-${member.id || member.personName}`}
                >
                  {renderMemberCard(member)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    [openFaqId, togglePanel, closeFaq, renderMemberCard]
  );

  const renderFAQ = useCallback(
    (faqs) => (
      <div className="accordion">
        {faqs.map((faq, index) => renderFAQItem(faq, index))}
      </div>
    ),
    [renderFAQItem]
  );

  const renderCards = useCallback(
    (membersToRender) => (
      <div className="row mt-4">
        {membersToRender.map((member, index) => (
          <div className="col-md-4 mb-4" key={member.id || index}>
            {renderMemberCard(member)}
          </div>
        ))}
      </div>
    ),
    [renderMemberCard]
  );

  return (
    <div className="members-tab-container">
      <div className="tab-wrapper bg-white">
        <div className="nav nav-tabs custom-tabs d-flex justify-content-around">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`nav-link custom-tab ${
                activeTab === tab.display ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.display)}
            >
              {tab.display}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap my-4 container">
          <h2 className="member-title m-0">
            <span className="red-bold">
              Business<sup>®</sup>
            </span>{" "}
            Members of our Network
          </h2>
          <div className="search-box shadow-sm">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Find your member"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon text-danger" />
          </div>
        </div>

        <div className="tab-content container">
          {["Leadership Team", "Our Members"].includes(activeTab) &&
          visibleFaqs.length > 0 ? (
            renderFAQ(visibleFaqs)
          ) : filteredMembers.length > 0 ? (
            renderCards(filteredMembers)
          ) : (
            <p className="text-center py-4">
              No members found in this category
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
