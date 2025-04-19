import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlantDetails } from '../utils/fetchPlants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWater,
  faSun,
  faLeaf,
  faRuler,
  faAppleWhole,
  faSeedling,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import styles from './PlantDetails.module.css';

const PlantDetails = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPlantDetails = async () => {
      if (!plantId) {
        setError('No plant ID provided');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPlantDetails(plantId);
        setPlant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPlantDetails();
  }, [plantId]);

  if (loading) return <div>Loading plant details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!plant) return <div>Plant not found</div>;

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary mb-md"
      >
        Back
      </button>

      <div className={styles.header}>
        <div className={styles.image}>
          {plant.default_image && (
            <img
              src={plant.default_image.original_url}
              alt={plant.common_name}
            />
          )}
        </div>
        <div className={styles.title}>
          <h1>{plant.common_name}</h1>
          <div className={styles.scientificName}>
            {plant.scientific_name?.join(', ') || plant.scientific_name?.[0]}
          </div>
          <div className={styles.family}>
            <strong>Family:</strong> {plant.family}
          </div>
          {plant.other_name && plant.other_name.length > 0 && (
            <div>
              <strong>Also known as:</strong> {plant.other_name.join(', ')}
            </div>
          )}
          {plant.origin && plant.origin.length > 0 && (
            <div>
              <strong>Origin:</strong> {plant.origin.join(', ')}
            </div>
          )}
        </div>
      </div>

      <div className={styles.description}>
        <h2>Description</h2>
        <p>{plant.description}</p>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3>
            <FontAwesomeIcon icon={faWater} /> Care Requirements
          </h3>
          <ul>
            <li><strong>Watering:</strong> {plant.watering}</li>
            <li><strong>Sunlight:</strong> {plant.sunlight?.join(', ')}</li>
            <li><strong>Soil:</strong> {plant.soil?.join(', ')}</li>
            <li><strong>Maintenance:</strong> {plant.maintenance}</li>
            <li><strong>Care Level:</strong> {plant.care_level}</li>
          </ul>
        </div>

        <div className={styles.infoCard}>
          <h3>
            <FontAwesomeIcon icon={faLeaf} /> Characteristics
          </h3>
          <ul>
            <li><strong>Type:</strong> {plant.type}</li>
            <li><strong>Cycle:</strong> {plant.cycle}</li>
            <li><strong>Growth Rate:</strong> {plant.growth_rate}</li>
            {plant.dimensions && plant.dimensions.length > 0 && (
              <li>
                <strong>Height:</strong> {plant.dimensions[0].min_value}-{plant.dimensions[0].max_value} {plant.dimensions[0].unit}
              </li>
            )}
            <li><strong>Indoor Plant:</strong> {plant.indoor ? 'Yes' : 'No'}</li>
          </ul>
        </div>

        {(plant.flowers || plant.fruits || plant.edible_fruit || plant.edible_leaf) && (
          <div className={styles.infoCard}>
            <h3>
              <FontAwesomeIcon icon={faAppleWhole} /> Harvest Information
            </h3>
            <ul>
              {plant.flowers && <li><strong>Flowers:</strong> Yes</li>}
              {plant.flowering_season && <li><strong>Flowering Season:</strong> {plant.flowering_season}</li>}
              {plant.fruits && <li><strong>Fruits:</strong> Yes</li>}
              {plant.edible_fruit && <li><strong>Edible Fruit:</strong> Yes</li>}
              {plant.harvest_season && <li><strong>Harvest Season:</strong> {plant.harvest_season}</li>}
              {plant.edible_leaf && <li><strong>Edible Leaves:</strong> Yes</li>}
            </ul>
          </div>
        )}

        <div className={styles.infoCard}>
          <h3>
            <FontAwesomeIcon icon={faSeedling} /> Propagation & Maintenance
          </h3>
          <ul>
            {plant.propagation && plant.propagation.length > 0 && (
              <li><strong>Propagation Methods:</strong> {plant.propagation.join(', ')}</li>
            )}
            {plant.pruning_month && plant.pruning_month.length > 0 && (
              <li><strong>Pruning Months:</strong> {plant.pruning_month.join(', ')}</li>
            )}
            {plant.pruning_count && (
              <li><strong>Pruning Frequency:</strong> {plant.pruning_count.amount} time(s) {plant.pruning_count.interval}</li>
            )}
          </ul>
        </div>

        <div className={styles.infoCard}>
          <h3>
            <FontAwesomeIcon icon={faLocationDot} /> Hardiness & Tolerances
          </h3>
          <ul>
            {plant.hardiness && (
              <li><strong>Hardiness Zone:</strong> {plant.hardiness.min} to {plant.hardiness.max}</li>
            )}
            <li><strong>Drought Tolerant:</strong> {plant.drought_tolerant ? 'Yes' : 'No'}</li>
            <li><strong>Salt Tolerant:</strong> {plant.salt_tolerant ? 'Yes' : 'No'}</li>
            <li><strong>Thorny:</strong> {plant.thorny ? 'Yes' : 'No'}</li>
            <li><strong>Invasive:</strong> {plant.invasive ? 'Yes' : 'No'}</li>
            <li><strong>Tropical:</strong> {plant.tropical ? 'Yes' : 'No'}</li>
          </ul>
        </div>

        {plant.pest_susceptibility && plant.pest_susceptibility.length > 0 && (
          <div className={styles.infoCard}>
            <h3>
              <FontAwesomeIcon icon={faSun} /> Pest Susceptibility
            </h3>
            <ul>
              {plant.pest_susceptibility.map((pest, index) => (
                <li key={index}>{pest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetails;
