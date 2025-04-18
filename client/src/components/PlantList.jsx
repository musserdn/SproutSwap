import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UPDATE_GARDEN } from "../utils/mutations";
import { ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const PlantList = ({ plants }) => {
  const [addedPlants, setAddedPlants] = useState({});
  const [updateGarden, { error }] = useMutation(UPDATE_GARDEN);

  useEffect(()=>console.log(addedPlants), [addedPlants])

  const queryResponse = useQuery(ME);

  const handleToggle = async (plantId) => {
    // update the ui:
    setAddedPlants((prev) => ({
      ...prev,
      [plantId]: !prev[plantId],
    }));

    // update the database:
    try {
      await updateGarden({
        variables: { 
          userId: queryResponse.data.me._id, 
          plants: Object.values(addedPlants) 
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!plants || plants.length === 0) {
    return <p>No plants found. Try a different search term.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {plants.map((plant) => {
        const isAdded = addedPlants[plant.id];

        return (
          <Link
            key={plant.id}
            to={`/PlantDetails/${plant.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
                width: "150px",
                position: "relative",
              }}
            >
              <img
                src={
                  plant.default_image?.thumbnail ||
                  "https://dummyimage.com/150/53351d/008000&text=Image+Missing"
                }
                alt={plant.common_name || "Unknown Plant"}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <p style={{ margin: "8px 0" }}>
                {plant.common_name || "Unknown Plant"}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault(); // prevent link click
                  handleToggle(plant.id);
                }}
                style={{
                  backgroundColor: isAdded ? "#ffdddd" : "#ddffdd",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {isAdded ? (
                  <>
                    <FaTrash style={{ marginRight: "6px" }} /> Remove
                  </>
                ) : (
                  <>
                    <FaPlus style={{ marginRight: "6px" }} /> Add
                  </>
                )}
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PlantList;
