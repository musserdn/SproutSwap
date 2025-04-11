import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PlantList from '../components/PlantList';
import { fetchSpeciesList } from '../utils/fetchPlants';
import styles from './SearchPlants.module.css';

const SearchPlants = () => {
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
    <div className={styles.container}>
      <h1 className={styles.title}>Search for Plants</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search for a plant..." />
      {loading && <p className={styles.status}>Loading...</p>}
      {error && <p className={`${styles.status} ${styles.error}`}>{error}</p>}
      <div className={styles.plantListWrapper}>
        <PlantList plants={results} />
      </div>
    </div>
  );
};

export default SearchPlants;
