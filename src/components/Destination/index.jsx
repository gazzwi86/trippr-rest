import React from 'react';

const Destination = ({ removeDestination, destination, duration }) => (
  <li className="result">
    <span className="result__destination">{ destination }</span>
    
    <span className="result__duration">{ duration }</span>
    
    <button onClick={(e) => removeDestination(e)} className="result__remove">
      <i>Remove</i>
    </button>
  </li>
);

export default Destination;
