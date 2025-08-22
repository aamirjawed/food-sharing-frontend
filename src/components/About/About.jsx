// src/components/About/About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="hero1">
        <h1>About Foodsy 🍴</h1>
        <p>
          Foodsy is a platform for food lovers to share recipes, explore new
          cuisines, and connect with other culinary enthusiasts.
        </p>
        <p>
          Whether you’re a professional chef 👨‍🍳 or a home cook, Foodsy makes it
          easy to discover, create, and share amazing dishes.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="section">
        <h2>Our Mission 🎯</h2>
        <p>
          Our mission is to inspire creativity in the kitchen and build a
          community where food lovers can learn from each other. We want cooking
          to be accessible, fun, and collaborative.
        </p>

        <h2>Our Vision 🌟</h2>
        <p>
          To become the largest, most engaging platform for culinary sharing
          and learning, connecting chefs and home cooks worldwide.
        </p>
      </div>

      {/* Core Features */}
      <div className="features1">
        <div className="feature1-card">
          <h2>Share Recipes 🍳</h2>
          <p>
            Upload your favorite recipes and share them with the Foodsy
            community. Inspire others and get feedback.
          </p>
        </div>

        <div className="feature1-card">
          <h2>Follow Chefs 👩‍🍳</h2>
          <p>
            Follow other food enthusiasts, get inspired by their creations, and
            stay updated on new recipes.
          </p>
        </div>

        <div className="feature1-card">
          <h2>Create Collections 📂</h2>
          <p>
            Organize your favorite recipes into collections. Revisit them easily
            and share with friends.
          </p>
        </div>

        <div className="feature1-card">
          <h2>Reviews & Ratings ⭐</h2>
          <p>
            Rate recipes you try, leave feedback, and help others discover the
            best dishes.
          </p>
        </div>

        <div className="feature1-card">
          <h2>Connect With Community 🌐</h2>
          <p>
            Join discussions, exchange tips, and connect with chefs and food
            lovers around the globe.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h2>Join the Foodsy Community 🚀</h2>
        <p>
          Sign up today and start sharing your recipes, discovering new meals,
          and connecting with fellow food enthusiasts!
        </p>
      </div>
    </div>
  );
};

export default About;
