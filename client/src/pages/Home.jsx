import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { ME } from '../utils/queries.js';
import PlantList from "../components/PlantList.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME);

  return (
    <div className="home-container">
      <h1>My Garden</h1>
      <button
        onClick={() => navigate('/SearchPlants')}
        style={{
          backgroundColor: '#84b254',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        Add plants to garden
      </button>
      {meLoading && 
        <p>Loading...</p>}
      {meError &&
        <p>Error: {error.message}</p>}
      {meData && 
        <PlantList plants={meData.me.garden || []} isSearch={false} />
      }
    </div>
  );
};
export default Home;
