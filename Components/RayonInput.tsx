import { Context } from "@/Context/dataContext";
import React, { useContext } from "react";
import styles from "@/styles/Search.module.css";

const RayonInput = () => {
  const { rayon, setRayon } = useContext(Context);
  return (
    <div className={styles.rangeRayonContainer}>
      <div className={styles.rangeRayonInput}>
        <div className={styles.rangeResetButton}>
          {rayon > 2300 ? (
            <button onClick={() => setRayon(2300)}>X</button>
          ) : (
            <></>
          )}
        </div>
        <input
          type="range"
          min="2300"
          max="600000"
          value={rayon}
          onChange={(e) => setRayon(Number(e.target.value))}
        />
      </div>

      <p>
        Rayon {""}
        {rayon >= 1000 ? Math.floor(rayon) / 1000 + "Km" : rayon + "M"}
      </p>
    </div>
  );
};

export default RayonInput;
