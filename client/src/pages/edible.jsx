import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { fetchSpeciesList } from '../utils/fetchPlants';

const Edible = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const plants = await fetchSpeciesList({ q: searchTerm, edible: 1 });
      setResults(plants);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for Edible Plants</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search for a plant..." />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <PlantList plants={results} />
    </div>
  );
};

export default Edible;
