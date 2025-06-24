import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const FrontendApp = () => {
  const [token, setToken] = useState("");
  const [email] = useState("admin@codesfortomorrow.com");
  const [password] = useState("Admin123!@#");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);

  const login = async () => {
    const res = await axios.post(`${API_BASE}/login`, { email, password });
    setToken(res.data.token);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE}/categories?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(res.data.categories);
  };

  const fetchServices = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await axios.get(`${API_BASE}/category/${categoryId}/services?page=1&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServices(res.data.services);
  };

  useEffect(() => {
    if (token) fetchCategories();
  }, [token, page]);

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Category & Service Manager</h1>

      <div>
        <h2 className="text-xl font-semibold">Categories</h2>
        <ul className="list-disc pl-5">
          {categories.map((cat) => (
            <li key={cat.id} className="cursor-pointer text-blue-600" onClick={() => fetchServices(cat.id)}>
              {cat.name}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1 bg-gray-200" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <button className="px-3 py-1 bg-gray-200" onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      {selectedCategory && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Services for Category #{selectedCategory}</h2>
          <ul className="list-disc pl-5">
            {services.map((srv) => (
              <li key={srv.id}>
                {srv.name} ({srv.type})
                <ul className="ml-4 list-square">
                  {srv.ServicePrices.map((price, idx) => (
                    <li key={idx}>{price.duration} - ₹{price.price} ({price.type})</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FrontendApp;