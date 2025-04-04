import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    onSearch(searchValue);
  }

  return (
    <form style={styles} onSubmit={handleSearch}>
      <label>
        <div>
          <h2>Find a blog post</h2>
        </div>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />{" "}
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </label>
    </form>
  );
}
