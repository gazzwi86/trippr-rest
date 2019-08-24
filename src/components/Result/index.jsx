import React from 'react';

const Results = ({ destination, duration }) => (
  <li className="result">
    <span className="result__destination">{ destination }</span>
    <span className="result__duration">{ duration }</span>
  </li>
);

export default Results;
