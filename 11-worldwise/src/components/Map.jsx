/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCity } from "../contexts/CityContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import Spinner from "./Spinner";
import { useUrlPostion } from "../hooks/useUrlPostion";

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState([40, 0]);

  const [lat, lng] = useUrlPostion();

  const { cities } = useCity();

  const {
    getPosition,
    position: geoPosition,
    isLoading: geoLoading,
  } = useGeolocation();

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );

  if (geoLoading) return <Spinner />;

  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={() => getPosition()}>
        Get current location
      </Button>
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
        <ChangeMap position={position} />
        <GetForm />
      </MapContainer>
    </div>
  );
}

function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function GetForm() {
  const nav = useNavigate();

  useMapEvent({
    click: (e) => nav(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
