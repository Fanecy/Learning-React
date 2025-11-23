/* eslint-disable react/prop-types */
import { useEffect, useState, createContext, useContext } from "react";
const BASE_URL = "http://localhost:8000";

const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const json = await fetch(`${BASE_URL}/cities`);
        const data = await json.json();
        setCities(data);
      } catch {
        alert("Wrong with city loading.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Wrong with city loading.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: { "content-type": "application/json" },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("Wrong with city adding.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities(cities.filter((city) => city.id !== id));
    } catch {
      alert("Wrong with city deleting.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) throw new Error("Context out of range");
  return context;
}

export { CityProvider, useCity };
