import { useCallback, useEffect, useState } from "react";
import HomeScreen from "./HomeScreen.jsx";
import "./App.css";
import {
  DEFAULT_LOCATION,
  fetchForecast,
  getPosition,
  mapForecast,
} from "./weather.js";

export default function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const place = await getPosition();
      setLocation(place);
      const raw = await fetchForecast(place);
      setForecast(mapForecast(raw));
    } catch (err) {
      setError(err.message || "Falha ao buscar o clima.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-shell">
      <HomeScreen
        location={location}
        forecast={forecast}
        error={error}
        loading={loading}
        onRetry={load}
        now={now}
      />
    </div>
  );
}
