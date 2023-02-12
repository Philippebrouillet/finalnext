import { updateDoc, doc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../firebase/clientApp";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";

interface Suggestion {
  id: string;
  key?: number;
  name: string;
}

interface ContextData {
  rayon: number;
  setRayon: React.Dispatch<React.SetStateAction<number>>;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Suggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
  Alias: string;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
  updateProduit: (id: string, alias: string) => Promise<void>;
  showOnMap: boolean;
  setShowOnMap: React.Dispatch<React.SetStateAction<boolean>>;
  idMarker: string;
  setIdMarker: React.Dispatch<React.SetStateAction<string>>;
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
}

export const Context = createContext<ContextData>({
  rayon: 0,
  setRayon: () => {},
  select: "",
  setSelect: () => {},
  searchValue: "",
  setSearchValue: () => {},
  suggestions: [],
  setSuggestions: () => {},
  Alias: "",
  setAlias: () => {},
  updateProduit: () => Promise.resolve(),
  showOnMap: false,
  setShowOnMap: () => {},
  idMarker: "",
  setIdMarker: () => {},
  distance: 0,
  setDistance: () => {},
  isMobile: true,
});

const { Provider } = Context;

const ContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  //initialisation de plusieurs const state en useContext pour permettre au différents composants d'intéragir entre eux
  //permet de contenir la distance entre 2 point de géolocalisation
  const [distance, setDistance] = useState(0);
  //permet de contenir la valeur de l'input recherche
  const [searchValue, setSearchValue] = useState("");
  //permet de contenir les suggestions qui s'affichent sous l'input recherche
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  //permet de contenir la valeur de l'alias pour le modifier
  const [Alias, setAlias] = useState("");
  //permet de changer l'image du marker google map en fonction de false ou true
  const [showOnMap, setShowOnMap] = useState(false);
  //permet de filtrer la data a afficher dans la modalMap
  const [idMarker, setIdMarker] = useState("");
  //permet de contenir l'option séléctionné dans le formulaire de type select
  const [select, setSelect] = useState("");
  const [rayon, setRayon] = useState(2300);

  const router = useRouter();

  //utilisé pour modifier l'application en function d'une taille d'écran (utilisé dans le composant Map, Search, Feed)
  const { width } = useWindowSize();
  const isMobile = width <= 650;

  //function qui permet de modifier L'alias des produits.
  const updateProduit = async (id: string, alias: string) => {
    const aliasDoc = doc(db, "Produits", id);
    const newAlias = { alias: (alias = Alias) };

    await updateDoc(aliasDoc, newAlias);

    router.push("/");
  };

  return (
    <Provider
      value={{
        rayon,
        setRayon,
        searchValue,
        setSearchValue,
        suggestions,
        setSuggestions,
        Alias,
        setAlias,
        updateProduit,
        showOnMap,
        setShowOnMap,
        idMarker,
        setIdMarker,
        distance,
        setDistance,
        select,
        setSelect,
        isMobile,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default ContextProvider;
