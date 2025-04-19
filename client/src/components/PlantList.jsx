import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UPDATE_GARDEN } from "../utils/mutations";
import { ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const PlantList = ({ plants, isSearch=true }) => {
  const [addedPlants, setAddedPlants] = useState({});
  const [updateGarden, { error }] = useMutation(UPDATE_GARDEN);

  const userQuery = useQuery(ME);

  const handleToggle = async (plantId) => {
    // update the ui:
    setAddedPlants((prev) => ({
      ...prev,
      [plantId]: !prev[plantId],
    }));
  };

  // whenever addedPlants changes, we need to update the backend:
  useEffect(() => {
    updateBackend();
  }, [addedPlants]);

  // whenever the user data is loaded in, make sure to populate the
  // addedPlants object with plants already added in the user's
  // garden:
  useEffect(() => {
    if (userQuery.loading || !userQuery.data?.me?._id) return;
    const garden = userQuery.data.me.garden;

    // now, flip the correct addedPlants keys
    garden.forEach((plant) => {
      handleToggle(Number(plant.plantApiId));
    });
  }, [userQuery.loading]);

  async function updateBackend() {
    if (userQuery.loading || !userQuery.data?.me || plants.length === 0) return;

    // find each plant in plants that matches a key in addedPlants
    const plantKeys = Object.keys(addedPlants);
    const plantData = plantKeys.map((id) => {
      return plants.find((plant) => Number(plant.id) === Number(id));
    });

    // now filter out removed plants and map required values in 
    // garden object with the correct typedefs for PlantInput
    const garden = plantData
      .filter((plant) => addedPlants[String(plant.id)])
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
