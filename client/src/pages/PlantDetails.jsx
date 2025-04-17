/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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

const PlantDetails = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();  // Hook to navigate to previous page

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
      <button 
        onClick={() => navigate(-1)} 
        css={css`
          background-color: #84b254;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: background-color 0.3s;

          &:hover {
            background-color: #76a244;
          }
        `}
      >
        Back
      </button>

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
        {/* Render the remaining information cards as you had before */}
      </div>
    </div>
  );
};

export default PlantDetails;
