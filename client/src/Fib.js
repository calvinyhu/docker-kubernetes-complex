import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [index, setIndex] = useState('');
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get('/api/values/current');
      setValues(values.data);
    };
    fetchValues();
  }, []);

  useEffect(() => {
    const fetchIndexes = async () => {
      const seenIndexes = await axios.get('/api/values/all');
      setSeenIndexes(seenIndexes.data);
    };
    fetchIndexes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', { index });
    setIndex('');
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
