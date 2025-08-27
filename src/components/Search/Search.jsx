import React, { useState, useEffect } from "react";
import './Search.css'

const Search = ({ filters = {}, onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    q: "",
    dietaryPreference: "",
    difficulty: "",
    maxPrepTime: "",
    ...filters,
  });

 
  useEffect(() => {
    setLocalFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        name="q"
        placeholder="Search by title..."
        value={localFilters.q}
        onChange={handleChange}
      />

      <select
        name="dietaryPreference"
        value={localFilters.dietaryPreference}
        onChange={handleChange}
      >
        <option value="">All</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="non-veg">Non-Veg</option>
      </select>

      <select
        name="difficulty"
        value={localFilters.difficulty}
        onChange={handleChange}
      >
        <option value="">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        name="maxPrepTime"
        placeholder="Max Prep Time (minutes)"
        value={localFilters.maxPrepTime}
        onChange={handleChange}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
