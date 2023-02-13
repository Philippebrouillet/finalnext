import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Search.module.css";
import Link from "next/link";
import { Context } from "@/Context/dataContext";

const SuggestionSearch = () => {
  const { setSearchValue, searchValue, suggestions } = useContext(Context);

  //pour faire un effet sur la barre de recherche a sont apparition
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (searchValue.length > 0 && active === false) {
      setActive(true);
    } else if (searchValue.length === 0 && active === true) {
      setActive(false);
    }
  }, [active, searchValue.length]);

  return (
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
  );
};

export default SuggestionSearch;
