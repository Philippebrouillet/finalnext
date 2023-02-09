import React, { useContext, useEffect, useState } from "react";

import styles from "@/styles/Search.module.css";

import { Context } from "@/Context/dataContext";
import Link from "next/link";
import { CombinedData } from "../pages/index";

interface SearchProps {
  allData: CombinedData[];
}

const Search: React.FC<SearchProps> = ({ allData }) => {
  const {
    setSuggestions,
    setSearchValue,
    searchValue,
    suggestions,
    setSelect,
    isMobile,
    select,
  } = useContext(Context);

  //pour faire un effet sur la barre de recherche a sont apparition
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (searchValue.length > 0 && active === false) {
      setActive(true);
    } else if (searchValue.length === 0 && active === true) {
      setActive(false);
    }
  }, [active, searchValue.length]);

  // conditions pour éviter des érreurs dans la console ou des crash du site
  //quand on tappe dans la barre de recherche
  function inputSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;
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

  function updateSuggestions(inputValue: string) {
    //filtrage des données pour les injecters à la variable Suggestion
    const filteredSuggestions = allData.filter((suggestions) =>
      suggestions.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }

  return (
    <div className={styles.searchContainer}>
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
        <ul
          className={active ? styles.activeSearch : styles.suggestionSearch}
          style={
            searchValue.length > 0
              ? { transform: "translateY(0px)" }
              : { transform: "translateY(-2000px)" }
          }
        >
          {suggestions
            .slice(0, 4)
            .map((suggestion: { id: string; name: string }) => (
              <div key={suggestion.id}>
                <Link href={`/${suggestion.id}`}>
                  <li
                    className={styles.searchItem}
                    onClick={() => {
                      setSearchValue("");
                    }}
                  >
                    {suggestion.name}
                  </li>
                </Link>
              </div>
            ))}
        </ul>
      </div>
      {isMobile ? (
        <div className={styles.selectFormContainer}>
          <form className={styles.selectForm}>
            <label>
              <select
                className={styles.selectBox}
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                {select.length === 0 ? (
                  <option value="Selectionner">Selectionner</option>
                ) : null}
                <option value="Fermes">Fermes</option>
                <option value="Produits">Produits</option>
              </select>
            </label>
          </form>

          {select.includes("Fermes") || select.includes("Produits") ? (
            <button
              className={styles.buttonResetSelect}
              onClick={() => setSelect("")}
            >
              X
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
