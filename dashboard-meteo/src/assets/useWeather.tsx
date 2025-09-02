import { useState } from "react";
import { getWeatherCardData } from "../assets/Apicall";
import type { WeatherCardData } from "../assets/WeatherCard";

export function useWeather() {
  const [data, setData] = useState<WeatherCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(city: string) {
    try {
      setLoading(true);
      setError(null);
      const result = await getWeatherCardData(city);
      setData(result);
    } catch (e: any) {
      const msg = e?.response?.data?.message || e?.message || "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, load };
}

