/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Login.css";
import BASE_URL from '../../../constant.js'
import {useNavigate} from 'react-router'

const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const checkAuth = async() => {
      try {
        const res = await fetch(`${BASE_URL}/me`, {
          method:"GET",
          credentials:true
        })

        if(res.ok){
          navigate('/recipes')
        }
      } catch (error) {
        console.log(error)
        console.log("Auth check failed:");
      }
    }
    checkAuth()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:"include",
        body: JSON.stringify({
          
          email: formData.email,
          password:formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormData({
          email: "",
          password: "",
        })
        setLoading(false)

        alert("login success")
        navigate('/recipes')
      }else{
        console.log("Something went wrong while login")
      }
      
    } catch (error) {
      console.log("Error in login", error)
      setLoading(false)
    }
    

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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

        <button type="submit">{loading ? "Loading...":"Login"}</button>
      </form>
    </div>
  );
};

export default Login;
