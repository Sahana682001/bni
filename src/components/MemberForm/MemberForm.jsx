import React, { useEffect, useState } from "react";
import "./MemberForm.css";

const MemberForm = ({ initialData = {}, onSubmit, onSuccess, isOpen, onClose,selectedMember = null, 
  isEditing = false, setShowForm }) => {
 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    tabs: [],
    faqGroups: [],
    isActive: true,
    personImage: "",
    businessLogo: "",
    personName: "",
    businessName: "",
    businessCategory: "",
    businessGiveninRupees: "",
    businessGiven: "",
    referrals: "",
    visitors: "",
    inductions: "",
    category: "",
    companyName: "",
    phoneNumber: "",
    emailId: "",
    role: "",
    website: "",
    businessImg: "",
    aboutHeading: "",
    aboutPara: "",
    statistics: [],
    services: [],
    photos: [],
    ...initialData,
  });

   useEffect(() => {
    if (isEditing && selectedMember) {
      setFormData({
        tabs: Array.isArray(selectedMember.tabs) ? selectedMember.tabs : [],
        faqGroups: Array.isArray(selectedMember.faqGroups) ? selectedMember.faqGroups : [],
        statistics: Array.isArray(selectedMember.statistics) ? selectedMember.statistics : [],
        services: Array.isArray(selectedMember.services) ? selectedMember.services : [],
        photos: Array.isArray(selectedMember.photos) ? selectedMember.photos : [],
        isActive: selectedMember.isActive !== undefined ? selectedMember.isActive : true,
        personImage: selectedMember.personImage || "",
        businessLogo: selectedMember.businessLogo || "",
        personName: selectedMember.personName || "",
        businessName: selectedMember.businessName || "",
        businessCategory: selectedMember.businessCategory || "",
        businessGiveninRupees: selectedMember.businessGiveninRupees || "",
        businessGiven: selectedMember.businessGiven || "",
        referrals: selectedMember.referrals || "",
        visitors: selectedMember.visitors || "",
        inductions: selectedMember.inductions || "",
        category: selectedMember.category || "",
        companyName: selectedMember.companyName || "",
        phoneNumber: selectedMember.phoneNumber || "",
        emailId: selectedMember.emailId || "",
        role: selectedMember.role || "",
        website: selectedMember.website || "",
        businessImg: selectedMember.businessImg || "",
        aboutHeading: selectedMember.aboutHeading || "",
        aboutPara: selectedMember.aboutPara || "",
        _id: selectedMember._id, // Ensure ID is included
      });
    } else {
      // Reset to defaults when adding new member
      setFormData({
         _id: null, // Explicitly null for new members
        tabs: [],
        faqGroups: [],
        statistics: [],
        services: [],
        photos: [],
        isActive: true,
        personImage: "",
        businessLogo: "",
        personName: "",
        businessName: "",
        businessCategory: "",
        businessGiveninRupees: "",
        businessGiven: "",
        referrals: "",
        visitors: "",
        inductions: "",
        category: "",
        companyName: "",
        phoneNumber: "",
        emailId: "",
        role: "",
        website: "",
        businessImg: "",
        aboutHeading: "",
        aboutPara: "",
       
      });
    }
  }, [isEditing, selectedMember]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    handleChange(field, updated);
  };

  const handleAddItem = (field, template) => {
    handleChange(field, [...formData[field], template]);
  };

  const handleRemoveItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    handleChange(field, updated);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    console.log("Submitting form data:", formData); // Debug log
    const savedMember = await onSubmit(formData);
    console.log("Save successful:", savedMember); // Debug log
    onClose();
  } catch (err) {
    console.error("Submission error:", err); // Debug log
    setError(err.message || "Failed to save member. Please check your data and try again.");
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null; // Don’t render if not open

  return (
    <div className="member-form-container">
      {isOpen && (
        <div className="member-form-modal-overlay">
          <div className="member-form-modal">
            <div className="member-form-modal-header">
              <h2>Member Form</h2>
              <button 
                onClick={() => onClose()}
                className="member-form-close-button"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="member-form">
              {/* Basic Information Section */}
              <fieldset className="member-form-section">
                <legend>Basic Information</legend>
                <div className="member-form-grid">
                  <div className="member-form-field">
                    <label>Person Name*</label>
                    <input 
                      type="text"
                      value={formData.personName} 
                      onChange={(e) => handleChange("personName", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Business Name*</label>
                    <input 
                      type="text"
                      value={formData.businessName} 
                      onChange={(e) => handleChange("businessName", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Company Name</label>
                    <input 
                      type="text"
                      value={formData.companyName} 
                      onChange={(e) => handleChange("companyName", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Business Category*</label>
                    <input 
                      type="text"
                      value={formData.businessCategory} 
                      onChange={(e) => handleChange("businessCategory", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Category*</label>
                    <input 
                      type="text"
                      value={formData.category} 
                      onChange={(e) => handleChange("category", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Role*</label>
                    <input 
                      type="text"
                      value={formData.role} 
                      onChange={(e) => handleChange("role", e.target.value)} 
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Contact Information Section */}
              <fieldset className="member-form-section">
                <legend>Contact Information</legend>
                <div className="member-form-grid">
                  <div className="member-form-field">
                    <label>Phone Number*</label>
                    <input 
                      type="tel"
                      value={formData.phoneNumber} 
                      onChange={(e) => handleChange("phoneNumber", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Email*</label>
                    <input 
                      type="email"
                      value={formData.emailId} 
                      onChange={(e) => handleChange("emailId", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Website</label>
                    <input 
                      type="url"
                      value={formData.website} 
                      onChange={(e) => handleChange("website", e.target.value)} 
                    />
                  </div>
                </div>
              </fieldset>

              {/* Business Metrics Section */}
              <fieldset className="member-form-section">
                <legend>Business Metrics</legend>
                <div className="member-form-grid">
                  <div className="member-form-field">
                    <label>Business Given (Rs.)</label>
                    <input 
                      type="text"
                      value={formData.businessGiven} 
                      onChange={(e) => handleChange("businessGiven", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Business Given (in Cr)</label>
                    <input 
                      type="text"
                      value={formData.businessGiveninRupees} 
                      onChange={(e) => handleChange("businessGiveninRupees", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Referrals</label>
                    <input 
                      type="number"
                      value={formData.referrals} 
                      onChange={(e) => handleChange("referrals", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Visitors</label>
                    <input 
                      type="number"
                      value={formData.visitors} 
                      onChange={(e) => handleChange("visitors", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Inductions</label>
                    <input 
                      type="number"
                      value={formData.inductions} 
                      onChange={(e) => handleChange("inductions", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Active Status</label>
                    <select 
                      value={formData.isActive} 
                      onChange={(e) => handleChange("isActive", e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Media URLs Section */}
              <fieldset className="member-form-section">
                <legend>Media URLs</legend>
                <div className="member-form-grid">
                  <div className="member-form-field">
                    <label>Person Image URL</label>
                    <input 
                      type="url"
                      value={formData.personImage} 
                      onChange={(e) => handleChange("personImage", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Business Logo URL</label>
                    <input 
                      type="url"
                      value={formData.businessLogo} 
                      onChange={(e) => handleChange("businessLogo", e.target.value)} 
                    />
                  </div>
                  <div className="member-form-field">
                    <label>Business Image URL</label>
                    <input 
                      type="url"
                      value={formData.businessImg} 
                      onChange={(e) => handleChange("businessImg", e.target.value)} 
                    />
                  </div>
                </div>
              </fieldset>

              {/* About Section */}
              <fieldset className="member-form-section">
                <legend>About Section</legend>
                <div className="member-form-field">
                  <label>About Heading</label>
                  <input 
                    type="text"
                    value={formData.aboutHeading} 
                    onChange={(e) => handleChange("aboutHeading", e.target.value)} 
                  />
                </div>
                <div className="member-form-field">
                  <label>About Paragraph</label>
                  <textarea 
                    value={formData.aboutPara} 
                    onChange={(e) => handleChange("aboutPara", e.target.value)} 
                    rows="4"
                  />
                </div>
              </fieldset>

              {/* Tabs Section */}
              <fieldset className="member-form-section">
                <legend>Tabs</legend>
                {formData.tabs.map((tab, index) => (
                  <div key={index} className="member-form-array-item">
                    <input
                      type="text"
                      value={tab}
                      onChange={(e) => {
                        const updated = [...formData.tabs];
                        updated[index] = e.target.value;
                        handleChange("tabs", updated);
                      }}
                    />
                    <button 
                      type="button" 
                      className="member-form-remove-button"
                      onClick={() => handleRemoveItem("tabs", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="member-form-add-button"
                  onClick={() => handleAddItem("tabs", "")}
                >
                  Add Tab
                </button>
              </fieldset>

              {/* FAQ Groups Section */}
              <fieldset className="member-form-section">
                <legend>FAQ Groups</legend>
                {formData.faqGroups.map((faq, index) => (
                  <div key={index} className="member-form-array-item grid">
                    <input
                      type="text"
                      placeholder="Tab"
                      value={faq.tab}
                      onChange={(e) => handleArrayChange("faqGroups", index, "tab", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="FAQ Title"
                      value={faq.faqTitle}
                      onChange={(e) => handleArrayChange("faqGroups", index, "faqTitle", e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="member-form-remove-button"
                      onClick={() => handleRemoveItem("faqGroups", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="member-form-add-button"
                  onClick={() => handleAddItem("faqGroups", { tab: "", faqTitle: "" })}
                >
                  Add FAQ Group
                </button>
              </fieldset>

              {/* Statistics Section */}
              <fieldset className="member-form-section">
                <legend>Statistics</legend>
                {formData.statistics.map((stat, index) => (
                  <div key={index} className="member-form-array-item">
                    <input
                      type="text"
                      placeholder="Number"
                      value={stat.number}
                      onChange={(e) => handleArrayChange("statistics", index, "number", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Text"
                      value={stat.text}
                      onChange={(e) => handleArrayChange("statistics", index, "text", e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="member-form-remove-button"
                      onClick={() => handleRemoveItem("statistics", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="member-form-add-button"
                  onClick={() => handleAddItem("statistics", { number: "", text: "" })}
                >
                  Add Statistic
                </button>
              </fieldset>

              {/* Services Section */}
              <fieldset className="member-form-section">
                <legend>Services</legend>
                {formData.services.map((service, index) => (
                  <div key={index} className="member-form-array-item grid">
                    <input
                      type="text"
                      placeholder="Icon (e.g., fa-solid fa-leaf)"
                      value={service.icon}
                      onChange={(e) => handleArrayChange("services", index, "icon", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      value={service.name}
                      onChange={(e) => handleArrayChange("services", index, "name", e.target.value)}
                    />
                    <textarea
                      placeholder="Description"
                      value={service.description}
                      onChange={(e) => handleArrayChange("services", index, "description", e.target.value)}
                      rows="2"
                    />
                    <button 
                      type="button" 
                      className="member-form-remove-button"
                      onClick={() => handleRemoveItem("services", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="member-form-add-button"
                  onClick={() => handleAddItem("services", { icon: "", name: "", description: "" })}
                >
                  Add Service
                </button>
              </fieldset>

              {/* Photos Section */}
              <fieldset className="member-form-section">
                <legend>Photos</legend>
                {formData.photos.map((photo, index) => (
                  <div key={index} className="member-form-array-item">
                    <input
                      type="url"
                      value={photo}
                      onChange={(e) => {
                        const updated = [...formData.photos];
                        updated[index] = e.target.value;
                        handleChange("photos", updated);
                      }}
                      placeholder="Photo URL"
                    />
                    <button 
                      type="button" 
                      className="member-form-remove-button"
                      onClick={() => handleRemoveItem("photos", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="member-form-add-button"
                  onClick={() => handleAddItem("photos", "")}
                >
                  Add Photo
                </button>
              </fieldset>

              <div className="member-form-actions">
                <button 
                  type="button" 
                  className="member-form-cancel-button"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
                 <button 
                  type="submit" 
                  className="member-form-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="member-form-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Member"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberForm;