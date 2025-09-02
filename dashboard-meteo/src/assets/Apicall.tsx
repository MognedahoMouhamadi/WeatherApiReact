import axios from "axios";
import type { WeatherAPIResponse, WeatherCardData } from "./WeatherCard";

// ⚠️ Définis ta clé dans un .env.local : VITE_OPENWEATHER_KEY=xxxx
const API_KEY = import.meta.env.VITE_API_KEY as string;
const BASE_URL = import.meta.env.VITE_URL as string;

if (!API_KEY) {
  // Ça évite de chercher 2h si la clé n'est pas chargée
  // (s'affichera dans la console au démarrage dev)
  console.warn("⚠️ VITE_OPENWEATHER_KEY manquante dans .env.local");
}

// --- Helpers -------------------------------------------------------
const client = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "fr",
  },
});

// Normalise la réponse brute -> format simple pour WeatherCard
export function toWeatherCardData(data: WeatherAPIResponse): WeatherCardData {
  const date = new Date(data.dt * 1000);
  const dateLabel = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    dateLabel,
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    description: data.weather[0]?.description ?? "",
    icon: data.weather[0]?.icon ?? "01d",
  };
}

// --- API calls -----------------------------------------------------

/** Météo actuelle par ville (réponse brute) */
export async function fetchCurrentByCity(city: string) {
  const res = await client.get<WeatherAPIResponse>("/weather", {
    params: { q: city },
  });
  return res.data;
}

/** Météo actuelle par ville (déjà normalisée pour l’UI) */
export async function getWeatherCardData(city: string): Promise<WeatherCardData> {
  const raw = await fetchCurrentByCity(city);
  return toWeatherCardData(raw);
}

/** (Optionnel) Prévisions 5 jours/3h si tu en as besoin plus tard 
export async function fetchForecastByCity(city: string) {
  const res = await client.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: "metric", lang: "fr" },
  });
  return res.data; // tu pourras faire un mapper similaire pour un "ForecastCardData[]"
}
*/