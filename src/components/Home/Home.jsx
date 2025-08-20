import React from "react";
import {Link} from 'react-router'
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Foodsy 🍲</h1>
        <p>Share meals, discover recipes, and spread happiness through food.</p>
        <Link className="hero-btn" to="/recipes">Explore Recipes</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>🍴 Share Your Dishes</h2>
          <p>Upload your favorite recipes and inspire others with your cooking.</p>
        </div>
        <div className="feature-card">
          <h2>📚 Collections</h2>
          <p>Save your favorite dishes in personalized collections.</p>
        </div>
        <div className="feature-card">
          <h2>⭐ Community Reviews</h2>
          <p>Read reviews from food lovers and leave your own feedback.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
