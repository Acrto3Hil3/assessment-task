import React, { useState } from 'react';
import { createService } from '../api/api';

const ServiceForm = ({ categoryId, onServiceAdded }) => {
  const [serviceName, setServiceName] = useState('');
  const [type, setType] = useState('Normal');
  const [priceOptions, setPriceOptions] = useState([{ price: '', duration: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(categoryId, { serviceName, type, priceOptions });
    setServiceName('');
    setPriceOptions([{ price: '', duration: '' }]);
    onServiceAdded();
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...priceOptions];
    newOptions[index][field] = value;
    setPriceOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <input value={serviceName} onChange={e => setServiceName(e.target.value)} placeholder="Service Name" className="border mr-2" />
      <select value={type} onChange={e => setType(e.target.value)} className="border mr-2">
        <option value="Normal">Normal</option>
        <option value="VIP">VIP</option>
      </select>
      {priceOptions.map((opt, idx) => (
        <div key={idx} className="mb-1">
          <input
            value={opt.price}
            onChange={e => updateOption(idx, 'price', e.target.value)}
            placeholder="Price"
            className="border mr-2"
          />
          <input
            value={opt.duration}
            onChange={e => updateOption(idx, 'duration', e.target.value)}
            placeholder="Duration"
            className="border"
          />
        </div>
      ))}
      <button className="bg-green-500 text-white px-3 py-1 rounded">Add Service</button>
    </form>
  );
};

export default ServiceForm;