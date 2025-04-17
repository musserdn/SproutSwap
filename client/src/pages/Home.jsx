import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

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

      {/* ...rest of your page... */}
    </div>
  );
};
export default Home;
