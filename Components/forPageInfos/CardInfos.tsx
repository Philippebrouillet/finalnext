import React from "react";

import styles from "@/styles/CardInfos.module.css";
import { infosProps } from "../../pages/[id]/index";

const CardInfos: React.FC<infosProps> = ({ Post }) => {
  return (
    <div className={styles.cardInfosContainer}>
      <div>
        <div>
          <h1>{Post.name}</h1>
          {Post.alias ? "Alias: " + Post.alias : null}

          <p>img</p>
          <p>adresse...</p>
          <p
            className={
              Post.contact ? styles.paragraphcontact : styles.paragraph
            }
          >
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            dolorem ab voluptatibus praesentium corrupti? Consectetur a repellat
            consequuntur ipsam dignissimos molestias deserunt, illum commodi
            debitis, odit soluta velit vitae, facilis impedit voluptas nostrum
            qui earum magni id itaque reiciendis tempore. Itaque est optio
            nesciunt eveniet cupiditate, cum officia quo. Blanditiis ipsam
            dolores dolore aut non distinctio, quae, sit suscipit voluptates
            quasi iusto, possimus eius sunt! Facilis sit sed reiciendis quam
            molestias, similique, voluptate corrupti commodi recusandae fuga
            voluptatibus necessitatibus. Eius reiciendis illo error quos
            perspiciatis vitae expedita ipsam officiis repellendus officia,
          </p>

          {Post.contact ? (
            <div className={styles.infosContact}>
              <h4>Contact:</h4>
              <p>{Post.contact.prenom}</p>
              <p>{Post.contact.nom}</p>
              <p>{Post.contact.email}</p>
              <p>{Post.contact.tel}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardInfos;
