/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Signup.css";
import BASE_URL from '../../../constant.js'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log("User created")
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        })

        
      }else{
        console.log("Something went wrong")
      }
    } catch (error) {
        console.log("Error", error)
        setLoading(false)
    }

  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit phone number"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{loading ? "Loading...":"Sing Up"}</button>
      </form>
    </div>
  );
};

export default Signup;
