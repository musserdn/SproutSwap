import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>My Garden</h1>
      <button
        onClick={() => navigate('/SearchPlants')}
        className="btn btn-primary"
      >
        Add plants to garden
      </button>


    </div>
  );
};
export default Home;
