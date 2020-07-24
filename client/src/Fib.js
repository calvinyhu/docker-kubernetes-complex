import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  seenIndexes: [],
  values: {},
  index: '',
};

const Fib = () => {
  const [{ index, seenIndexes, values }, setState] = useState(initialState);

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setState((state) => ({ ...state, values: values.data }));
  };
  useEffect(fetchValues, []);

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setState((state) => ({ ...state, seenIndexes: seenIndexes.data }));
  };
  useEffect(fetchIndexes, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', { index });
    setState((state) => ({ ...state, index: '' }));
  };

  const handleOnChange = (event) => setState((state) => ({ ...state, index: event.target.value }));

  const renderSeenIndexes = () => seenIndexes.map(({ number }) => number).join(', ');

  const renderValues = () =>
    Object.entries(values).map(([key, value]) => (
      <div key={key}>
        For index {key} I calculated {value}
      </div>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={handleOnChange} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
