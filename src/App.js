import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Include this line to add custom CSS

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://bajajfinserv-backend-wlns.onrender.com', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or API error:', error);
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="filtered-response">
        <strong>Filtered Response</strong>
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
        {selectedOptions.includes('Numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && 
          <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="input-section">
        <label>API Input</label>
        <textarea 
          value={jsonInput} 
          onChange={(e) => setJsonInput(e.target.value)} 
          rows="5" 
          cols="50" 
          className="api-input"
        />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>

      <div className="filter-section">
        <label>Multi Filter</label>
        <select 
          multiple 
          className="multi-select" 
          onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
        >
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;

