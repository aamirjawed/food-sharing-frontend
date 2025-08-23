import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constant.js";
import "./Recipe.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const Recipe = () => {

  const {user} = useContext(AuthContext)
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeRecipeId, setActiveRecipeId] = useState(null);

  const [saving, setSaving] = useState(false);
  

  // fetch recipes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes`);
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

  // fetch collections when modal opens

const fetchCollections = async () => {
  try {
    const res = await fetch(`${BASE_URL}/favorites/collections`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();

      
      const list = Array.isArray(data) 
        ? data 
        : data.collections || data.data || [];

      setCollections(list);
    }
  } catch (err) {
    console.error("Error fetching collections:", err);
    setCollections([]); // fallback to empty array
  }
};


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // open modal when clicking save
  const openSaveModal = (recipeId) => {
    setActiveRecipeId(recipeId);
    setShowModal(true);
    fetchCollections(); 
  };

  // save recipe to chosen collection
  const handleSaveToCollection = async () => {
    if (!selectedCollection) {
      return;
    }

    try {
      setSaving(true);
      

      const response = await fetch(`${BASE_URL}/favorites/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: activeRecipeId,
          collectionId: selectedCollection,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        setShowModal(false);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="recipe-section">
      

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

            {/* Save button */}
            {
              user ? 
              (
                 <button
              className="save-btn"
              onClick={() => openSaveModal(item.id)}
            >
              ⭐ Save to Collection
            </button>
              ):""
            }
           
          </div>
        ))}
      </div>

      {visibleCount < recipes.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {/*Modal for choosing collection */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Select Collection</h3>
            <select
              className="collection-dropdown"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <option value="">Choose Collection</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={handleSaveToCollection}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
