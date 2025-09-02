import WeatherCard from "./assets/WeatherCard";
import React, { useState } from "react";
import { useWeather } from "./assets/useWeather";

function App() {
  const [city, setCity] = useState("Paris");


  const { data, loading, error, load } = useWeather();
   const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    load(city);
  };

  return (


    <div>
      <div className="p-6">
      <WeatherCard
        city="Paris"
        temp={20}
        description="Ensoleillé"
        icon="/path/to/icon.png" dateLabel={""} tempMax={0} tempMin={0}      />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-blue-400 to-blue-600 p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
                <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
          className="px-3 py-2 rounded-lg outline-none border"
              />
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Rechercher
            </button>
        </form>

      {loading && <p className="text-white/90">Chargement…</p>}
      {error && <p className="text-red-100">Erreur : {error}</p>}

      {data && <WeatherCard {...data} />}
    </div>


    </div>
  );
}

export default App
