/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CityContext";

function CityList() {
  const { isLoading, cities } = useCity();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={"Please add new cities!🦓"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
