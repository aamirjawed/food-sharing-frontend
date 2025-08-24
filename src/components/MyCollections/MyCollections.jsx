import { useEffect, useState } from "react";
import BASE_URL from "../../constant";
import { Link } from "react-router";
import "./MyCollections.css";

const MyCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const [openCollection, setOpenCollection] = useState(null);
  const [recipes, setRecipes] = useState({});
  const [loadingRecipes, setLoadingRecipes] = useState(null);

  // Fetch all collections
  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/favorites/collections`, {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setCollections(data.data || data || []);
      } else {
        setError(data.message || "Failed to fetch collections");
      }
    } catch (err) {
      setError("Error fetching collections");
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new collection
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      setCreating(true);
      const response = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();

      if (response.ok) {
        setCollections((prev) => [...prev, data.data || data]);
        setNewName("");
        setShowForm(false);
      } else {
        alert(data.message || "Failed to create collection");
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong while creating collection");
    } finally {
      setCreating(false);
    }
  };

  // Fetch recipes inside a collection
  const fetchRecipesForCollection = async (collectionId) => {
    if (recipes[collectionId]) {
      // Already fetched → just toggle open/close
      setOpenCollection(openCollection === collectionId ? null : collectionId);
      return;
    }

    try {
      setLoadingRecipes(collectionId);
      const res = await fetch(
        `${BASE_URL}/favorites/collections/${collectionId}/recipes`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (res.ok) {
        setRecipes((prev) => ({
          ...prev,
          [collectionId]: data.data || data || [],
        }));
        setOpenCollection(collectionId);
      } else {
        alert(data.message || "Failed to fetch recipes");
      }
    } catch (err) {
      alert("Error fetching recipes for collection");
      console.error(err);
    } finally {
      setLoadingRecipes(null);
    }
  };

  // Delete a collection
  const deleteCollection = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/favorites/collections/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Collection deleted");
        setCollections((prev) => prev.filter((c) => c.id !== id));
      } else {
        console.log(data.message || "Failed to delete collection");
      }
    } catch (error) {
      console.log("Error while deleting collection", error);
    }
  };

  // Delete recipe from collection
  const deleteRecipe = async (colId, recId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/favorites/remove/${colId}/${recId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Recipe deleted from collection");

        // Update recipes locally without reloading everything
        setRecipes((prev) => ({
          ...prev,
          [colId]: prev[colId].filter((r) => r.id !== recId),
        }));
      } else {
        console.log(data.message || "Failed to delete recipe");
      }
    } catch (error) {
      console.log("Error in delete recipe", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="collections-container">
        <p className="loading">⏳ Loading collections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collections-container">
        <h2 className="collections-title">📂 My Collections</h2>
        <p className="collections-error">{error}</p>
        <button className="retry-btn" onClick={fetchCollections}>
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="collections-container">
      <div className="collections-header">
        <h2 className="collections-title">📂 My Collections</h2>
        <button
          className="create-collection-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "❌ Cancel" : "➕ Create"}
        </button>
      </div>

      {showForm && (
        <form className="create-collection-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Enter collection name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="collection-input"
          />
          <button type="submit" disabled={creating} className="create-btn">
            {creating ? "Creating..." : "Save"}
          </button>
        </form>
      )}

      {!collections || collections.length === 0 ? (
        <p className="collections-empty">
          No collections yet. Start adding your favorites!
        </p>
      ) : (
        <ul className="collections-list">
          {collections.map((col) => (
            <li key={col.id} className="collection-card">
              <div className="collection-header">
                <strong>{col.name}</strong>

                <button
                  className="dropdown-btn"
                  onClick={() => fetchRecipesForCollection(col.id)}
                >
                  {openCollection === col.id ? "▲ Hide" : "▼ View"}
                </button>

                <button
                  className="remove-button"
                  onClick={() => deleteCollection(col.id)}
                >
                  Remove
                </button>
              </div>

              {/* Recipes dropdown */}
              {openCollection === col.id && (
                <div className="recipes-dropdown">
                  {loadingRecipes === col.id ? (
                    <p>Loading recipes...</p>
                  ) : recipes[col.id]?.length > 0 ? (
                    <ul>
                      {recipes[col.id].map((recipe) => (
                        <li key={recipe.id} className="recipe-item">
                          <Link
                            to={`/recipes/${recipe.id}`}
                            className="recipe-link"
                          >
                            {recipe.title || recipe.name}
                          </Link>
                          <button
                            className="remove-button"
                            onClick={() => deleteRecipe(col.id, recipe.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No recipes in this collection</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCollections;
