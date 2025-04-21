import React, { useState, useEffect } from "react";
import { UPDATE_GARDEN } from "../../utils/mutations";
import { ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { component } from "./PlantList.module.css";
import Plant from "./Plant";

const PlantList = ({ plants, isSearch = true }) => {
  const [garden, setGarden] = useState(null);

  //contains previously saved garden from sproutswap db:
  const userQuery = useQuery(ME);

  const [updateGarden, { error }] = useMutation(UPDATE_GARDEN);

  useEffect(loadGardenFromDb, [userQuery.loading]);

  // Populate initial plant state from user's garden
  // This avoids wiping the garden on initial render
  function loadGardenFromDb() {
    if (userQuery.loading) return; // don't update if the user data is still loading.
    let previouslySavedGarden = userQuery.data.me.garden;

    // remove irrevelent keys:
    previouslySavedGarden = previouslySavedGarden.map((plant) => {
      const name = plant.name;
      const imgUrl = plant.imgUrl;
      const plantApiId = plant.plantApiId;
      return { name, imgUrl, plantApiId };
    });

    setGarden([...(garden || []), ...previouslySavedGarden]);
  }

  async function handlePlantAddRemove(plant) {
    if (userQuery.loading) return; // don't update if the user data is still loading.
    const userId = userQuery.data.me._id;
    let newGarden = undefined;

    function toggleUI() {
      const plantIsInGarden = getIsPlantInGarden(plant.plantApiId);

      // first, update the visual ui:
      if (plantIsInGarden) {
        // if the plant is currently in the garden, filter it out
        newGarden = garden.filter((p) => p.plantApiId !== plant.plantApiId);
      } else {
        // else, add it to the garden
        newGarden = [...garden, plant];
      }

      setGarden(newGarden);
    }

    toggleUI();

    // then, send the changes to the backend:
    try {
      await updateGarden({
        variables: {
          userId,
          plants: newGarden,
        },
      });
    } catch (err) {
      console.log(err);
      toggleUI(); // if the updateGarden query fails, then roll back the ui
    }
  }

  function getIsPlantInGarden(plantApiId) {
    const result = garden.find((p) => p.plantApiId === plantApiId);
    return !!result;
  }

  // Fallback messages when no plants to show
  if ((!plants || plants.length === 0) && isSearch) {
    return <p>No plants found. Try a different search term.</p>;
  }

  if (!garden) {
    return <p>Loading user garden...</p>;
  }

  if (!isSearch && garden.length === 0) {
    return <p>Your garden is empty. Add some plants!</p>;
  }

  return (
    <div className={component}>
      {plants.map((plant, index) => {
        const missingImgUrl =
          "https://dummyimage.com/150/53351d/008000&text=Image+Missing";

        let imgUrl =
          plant.imgUrl || plant.default_image?.thumbnail || missingImgUrl;

        // edge case for api images that we need more api access to see:
        if (imgUrl.includes("upgrade_access")) {
          imgUrl = missingImgUrl;
        }

        const name = plant.name || plant.common_name;
        const plantApiId = plant.plantApiId || plant.id;
        const isInGarden = getIsPlantInGarden(plantApiId);

        return (
          <Plant
            key={plantApiId + index}
            imgUrl={imgUrl}
            name={name}
            plantApiId={plantApiId}
            isInGarden={isInGarden}
            onClick={handlePlantAddRemove}
          />
        );
      })}
    </div>
  );
};

export default PlantList;
