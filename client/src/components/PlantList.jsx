import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UPDATE_GARDEN } from "../utils/mutations";
import { ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const PlantList = ({ plants, isSearch = true }) => {
  const [addedPlants, setAddedPlants] = useState({});
  const [updateGarden, { error }] = useMutation(UPDATE_GARDEN);

  const userQuery = useQuery(ME);

  // Toggle plant added/removed status in local state
  const handleToggle = (plantId) => {
    setAddedPlants((prev) => ({
      ...prev,
      [plantId]: !prev[plantId],
    }));
  };

  // Populate initial plant state from user's garden
  // This avoids wiping the garden on initial render
  useEffect(() => {
    if (userQuery.loading || !userQuery.data?.me?._id) return;
    const garden = userQuery.data.me.garden;

    const initialState = {};
    garden.forEach((plant) => {
      initialState[plant.plantApiId] = true;
    });

    setAddedPlants(initialState);
  }, [userQuery.loading]);

  // Update garden in backend anytime addedPlants changes (only in search mode)
  useEffect(() => {
    if (!isSearch) return;
    updateBackend();
  }, [addedPlants]);

  // Send updated plant list to backend
  async function updateBackend() {
    if (userQuery.loading || !userQuery.data?.me || plants.length === 0) return;

    const plantKeys = Object.keys(addedPlants);
    const plantData = plantKeys.map((id) =>
      plants.find((plant) => Number(plant.id) === Number(id))
    );

    const garden = plantData
      .filter((plant) => plant && addedPlants[String(plant.id)])
      .map((plant) => {
        const id = plant.id;
        const common_name = plant.common_name;
        const imgUrl = plant.default_image?.thumbnail;

        return { plantApiId: id, name: common_name, imgUrl };
      });

    try {
      await updateGarden({
        variables: {
          userId: userQuery.data.me._id,
          plants: garden,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Fallback messages when no plants to show
  if (!plants || plants.length === 0) {
    if (isSearch) {
      return <p>No plants found. Try a different search term.</p>;
    } else {
      return <p>Your garden is empty. Add some plants!</p>;
    }
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
        const isAdded = addedPlants[plant.id] || addedPlants[plant.plantApiId];

        return (
          <Link
            key={plant.id || plant.plantApiId}
            to={`/PlantDetails/${plant.id || plant.plantApiId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              className="plant-card"
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
                  plant.imgUrl ||
                  "https://dummyimage.com/150/53351d/008000&text=Image+Missing"
                }
                alt={plant.common_name || plant.name || "Unknown Plant"}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <p style={{ margin: "8px 0" }}>
                {plant.common_name || plant.name || "Unknown Plant"}
              </p>
              {isSearch && (
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
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PlantList;
