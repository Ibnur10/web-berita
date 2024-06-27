import React from 'react';

const Categories = () => {
  const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">News Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 cursor-pointer">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;