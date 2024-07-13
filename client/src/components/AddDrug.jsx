// src/components/AddDrug.js
import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import '../css/AddDrug.css';

const AddDrug = (props) => {
  const [drugName, setDrugName] = useState('');
  const [drugDescription, setDrugDescription] = useState('');
  const [drugIngredients, setDrugIngredients] = useState([]);
  const [message, setMessage] = useState('');

  const handleArrayChange = (setter, index) => (e) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = e.target.value;
      return newArray.filter((item) => item.trim() !== ''); // Remove empty strings
    });
  };

  const addToArray = (setter) => () => {
    setter((prev) => [...prev, '']);
  };

  const removeFromArray = (setter, index) => () => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: drugName,
      description: drugDescription,
      ingredients: drugIngredients
        .map((item) => item.trim())
        .filter((item) => item !== ''),
    };
    try {
      const response=await axios.post(
        `${BASE_URL}/drug/create`,data,
        { withCredentials: true }
      );
      setMessage(response.data.message);
      props.showAlert('Drug added successfully', 'success');
    } catch (error) {
      setMessage('Error adding the drug');
      console.error('Error adding the drug', error);
    }
  };

  return (
    <div className="py-36">
      <h1 className='text-center mb-4 title'>Add Drug</h1>
      <form className="health-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label'>Drug Name:</label>
          <input
            type="text"
            name="name"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Drug Name"
            required
            className='form-control'
          />
        </div>

        <div className="form-group">
          <label className='label'>Drug Description:</label>
          <input
            type="text"
            name="description"
            value={drugDescription}
            onChange={(e) => setDrugDescription(e.target.value)}
            placeholder="Description"
            required
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label className='label'>Drug Ingredients:</label>
          {drugIngredients.map((history, index) => (
            <div key={index}>
              <input
                type="text"
                className="form-control"
                value={history}
                onChange={handleArrayChange(setDrugIngredients, index)}
              />
              {drugIngredients.length > 1 && (
                <button
                  type="button"
                  onClick={removeFromArray(setDrugIngredients, index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addToArray(setDrugIngredients)}>
            Add Ingredient
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className="text-center mt-4">{message}</p>
    </div>
  );
};

export default AddDrug;
