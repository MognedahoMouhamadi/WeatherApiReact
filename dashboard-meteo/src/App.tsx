import { useEffect, useState } from "react";
import WeatherCard from "./assets/WeatherCard";
import { useWeather } from "./assets/useWeather";
import CitySearch from "./assets/CitySearch";

export default function App() {
  const [city, setCity] = useState("Paris");
  const { data, loading, error, load } = useWeather();

  // Charger Paris par défaut au démarrage
  useEffect(() => { load("Paris"); }, []); // eslint-disable-line

  const onSubmit = () => {
    load(city);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-6 bg-gradient-to-r from-blue-400 to-blue-600 p-6">
      <CitySearch
        value={city}
        onChange={setCity}
        onSubmit={onSubmit}
      />

      {loading && <div className="text-white/90 animate-pulse">Chargement…</div>}
      {error && <div className="text-red-100">Erreur : {error}</div>}
      {data && <WeatherCard {...data} />}
    </div>
  );
}
