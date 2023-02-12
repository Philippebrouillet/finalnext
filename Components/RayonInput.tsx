import { Context } from "@/Context/dataContext";
import React, { useContext } from "react";
import styles from "@/styles/Search.module.css";

const RayonInput = () => {
  const { rayon, setRayon } = useContext(Context);
  return (
    <div className={styles.rangeRayonContainer}>
      {rayon > 2300 || rayon < 2300 ? (
        <button onClick={() => setRayon(2300)}>X</button>
      ) : null}
      <input
        type="range"
        min="100"
        max="1000000"
        value={rayon}
        onChange={(e) => setRayon(Number(e.target.value))}
      />

      <p>
        Rayon {""}
        {rayon >= 1000 ? Math.floor(rayon) / 1000 + "Km" : rayon + "M"}
      </p>
    </div>
  );
};

export default RayonInput;
