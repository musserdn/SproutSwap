import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { fetchSpeciesList } from '../utils/fetchPlants';

const SearchPlants = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const plants = await fetchSpeciesList({ q: searchTerm });
      setResults(plants);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="searchContainer">
      <h1 className="title">Search for Plants</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search for a plant..." />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <header>
        <PlantList plants={results} />
      </header>
    </div>
  );
};

export default SearchPlants;
