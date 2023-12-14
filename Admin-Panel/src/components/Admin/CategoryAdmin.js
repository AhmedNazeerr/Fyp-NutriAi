// CategoryPage.js
import React, { useState } from "react";

const CategoryPage = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <div className="category-page">
      <h2>Category Page</h2>
      
      <form onSubmit={handleAddCategory}>
        <label>
          Category Name:
          <input
            type="text"
            value={newCategory}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Category</button>
      </form>

      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
