import { useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { ME } from '../utils/queries.js';
import PlantList from "../components/PlantList/PlantList.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME);

  return (
    <div className="home-container">
      <h1>My Garden</h1>
      <button
        onClick={() => navigate('/SearchPlants')}
        className="btn btn-primary"
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
