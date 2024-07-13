// src/components/DrugForm.js
import React, { useState } from 'react';
import '../css/DrugForm.css';
const DrugForm = (props) => {
  const [drugName, setDrugName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(drugName);
  };

  return (
    <div className="py-10">
      <form className="health-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Drug Name:</label>
          <input
            type="text"
            name="name"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Drug Name"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className='btn btn-primary' disabled={props.isSearching}>Search</button>
      </form>
    </div>
  );
};

export default DrugForm;
