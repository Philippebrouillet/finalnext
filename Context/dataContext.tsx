import { updateDoc, doc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../firebase/clientApp";
import { useRouter } from "next/navigation";

interface Suggestion {
  id: string;
  key?: number;
  name: string;
}

interface ContextData {
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
}

export const Context = createContext<ContextData>({
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
});

const { Provider } = Context;

const ContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [distance, setDistance] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [Alias, setAlias] = useState("");
  const [showOnMap, setShowOnMap] = useState(false);
  const [idMarker, setIdMarker] = useState("");
  const router = useRouter();
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
      }}
    >
      {props.children}
    </Provider>
  );
};

export default ContextProvider;
