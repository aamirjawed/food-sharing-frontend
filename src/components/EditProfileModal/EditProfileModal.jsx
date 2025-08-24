import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constant";
import "./EditProfileModal.css";

const EditProfileForm = () => {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  // Fill form with user details when context is ready
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        password: "",
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update a single field
  const updateField = async (field, value) => {
    try {
      setLoading((prev) => ({ ...prev, [field]: true }));

      const response = await fetch(`${BASE_URL}/user/manage-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update");
      }

      // Update context and form with latest data
      if (setUser) setUser(data.data);

      setFormData({
        name: data.data.fullName || "",
        email: data.data.email || "",
        phone: data.data.phoneNumber || "",
        password: "",
      });

      console.log("Updated:", data.data);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>

      {/* Name */}
      <div className="field-row">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <button
          onClick={() => updateField("fullName", formData.name)}
          disabled={loading.name}
        >
          {loading.fullName ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Email */}
      <div className="field-row">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button
          onClick={() => updateField("email", formData.email)}
          disabled={loading.email}
        >
          {loading.email ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Phone */}
      <div className="field-row">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button
          onClick={() => updateField("phoneNumber", formData.phone)}
          disabled={loading.phone}
        >
          {loading.phoneNumber ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Password */}
      <div className="field-row">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button
          onClick={() => updateField("password", formData.password)}
          disabled={loading.password}
        >
          {loading.password ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
