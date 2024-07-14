// src/components/DrugInfo.js
import React from 'react';
// Ensure the CSS file is imported if it's not globally available
import '../css/Profile.css';

const DrugInfo = (props) => {
  if (!props.drug) {
    return <div className='text-center text-lg'>{props.message}</div>;
  }

  return (
    <div className="drug-list list-group">
      <h2>{props.drug.name}</h2>
      <p className="list-group-item"><strong>Permitted:</strong> {props.drug.permitted}</p>
      <p className="list-group-item"><strong>Description:</strong> {props.drug.description}</p>
      <p className="list-group-item"><strong>Ingredients:</strong> {props.drug.ingredients.join(', ')}</p>
      <div className="list-group-item"><strong>Alternatives:</strong>
        <ul>
          {props.drug.alternatives.map((alt, index) => (
            <li key={index} className="ingredients">{alt.name} - {alt.quantity} mg</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrugInfo;