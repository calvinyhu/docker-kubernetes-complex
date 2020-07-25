import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [index, setIndex] = useState('');
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  };

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  };

  useEffect(() => {
    fetchIndexes();
    fetchValues();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!index) return;
    await axios.post('/api/values', { index });
    setIndex('');
    fetchIndexes();
    fetchValues();
  };

  const handleChangeIndex = (event) => setIndex(event.target.value);

  const renderSeenIndexes = () => seenIndexes.map(({ number }) => number).join(', ');

  const renderValues = () =>
    Object.entries(values).map(([key, value]) => (
      <div key={key}>
        For index {key}, I calculated: {value}
      </div>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={handleChangeIndex} />
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
