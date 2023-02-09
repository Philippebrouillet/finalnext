import React, { useEffect, useState } from "react";
import styles from "@/styles/ModalMap.module.css";
import { CombinedData } from "../../pages/index";

interface ModalMapProps {
  allData: CombinedData[];
  idMarker: string;
  distance: number;
}

const ModalMap: React.FC<ModalMapProps> = ({ allData, idMarker, distance }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setActive(true);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const distanceConvert = distance >= 1000 ? distance / 1000 : distance;
  return (
    <div>
      {idMarker === "centre" ? (
        <div
          className={styles.modalContainer}
          style={
            active
              ? {
                  position: "fixed",
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translateY(12%) translateX(-100%)",
                  opacity: "1",
                }
              : { transform: "translateY(-2000)" }
          }
        >
          <h4>Point central</h4>
          <p>img</p>
          <p>adresse...</p>
        </div>
      ) : (
        <div>
          {" "}
          {allData
            .filter((data) => data.id === idMarker)
            .map((data) => (
              <div
                key={data.id}
                className={styles.modalContainer}
                style={
                  active
                    ? {
                        position: "fixed",
                        left: mousePosition.x,
                        top: mousePosition.y,
                        transform: "translateY(12%) translateX(-100%)",
                        opacity: "1",
                      }
                    : { transform: "translateY(-2000)" }
                }
              >
                <h4>{data.name}</h4>
                <p>{data.alias ? "Alias: " + data.alias : null}</p>
                <p>img</p>
                <p>adresse...</p>
                <p>
                  Situé à {Math.floor(distanceConvert)}{" "}
                  {distance < 1000 ? "metres" : "Km"} du point central
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ModalMap;
