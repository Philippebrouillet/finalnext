import React, { useContext, useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import ModalMap from "./ModalMap";
import { Context } from "../../Context/dataContext";
import calculateDistance from "../DistanceCalculator";
import { CombinedData } from "../../pages/index";
import { useWindowSize } from "react-use";
interface MapProps {
  allData: CombinedData[];
}

const Map: React.FC<MapProps> = ({ allData }) => {
  const {
    showOnMap,
    idMarker,
    setShowOnMap,
    setIdMarker,
    distance,
    setDistance,
  } = useContext(Context);

  function handleDistance(lat: number, long: number) {
    const distance = calculateDistance(lat, long);

    setDistance(distance);
  }

  function position(latitude: number, longitude: number) {
    const position = { lat: latitude, lng: longitude };
    return position;
  }

  const center = { lat: 45.73257306794853, lng: -0.3435314023816621 };

  const googleMapsApiKey =
    typeof process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY === "string"
      ? process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
      : "your-api-key";

  const options = {
    id: "google-map-script",
    googleMapsApiKey,
  };

  const { isLoaded } = useJsApiLoader(options);

  const { width } = useWindowSize();
  const isMobile = width <= 800;

  const containerStyleSticky = {
    position: "sticky",
    top: "0",
    left: "0",
    marginTop: "100px",

    height: isMobile ? "700px" : "100vh",
    width: isMobile ? "430px" : "700px",
    borderRadius: "10px",
    marginBottom: "50px",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.75)",
    WebkitBoxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.75)",
    MozBoxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.75)",
  };

  const containerStyle = {
    marginTop: "100px",
    width: "600px",
    height: "100vh",
    borderRadius: "10px",
    marginBottom: "50px",
  };

  const svgMarker = {
    path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
    fillColor: "black",
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 1,

    scale: 0.68,
  };

  // timer pour ajouter le style sticky a la map
  /////////////////////////////////////
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count <= 0) return;

    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);
  ///////////////////////////////////////////////////

  return isLoaded ? (
    <div className="mapContainer">
      <GoogleMap
        center={center}
        zoom={6}
        mapContainerStyle={
          count === 0
            ? containerStyleSticky
            : containerStyle || innerWidth > 800
        }
        options={{
          streetViewControl: false,
          zoomControl: false,
          disableDefaultUI: true,
        }}
      >
        <>
          {allData.map((data) => (
            <Marker
              key={data.id}
              onMouseOver={() => {
                handleDistance(data.location.lat, data.location.lng);

                setShowOnMap(true);
                setIdMarker(data.id);
              }}
              onMouseOut={() => {
                setShowOnMap(false);
                setIdMarker("");
                setDistance(0);
              }}
              position={position(data.location.lat, data.location.lng)}
              icon={showOnMap && idMarker === data.id ? "" : svgMarker}
            />
          ))}

          <Marker
            position={center}
            onMouseOver={() => {
              setShowOnMap(true);
              setIdMarker("centre");
            }}
            onMouseOut={() => {
              setShowOnMap(false);
              setIdMarker("");
            }}
            icon={showOnMap && idMarker === "centre" ? "" : svgMarker}
          />
        </>
      </GoogleMap>

      {showOnMap ? (
        <ModalMap distance={distance} allData={allData} idMarker={idMarker} />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Map;
