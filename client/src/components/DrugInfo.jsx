// src/components/DrugInfo.js
import React from 'react';
// Ensure the CSS file is imported if it's not globally available
import '../css/Profile.css';

const DrugInfo = (props) => {
  if (!props.drug) {
    return <div className='text-center text-lg'>{props.message}</div>;
  }
  

    const renderField = (key, value) => {
      if (Array.isArray(value)) {
        return (
          <div className="list-group-item" key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            <ul>
              {value.map((item, index) => (
                typeof item === 'object' ? (
                  <li key={index} className="list-group-item">
                    {Object.entries(item).map(([subKey, subValue]) => `${subKey}: ${subValue}`).join(', ')}
                  </li>
                ) : (
                  <li key={index} className="list-group-item">{item}</li>
                )
              ))}
            </ul>
          </div>
        );
      } else if (typeof value === 'object') {
        return (
          <div className="list-group-item" key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            <ul>
              {Object.entries(value).map(([subKey, subValue], index) => (
                <li key={index} className="list-group-item">{`${subKey}: ${subValue}`}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        return (
          <p className="list-group-item" key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
          </p>
        );
      }
    };
  
    return (
      <div className="drug-list list-group">
        {Object.entries(props.drug).map(([key, value]) => renderField(key, value))}
      </div>
    );
  };
  


export default DrugInfo;