import React, { useState } from 'react';

const MyFlowers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/species-list?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for Plants</h1>
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a plant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Results */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
        {results.map((plant) => (
          <div
            key={plant.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px',
              textAlign: 'center',
              width: '150px',
            }}
          >
            <img
              src={plant.default_image?.thumbnail || 'https://dummyimage.com/150/53351d/008000&text=Image+Missing'}
              alt={plant.common_name || 'Unknown Plant'}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <p>{plant.common_name || 'Unknown Plant'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFlowers;
