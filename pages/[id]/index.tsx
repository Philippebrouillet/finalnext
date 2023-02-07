import React from "react";
import styles from "@/styles/CardInfos.module.css";
import { collection, getDocs } from "firebase/firestore";
import CardInfos from "@/Components/forPageInfos/CardInfos";
import { db } from "@/firebase/clientApp";

export interface infosProps {
  Post: {
    name: string;
    alias?: string;
    contact?: {
      prenom: string;
      nom: string;
      email: string;
      tel: number;
    };
  };
}

const index: React.FC<infosProps> = ({ Post }) => {
  return (
    <div className={styles.pageInfosContainer}>
      <CardInfos Post={Post} />
    </div>
  );
};

export default index;

export async function getServerPath() {
  const ProduitsCollectionRef = collection(db, "Produits");
  const res = await getDocs(ProduitsCollectionRef);
  const PRODUITS = res.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    location: {
      lat: doc.data().location.latitude,
      lng: doc.data().location.longitude,
    },
  }));

  const fermesCollectionRef = collection(db, "fermes");
  const res2 = await getDocs(fermesCollectionRef);
  const FERMES = res2.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    location: {
      lat: doc.data().location.latitude,
      lng: doc.data().location.longitude,
    },
  }));

  const allData = FERMES.concat(PRODUITS);
  const paths = allData.map((post) => ({ params: { id: post.id } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const ProduitsCollectionRef = collection(db, "Produits");
  const res = await getDocs(ProduitsCollectionRef);
  const PRODUITS = res.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    location: {
      lat: doc.data().location.latitude,
      lng: doc.data().location.longitude,
    },
  }));

  const fermesCollectionRef = collection(db, "fermes");
  const res2 = await getDocs(fermesCollectionRef);
  const FERMES = res2.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    location: {
      lat: doc.data().location.latitude,
      lng: doc.data().location.longitude,
    },
  }));

  const allData = FERMES.concat(PRODUITS);
  const Post = allData
    .filter((post) => post.id === params.id)
    .map((post) => ({ props: { Post: post } }))[0];

  return Post;
}
