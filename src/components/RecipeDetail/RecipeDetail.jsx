import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BASE_URL from "../../constant";
import './RecipeDetail.css'

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeByID, setRecipeById] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recipeDetailById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setRecipeById(data.data); // backend returns { success, data }
        } else {
          console.error("Error fetching recipe:", data.message);
        }
      } catch (error) {
        console.log("Error in recipe detail jsx", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) recipeDetailById();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (!recipeByID) return <p>No recipe data available</p>;

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h1>{recipeByID.title}</h1>
        <p>
          <strong>By:</strong> {recipeByID.user?.fullName || "Unknown"}
        </p>
        {recipeByID.imageUrl && (
          <img
            src={recipeByID.imageUrl}
            alt={recipeByID.title}
            className="recipe-detail-image"
          />
        )}
        <p>
          <strong>Ingredients:</strong> {recipeByID.ingredients}
        </p>
        <p>
          <strong>Instructions:</strong> {recipeByID.instructions}
        </p>
        <p>
          <strong>Dietary Preference:</strong> {recipeByID.dietaryPreference}
        </p>
        <p>
          <strong>Difficulty:</strong> {recipeByID.difficulty}
        </p>
        <p>
          <strong>Prep Time:</strong> {recipeByID.prepTime} mins
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;
