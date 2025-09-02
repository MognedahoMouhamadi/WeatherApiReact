// Réponse brute OpenWeather (partielle, utile pour le "current weather")

export interface WeatherAPIResponse {
  name: string;
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  sys?: { country?: string };
}

// Modèle "nettoyé" pour l'UI (ce que consommera WeatherCard)
export interface WeatherCardData {
  city: string;
  dateLabel: string; 
  temp: number;    // ex: "2 sept."
  tempMax: number;
  tempMin: number;
  description: string;   // ex: "ciel dégagé"
  icon: string;          // ex: "01d"
}

export default function WeatherCard({
  city, dateLabel, tempMax, tempMin, description, icon, temp,
}: WeatherCardData) {
  return (
    <div className="w-[300px] aspect-video rounded-lg shadow bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-semibold">{city}</h2>
      <p className="text-sm text-gray-400">{dateLabel}</p>

      {/* Icône météo officielle */}
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-24 h-24"
      />
    <div className="text-xl font-semibold">
        {temp}°C
      </div>
      <div className="mb-2 text-3xl font-semibold">
        {tempMax}° / {tempMin}°
      </div>
      <p className="text-gray-400 capitalize">{description}</p>
    </div>
  );
}
