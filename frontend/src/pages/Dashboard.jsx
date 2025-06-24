import { useState } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoriesList';
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <CategoryForm onCategoryAdded={refresh} />
        <CategoryList onSelectCategory={setSelectedCategory} refreshTrigger={refreshKey} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        {selectedCategory && (
          <>
            <ServiceForm categoryId={selectedCategory.categoryId} onServiceAdded={refresh} />
            <ServiceList categoryId={selectedCategory.categoryId} refreshTrigger={refreshKey} />
          </>
        )}
        {!selectedCategory && <p className="text-gray-500">Select a category to view/add services</p>}
      </div>
    </div>
  );
};

export default Dashboard;