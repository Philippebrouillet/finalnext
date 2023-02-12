import { Context } from "@/Context/dataContext";
import React, { useContext } from "react";
import styles from "@/styles/Search.module.css";

const SelectInput = () => {
  const { setSelect, isMobile, select } = useContext(Context);
  return isMobile ? (
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
  );
};

export default SelectInput;
