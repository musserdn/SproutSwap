import React, { createContext, useContext, useState } from 'react';

const PlantContext = createContext();

export const usePlantContext = () => {
  return useContext(PlantContext);
};

export const PlantProvider = ({ children }) => {
  const [addedPlants, setAddedPlants] = useState({});

  const handleToggle = (plantId) => {
    setAddedPlants((prev) => ({
      ...prev,
      [plantId]: !prev[plantId],
    }));
  };

  return (
    <PlantContext.Provider value={{ addedPlants, handleToggle }}>
      {children}
    </PlantContext.Provider>
  );
};

export default PlantContext;
