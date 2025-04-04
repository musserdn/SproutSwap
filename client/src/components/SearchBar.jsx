import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch, placeholder }) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    onSearch(searchValue);
  }

  return (
    <form style={styles} onSubmit={handleSearch}>
        <input type="text" placeholder={placeholder} onChange={(e) => setSearchValue(e.target.value)} />{" "}
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
    </form>
  );
}
