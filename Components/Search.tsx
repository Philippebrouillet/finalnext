import React from "react";
import styles from "@/styles/Search.module.css";
import { CombinedData } from "../pages/index";
import RayonInput from "./RayonInput";
import SelectInput from "./SelectInput";
import SearchBar from "./SearchBar";

interface SearchProps {
  allData: CombinedData[];
}

const Search: React.FC<SearchProps> = ({ allData }) => {
  return (
    <div className={styles.searchContainer}>
      <SearchBar allData={allData} />
      <RayonInput />
      <SelectInput />
    </div>
  );
};

export default Search;
