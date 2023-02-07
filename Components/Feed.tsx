import React from "react";

import styles from "@/styles/Feed.module.css";
import stylesFerme from "@/styles/CardFerme.module.css";
import stylesProduit from "@/styles/CardProduit.module.css";
import CardFerme from "./Cards/CardFerme";
import CardProduit from "./Cards/CardProduit";

interface FermeProps {
  fermes: [
    {
      name: string;
      location: {
        lat: number;
        lng: number;
      };
      contact: {
        tel: string;
        nom: string;
        prenom: string;
        email: string;
      };
      id: string;
    }
  ];
  produits: [
    {
      name: string;
      alias: string;
      id: string;
      location: {
        lat: number;
        lng: number;
      };
    }
  ];
}

const Feed: React.FC<FermeProps> = ({ fermes, produits }) => {
  return (
    <div className={styles.feedContainer}>
      <ul className={stylesFerme.FermesContainer}>
        <h2 className={styles.titleStyle}>FERMES</h2>

        {fermes
          .sort((a, b) => a.location.lat + b.location.lat)
          .sort((a, b) => a.location.lng - b.location.lng)

          .map((ferme) => (
            <CardFerme key={ferme.id} ferme={ferme} />
          ))}
      </ul>

      <ul className={stylesProduit.ProduitContainer}>
        <h2 className={styles.titleStyle}>PRODUITS</h2>

        {produits
          .sort((a, b) => a.location.lat + b.location.lat)
          .sort((a, b) => a.location.lng - b.location.lng)

          .map((produit) => (
            <CardProduit key={produit.id} produit={produit} />
          ))}
      </ul>
    </div>
  );
};

export default Feed;
