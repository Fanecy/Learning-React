import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCity } from "../contexts/CityContext";

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [searchPrams, setSearchParams] = useSearchParams();
  const lat = searchPrams.get("lat");
  const lng = searchPrams.get("lng");

  const { cities } = useCity();

  const position = [lat, lng];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <br /> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {}
      </MapContainer>
    </div>
  );
}

export default Map;
