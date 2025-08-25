import { useState } from "react";
import "./CreateRecipeModal.css";
import BASE_URL from "../../constant";

const CreateRecipeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    dietaryPreference: "",
    difficulty: "",
    prepTime: "",
  });
  const [image, setImage] = useState(null); 
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      const data = new FormData(); 
      data.append("title", formData.title);
      data.append("ingredients", formData.ingredients);
      data.append("instructions", formData.instructions);
      data.append("dietaryPreference", formData.dietaryPreference);
      data.append("difficulty", formData.difficulty);
      data.append("prepTime", formData.prepTime);
      if (image) data.append("image", image); 

      const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        credentials: "include",
        body: data, 
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Recipe created:", result);

        if (onSave) onSave(result); 
        onClose(); // close modal
      } else {
        console.error("Failed to create recipe:", await response.text());
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setSaving(false); // reset button
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>Create Recipe</h2>

        <form onSubmit={handleSubmit} className="create-recipe-form">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={4}
            required
          />

          <textarea
            name="instructions"
            placeholder="Step by step instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={6}
            required
          />

          <select
            name="dietaryPreference"
            value={formData.dietaryPreference}
            onChange={handleChange}
            required
          >
            <option value="">Select Dietary Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="number"
            name="prepTime"
            placeholder="Preparation Time (minutes)"
            value={formData.prepTime}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeModal;
