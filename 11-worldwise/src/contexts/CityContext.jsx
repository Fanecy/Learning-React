/* eslint-disable react/prop-types */
import { useEffect, createContext, useContext, useReducer } from "react";
const BASE_URL = "http://localhost:8000";

const CityContext = createContext();

const initState = { cities: [], isLoading: false, currentCity: {}, error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "cities/rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Reducer unknown type");
  }
}

function CityProvider({ children }) {
  const [
    { cities, isLoading, currentCity, setCities, setIsLoading },
    dispatch,
  ] = useReducer(reducer, initState);
  /* const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); */

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "cities/loading" });
        const json = await fetch(`${BASE_URL}/cities`);
        const data = await json.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "cities/rejected",
          payload: "Something wrong with fetching cities",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "cities/loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "cities/rejected",
        payload: "Something wrong with fetching  city",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "cities/loading" });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: { "content-type": "application/json" },
      });
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "cities/rejected",
        payload: "Something wrong with city creating city",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "cities/loading" });
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "cities/rejected",
        payload: "Something wrong with deleting city",
      });
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
