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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="scr-btn">
          <input
            type="text"
            placeholder="Search Here..."
            id="scr"
            onChange={(e) => setDrugName(e.target.value)}
            value={drugName}
            className='input-text'
          ></input>
          <br />
          <button type="submit" id="btn" disabled={props.isSearching}>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DrugForm;
