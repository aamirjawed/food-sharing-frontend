import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import BASE_URL from "../../constant.js";
import "./MyRecipe.css";
import CreateRecipeModal from "../CreateRecipeModal/CreateRecipeModal.jsx";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showModal, setShowModal] = useState(false); // modal state

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/get-my-recipes`, {
        credentials: "include",
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

  useEffect(() => {
    fetchRecipe();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Deleted successfully");
        fetchRecipe();
      } else {
        console.log("Something went wrong while deleting");
      }
    } catch (error) {
      console.log("Error in delete recipe my recipe jsx", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) return <p className="center-message">Loading...</p>;
if (!recipes || recipes.length === 0)
  return <p className="center-message">No recipes found.</p>;


  return (
    <div className="recipe-section">
      {/* Create Recipe Button */}
      <button
        className="create-recipe-button"
        onClick={() => setShowModal(true)}
      >
        Add Recipe
      </button>

      {/* Recipe Cards */}
      <div className="recipe-list">
        {recipes.slice(0, visibleCount).map((item) => (
          <div className="recipe-card" key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="recipe-image"
            />
            <h2>
              <Link to={`/recipes/${item.id}`} className="read-more-link">
                {item.title}
              </Link>
            </h2>
            <p>By: {item.user?.fullName || "Unknown"}</p>
            <p>
              {item.instructions}...{" "}
              <Link to={`/recipes/${item.id}`} className="read-more-link">
                Read More
              </Link>
            </p>
            <button onClick={() => deleteRecipe(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < recipes.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {/* Modal */}
      {showModal && <CreateRecipeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MyRecipe;
