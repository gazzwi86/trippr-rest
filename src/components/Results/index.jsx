import React from 'react';
import Result from '../Result/';

const Results = ({ results }) => (
  <div>
    <h2>Results</h2>

    <ul>
      {results.map(result => <Result result={result} />)}
    </ul>
  </div>
);

export default Results;
