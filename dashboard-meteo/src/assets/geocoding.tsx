import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;
// Limite à 5 suggestions
export async function geoSuggest(query: string) {
  if (!query.trim()) return [];
  const url = "https://api.openweathermap.org/geo/1.0/direct";
  const res = await axios.get(url, { params: { q: query, limit: 5, appid: API_KEY } });
  // ex: [{ name, state, country, lat, lon }, ...]
  return res.data as Array<{
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon: number;
  }>;
}
// ex: [{ name, state, country, lat, lon }, ...]