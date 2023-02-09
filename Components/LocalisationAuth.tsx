import React, { useState, useEffect } from "react";
import calculateDistance from "./DistanceCalculator";

interface Coordinates {
  lat: number;
  lng: number;
}
//function qui permet de récupérer la position de l'utilisateur
function LocalisationAuth() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [localisation, setLocalisation] = useState(0);

  //convertion de la distance si c'est en Km ou m
  const distanceConvert =
    localisation >= 1000 ? localisation / 1000 : localisation;

  //obtenir la position de l'utilisateur
  function GetCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  //function pour calculer la distance de l'utilisateur au point central
  function handleDistance(lat: number, long: number) {
    const distance = calculateDistance(lat, long);

    setLocalisation(distance);
  }

  useEffect(() => {
    if (coordinates.lat === 0) {
      GetCurrentPosition();
    } else if (coordinates.lat > 0) {
      handleDistance(coordinates.lat, coordinates.lng);
    }
  }, [coordinates]);

  return (
    <div>
      <p>
        Vous êtes situé à {Math.floor(distanceConvert)}{" "}
        {localisation < 1000 ? "metres" : "Km"} du point central
      </p>
    </div>
  );
}

export default LocalisationAuth;
