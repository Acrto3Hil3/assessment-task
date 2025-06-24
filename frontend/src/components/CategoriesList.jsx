import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../api/api';

const CategoryList = ({ onSelectCategory, refreshTrigger }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data.categories));
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    await deleteCategory(id);
    onSelectCategory(null); // Reset selection if deleted
  };

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.categoryId} className="flex justify-between p-2 border">
          <span onClick={() => onSelectCategory(cat)}>{cat.categoryName}</span>
          <button onClick={() => handleDelete(cat.categoryId)} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;