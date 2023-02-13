import React, { useContext } from "react";
import styles from "@/styles/Feed.module.css";
import stylesFerme from "@/styles/CardFerme.module.css";
import stylesProduit from "@/styles/CardProduit.module.css";
import calculateDistance from "./DistanceCalculator";
import { FeedProps } from "./Feed";
import { Context } from "@/Context/dataContext";
import CardFerme from "./Cards/CardFerme";
import CardProduit from "./Cards/CardProduit";

const MobileFeed: React.FC<FeedProps> = ({ fermes, produits }) => {
  const { select, rayon } = useContext(Context);
  return (
    <div className={styles.feedContainer}>
      {select === "" ? (
        <div className={styles.feedContainer}>
          <ul className={stylesFerme.FermesContainer}>
            <h2 className={styles.titleStyle}>FERMES</h2>

            {fermes
              .sort(
                (a, b) =>
                  calculateDistance(a.location.lat, a.location.lng) -
                  calculateDistance(b.location.lat, b.location.lng)
              )
              .filter(
                (ferme) =>
                  calculateDistance(ferme.location.lat, ferme.location.lng) <
                  rayon
              )

              .map((ferme) => (
                <CardFerme key={ferme.id} ferme={ferme} />
              ))}
          </ul>

          <ul className={stylesProduit.ProduitContainer}>
            <h2 className={styles.titleStyle}>PRODUITS</h2>

            {produits
              .sort(
                (a, b) =>
                  calculateDistance(a.location.lat, a.location.lng) -
                  calculateDistance(b.location.lat, b.location.lng)
              )
              .filter(
                (produit) =>
                  calculateDistance(
                    produit.location.lat,
                    produit.location.lng
                  ) < rayon
              )
              .map((produit) => (
                <CardProduit key={produit.id} produit={produit} />
              ))}
          </ul>
        </div>
      ) : select === "Fermes" ? (
        <ul className={stylesFerme.FermesContainer}>
          <h2 className={styles.titleStyle}>FERMES</h2>

          {fermes
            .sort(
              (a, b) =>
                calculateDistance(a.location.lat, a.location.lng) -
                calculateDistance(b.location.lat, b.location.lng)
            )

            .filter(
              (ferme) =>
                calculateDistance(ferme.location.lat, ferme.location.lng) <
                rayon
            )
            .map((ferme) => (
              <CardFerme key={ferme.id} ferme={ferme} />
            ))}
        </ul>
      ) : select === "Produits" ? (
        <ul className={stylesProduit.ProduitContainer}>
          <h2 className={styles.titleStyle}>PRODUITS</h2>

          {produits
            .sort(
              (a, b) =>
                calculateDistance(a.location.lat, a.location.lng) -
                calculateDistance(b.location.lat, b.location.lng)
            )
            .filter(
              (produit) =>
                calculateDistance(produit.location.lat, produit.location.lng) <
                rayon
            )
            .map((produit) => (
              <CardProduit key={produit.id} produit={produit} />
            ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileFeed;
