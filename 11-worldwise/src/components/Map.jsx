import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [searchPrams, setSearchParams] = useSearchParams();
  const lat = searchPrams.get("lat");
  const lng = searchPrams.get("lng");

  const nav = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => nav("form")}>
      <h1>
        lat:{lat},lng:{lng}
      </h1>
    </div>
  );
}

export default Map;
