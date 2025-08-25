import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for redirect
import BASE_URL from "../../constant.js";
import "./MyRecipe.css";
import CreateRecipeModal from "../CreateRecipeModal/CreateRecipeModal.jsx";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ✅ for redirect

  // Fetch all recipes
  const fetchRecipe = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/get-my-recipes`, {
        credentials: "include",
      });

      if (response.status === 401) {
        // Unauthorized: redirect to home
        navigate("/");
        return;
      }

      if (response.ok) {
        const json = await response.json();
        setRecipes(json.data || []);
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

  // Delete a recipe
  const deleteRecipe = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 401) {
        navigate("/");
        return;
      }

      if (response.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      } else {
        console.log("Something went wrong while deleting");
      }
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // Save a new recipe
  const handleSaveRecipe = async (recipeData, setSavingButton) => {
    setSavingButton(true);
    try {
      const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (response.status === 401) {
        navigate("/");
        return;
      }

      if (response.ok) {
        await fetchRecipe(); // refresh recipes
        setShowModal(false); // close modal
      } else {
        console.log("Failed to save recipe");
      }
    } catch (error) {
      console.log("Error saving recipe:", error);
    } finally {
      setSavingButton(false);
    }
  };

  if (loading) return <p className="center-message">Loading...</p>;

  return (
    <div className="recipe-section">
      {recipes.length === 0 && (
        <div className="no-recipes-container">
          <p>No recipes found.</p>
          <button
            className="create-recipe-button"
            onClick={() => setShowModal(true)}
          >
            Add Recipe
          </button>
        </div>
      )}

      {recipes.length > 0 && (
        <>
          <div className="top-controls">
            <button
              className="create-recipe-button"
              onClick={() => setShowModal(true)}
            >
              Add Recipe
            </button>
          </div>

          <div className="recipe-list">
            {recipes.slice(0, visibleCount).map((item) => (
              <div className="recipe-card" key={item.id}>
                <img
                  src={item.imageUrl || "/default-image.png"}
                  alt={item.title || "Recipe image"}
                  className="recipe-image"
                />
                <h2>
                  <Link to={`/recipes/${item.id}`} className="read-more-link">
                    {item.title}
                  </Link>
                </h2>
                <p>By: {item.user?.fullName || "Unknown"}</p>
                <p>
                  {item.instructions.slice(0, 100)}...{" "}
                  <Link to={`/recipes/${item.id}`} className="read-more-link">
                    Read More
                  </Link>
                </p>
                <button onClick={() => deleteRecipe(item.id)}>Delete</button>
              </div>
            ))}
          </div>

          {visibleCount < recipes.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}

      {showModal && (
        <CreateRecipeModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
};

export default MyRecipe;
