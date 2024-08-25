import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Include this line to add custom CSS

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      // Convert the string input into an array of characters
      const charArray = jsonInput.split('').filter(char => char.trim().length > 0);

      // Create the JSON object
      const jsonObject = {
        characters: charArray
      };

      // Make the API request
      const res = await axios.post('https://bajajfinserv-backend-wlns.onrender.com/bfhl',  { data: charArray });
      setResponse(res.data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Invalid JSON or API error:', error);
      setError('Error processing input or API request. Please check your input.');
      setResponse(null); // Clear previous response
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="filtered-response">
        <strong>Filtered Response</strong>
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {response.alphabets?.join(', ')}</div>}
        {selectedOptions.includes('Numbers') && <div>Numbers: {response.numbers?.join(', ')}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && 
          <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet?.join(', ')}</div>}
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

      {error && <div className="error-message">{error}</div>}

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
