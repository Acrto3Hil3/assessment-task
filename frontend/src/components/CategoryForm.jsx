import React, { useState } from 'react';
import { createCategory } from '../api/api';

const CategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ categoryName: name });
    setName('');
    onCategoryAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Category Name"
        className="border p-1 mr-2"
      />
      <button className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </form>
  );
};

export default CategoryForm;