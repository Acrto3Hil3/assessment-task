import React, { useEffect, useState } from 'react';
import { getServices, deleteService } from '../api/api';

const ServiceList = ({ categoryId, refreshTrigger }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (categoryId) {
      getServices(categoryId).then(res => setServices(res.data.services));
    }
  }, [categoryId, refreshTrigger]);

  const handleDelete = async (id) => {
    await deleteService(id);
  };

  return (
    <div>
      {services.map(service => (
        <div key={service.serviceId} className="p-2 border">
          <div className="font-bold">{service.serviceName} ({service.type})</div>
          <ul>
            {service.ServicePrices?.map((price, idx) => (
              <li key={idx}>₹{price.price} / {price.duration}</li>
            ))}
          </ul>
          <button onClick={() => handleDelete(service.serviceId)} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;