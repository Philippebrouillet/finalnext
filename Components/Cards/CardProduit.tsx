import React, { useContext, useState } from "react";
import styles from "@/styles/CardProduit.module.css";
import img from "../../assets/imgnoir.jpg";
import { Context } from "../../Context/dataContext";
import Link from "next/link";
import calculateDistance from "../DistanceCalculator";
import Image from "next/image";
import infos from "../../assets/infosicon.png";

interface Produit {
  id: string;
  name: string;
  alias: string;
  location: {
    lat: number;
    lng: number;
  };
}

const CardProduit: React.FC<{ produit: Produit }> = ({ produit }) => {
  const {
    updateProduit,

    setAlias,
    setShowOnMap,
    setIdMarker,
    setDistance,
  } = useContext(Context);
  const [update, setUpdate] = useState(false);

  function handleDistance(lat: number, long: number) {
    const distance = calculateDistance(lat, long);

    setDistance(distance);
  }

  return (
    <li key={produit.id} className={styles.CardWrapperProduits}>
      <h1>
        {produit.name}{" "}
        <Image
          src={infos}
          alt="imgInfos"
          className={styles.infos}
          onMouseLeave={() => {
            setShowOnMap(false);
            setIdMarker("");
            setDistance(0);
          }}
          onMouseOver={() => {
            handleDistance(produit.location.lat, produit.location.lng);
            setShowOnMap(true);
            setIdMarker(produit.id);
          }}
        />
      </h1>

      <div>
        <Link href={`/${produit.id}`}>
          <Image
            loading="lazy"
            className="imgnoir"
            src={img}
            alt="imgnoir"
            onClick={() => {
              setIdMarker("");
            }}
          />
        </Link>
      </div>

      <p>Alias: {produit.alias} </p>

      {!update ? (
        <button onClick={() => setUpdate(true)}>Modifier</button>
      ) : (
        <div className={styles.UpdateAliasContainer}>
          <div className={styles.closeUpdateAlias}>
            <button onClick={() => setUpdate(false)}>X</button>
          </div>

          <div className={styles.textAlias}>
            <input
              type="text"
              onChange={(e) => {
                setAlias(e.target.value);
              }}
            />
          </div>

          <div className={styles.aliasBtn}>
            <button
              onClick={() => {
                updateProduit(produit.id, produit.alias);
                setUpdate(false);
              }}
            >
              Valider Modification
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default CardProduit;
