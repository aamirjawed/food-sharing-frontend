import React, { useEffect, useState } from "react";
import {Link} from 'react-router'
import BASE_URL from "../../constant.js"
import "./MyRecipe.css";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/get-my-recipes`, {
            credentials:"include"
        });
        if (response.ok) {
          const json = await response.json();
          setRecipes(json.data);
        } else {
          console.log("Failed to fetch recipes");
        }
      } catch (error) {
        console.log("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  const handleLoadMore  = () => {
    setVisibleCount((prev) => prev +8)
  }


  if (loading) return <p>Loading...</p>;
  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

 return (
    <div className="recipe-section">
      <div className="recipe-list">
        {recipes.slice(0, visibleCount).map((item) => (
          <div className="recipe-card" key={item.id}>
            <img src={item.imageUrl} alt={item.title} className="recipe-image" />
            <h2><Link to={`/recipes/${item.id}`} className="read-more-link">{item.title}</Link></h2>
            <p>By: {item.user?.fullName || "Unknown"}</p>
            <p>{item.instructions}... <Link to={`/recipes/${item.id}`} className="read-more-link">Read More</Link></p>
          </div>
        ))}
      </div>

      {visibleCount < recipes.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};


export default MyRecipe;
