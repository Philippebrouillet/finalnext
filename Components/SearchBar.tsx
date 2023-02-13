import React, { useContext } from "react";
import styles from "@/styles/Search.module.css";
import { Context } from "@/Context/dataContext";
import { CombinedData } from "../pages/index";
import SuggestionSearch from "./SuggestionSearch";

interface SearchProps {
  allData: CombinedData[];
}

const SearchBar: React.FC<SearchProps> = ({ allData }) => {
  const { setSuggestions, setSearchValue, searchValue } = useContext(Context);

  function updateSuggestions(inputValue: string) {
    //filtrage des données pour les injecters à la variable Suggestion
    const filteredSuggestions = allData.filter((suggestions) =>
      suggestions.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }

  function inputSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;
    // conditions pour éviter des érreurs dans la console ou des crash du site
    //quand on tappe dans la barre de recherche
    if (newValue.includes("@")) {
      newValue = newValue.replace("@", "");
    } else if (newValue.includes("?")) {
      newValue = newValue.replace("?", "");
    } else if (newValue.includes("-")) {
      newValue = newValue.replace("-", "");
    } else if (newValue.includes("(")) {
      newValue = newValue.replace("(", "");
    } else if (newValue.includes(")")) {
      newValue = newValue.replace(")", "");
    } else if (newValue.includes("[")) {
      newValue = newValue.replace("[", "");
    } else if (newValue.includes("]")) {
      newValue = newValue.replace("]", "");
    } else if (newValue.includes("\\")) {
      newValue = newValue.replace("\\", "");
    }

    setSearchValue(newValue);
    updateSuggestions(newValue);
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.group}>
        <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          maxLength={30}
          className={styles.searchBox}
          type="search"
          placeholder="Search here"
          onChange={inputSearchValueChange}
          value={searchValue}
        />
      </div>
      <SuggestionSearch />
    </div>
  );
};

export default SearchBar;
