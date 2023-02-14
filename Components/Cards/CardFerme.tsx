import React, { useContext } from "react";
import styles from "@/styles/CardFerme.module.css";
import infos from "../../assets/infosicon.png";
import img from "../../assets/imgnoir.jpg";
import Link from "next/link";
import { Context } from "../../Context/dataContext";
import calculateDistance from "../DistanceCalculator";
import Image from "next/image";

interface Ferme {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    prenom: string;
    nom: string;
    email: string;
    tel: string;
  };
  img: string;
}

interface Props {
  ferme: Ferme;
}
const CardFerme: React.FC<Props> = ({ ferme }) => {
  const { setShowOnMap, setIdMarker, setDistance } = useContext(Context);

  function handleDistance(lat: number, long: number) {
    const distance = calculateDistance(lat, long);
    setDistance(distance);
  }

  return (
    <li key={ferme.id} className={styles.CardWrapperFerme}>
      <h1>
        {ferme.name}{" "}
        <Image
          src={infos}
          alt="imgInfos"
          className={styles.infos}
          onMouseOver={() => {
            handleDistance(ferme.location.lat, ferme.location.lng);
            setShowOnMap(true);
            setIdMarker(ferme.id);
          }}
          onMouseLeave={() => {
            setShowOnMap(false);
            setIdMarker("");
            setDistance(0);
          }}
        />
      </h1>
      <div>
        <Link href={`/${ferme.id}`}>
          <Image
            priority={true}
            className="imgData"
            onClick={() => {
              setIdMarker("");
            }}
            src={ferme.img}
            width={1}
            height={1}
            alt="imgFerme"
          />
        </Link>
      </div>
      <div className={styles.contactWrapper}>
        <div>
          <h3>Contact:</h3>
        </div>
        <div className={styles.infosContact}>
          <p>{ferme.contact.prenom}</p>
          <p>{ferme.contact.nom}</p>
          <p>{ferme.contact.email}</p>
          <p>{ferme.contact.tel}</p>
        </div>
      </div>
    </li>
  );
};

export default CardFerme;
