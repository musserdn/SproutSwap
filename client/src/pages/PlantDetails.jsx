/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const PlantDetails = () => {
  const [searchParams] = useSearchParams();
  const plantId = searchParams.get('id');
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  `;

  const headerStyle = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
    }
  `;

  const imageStyle = css`
    flex: 1;
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  const titleStyle = css`
    flex: 2;
    
    h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .scientific-name {
      font-style: italic;
      color: #7f8c8d;
      margin-bottom: 1rem;
    }
    
    .family {
      margin-bottom: 1rem;
    }
  `;

  const descriptionStyle = css`
    margin-bottom: 2rem;
    line-height: 1.6;
  `;

  const infoGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  `;

  const infoCardStyle = css`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #84b254;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    li {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: flex-start;
      
      &:before {
        content: "•";
        color: #84b254;
        margin-right: 0.5rem;
      }
    }
    
    p {
      margin: 0;
    }
  `;

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <div css={imageStyle}>
          {plant.default_image && (
            <img 
              src={plant.default_image.original_url} 
              alt={plant.common_name} 
            />
          )}
        </div>
        <div css={titleStyle}>
          <h1>{plant.common_name}</h1>
          <div className="scientific-name">
            {plant.scientific_name?.join(', ') || plant.scientific_name?.[0]}
          </div>
          <div className="family">
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

      <div css={descriptionStyle}>
        <h2>Description</h2>
        <p>{plant.description}</p>
      </div>

      <div css={infoGridStyle}>
        <div css={infoCardStyle}>
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

        <div css={infoCardStyle}>
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
          <div css={infoCardStyle}>
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

        <div css={infoCardStyle}>
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

        <div css={infoCardStyle}>
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
          <div css={infoCardStyle}>
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
