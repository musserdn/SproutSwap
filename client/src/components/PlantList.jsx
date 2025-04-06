import React from "react";

const PlantList = ({ plants }) => {
  if (!plants || plants.length === 0) {
    return <p>No plants found. Try a different search term.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
      {plants.map((plant) => (
        <div
          key={plant.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            textAlign: "center",
            width: "150px",
          }}
        >
          <img
            src={plant.default_image?.thumbnail || "https://dummyimage.com/150/53351d/008000&text=Image+Missing"}
            alt={plant.common_name || "Unknown Plant"}
            style={{ width: "100%", borderRadius: "4px" }}
          />
          <p>{plant.common_name || "Unknown Plant"}</p>
        </div>
      ))}
    </div>
  );
};

export default PlantList;