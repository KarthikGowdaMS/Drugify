// src/components/DrugInfo.js
import React from 'react';
// Ensure the CSS file is imported if it's not globally available
import '../css/Profile.css';

const DrugInfo = (props) => {
  if (!props.drug) {
    return <div className='text-center'>{props.message}</div>;
  }

  return (
    <div className="drug-list list-group">
      <h2>{props.drug.Name}</h2>
      <p className="list-group-item"><strong>Permitted:</strong> {props.drug.Permitted}</p>
      <p className="list-group-item"><strong>Description:</strong> {props.drug.Description}</p>
      <p className="list-group-item"><strong>Ingredients:</strong> {props.drug.Ingredients.join(', ')}</p>
      <div className="list-group-item"><strong>Alternatives:</strong>
        <ul>
          {props.drug.Alternatives.map((alt, index) => (
            <li key={index} className="ingredients">{alt.Name} - {alt.Quantity} mg</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrugInfo;