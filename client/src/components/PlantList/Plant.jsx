import { Link } from "react-router-dom";
import { component } from "./Plant.module.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";



export default function Plant(props) {
  const imgUrl = props.imgUrl;
  const name = props.name;
  const plantApiId = props.plantApiId;
  const onClick = props.onClick;

  const [isInGarden, setIsInGarden] = useState(props.isInGarden);

  function handleOnClick(e) {
    e.preventDefault();

    // update button!
    setIsInGarden(!isInGarden);

    onClick({ imgUrl, name, plantApiId });
  }

  return (
    <Link to={`/PlantDetails/${plantApiId}`} className={component}>
      <div>
        <img src={imgUrl || missingImgUrl} alt={name || "Unknown Plant"} />
        <p>{name || "Unknown Plant"}</p>

        <button onClick={handleOnClick} style={{backgroundColor: `${isInGarden? "#ffdddd": "#ddffdd"}`}}>
          {isInGarden ? (
            <>
              <FaTrash /> Remove
            </>
          ) : (
            <>
              <FaPlus /> Add
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
