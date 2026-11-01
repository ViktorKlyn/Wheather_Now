const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/reverse";

export const DEFAULT_LOCATION = {
  latitude: -23.5505,
  longitude: -46.6333,
  city: "Londrina",
  region: "Brasil",
};

const WMO = {
  0: { label: "Céu limpo", icon: "sun" },
  1: { label: "Principalmente limpo", icon: "sun" },
  2: { label: "Parcialmente nublado", icon: "partly" },
  3: { label: "Nublado", icon: "cloud" },
  45: { label: "Neblina", icon: "fog" },
  48: { label: "Neblina com geada", icon: "fog" },
  51: { label: "Garoa leve", icon: "drizzle" },
  53: { label: "Garoa", icon: "drizzle" },
  55: { label: "Garoa forte", icon: "drizzle" },
  61: { label: "Chuva fraca", icon: "rain" },
  63: { label: "Chuva", icon: "rain" },
  65: { label: "Chuva forte", icon: "rain" },
  71: { label: "Neve fraca", icon: "snow" },
  73: { label: "Neve", icon: "snow" },
  75: { label: "Neve forte", icon: "snow" },
  80: { label: "Pancadas leves", icon: "rain" },
  81: { label: "Pancadas", icon: "rain" },
  82: { label: "Pancadas fortes", icon: "storm" },
  95: { label: "Trovoada", icon: "storm" },
  96: { label: "Trovoada com granizo", icon: "storm" },
  99: { label: "Trovoada intensa", icon: "storm" },
};

export function describeWeather(code) {
  return WMO[code] ?? { label: "Tempo variável", icon: "cloud" };
}

export function weekdayShort(isoDate, locale = "pt-BR") {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat(locale, { weekday: "short" })
    .format(date)
    .replace(".", "")
    .replace(/^./, (c) => c.toUpperCase());
}

export function formatHour(iso) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatClock(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function reverseGeocode(latitude, longitude) {
  const url = `${GEO_URL}?latitude=${latitude}&longitude=${longitude}&language=pt&format=json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const place = data?.results?.[0] ?? data;
  const city =
    place?.name || place?.city || place?.admin2 || DEFAULT_LOCATION.city;
  const region = place?.admin1 || place?.country || DEFAULT_LOCATION.region;
  return { city, region };
}

export async function getPosition() {
  if (!navigator.geolocation) return DEFAULT_LOCATION;

  try {
    const coords = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      });
    });
    const latitude = coords.coords.latitude;
    const longitude = coords.coords.longitude;
    const place = await reverseGeocode(latitude, longitude);
    return {
      latitude,
      longitude,
      city: place?.city ?? DEFAULT_LOCATION.city,
      region: place?.region ?? DEFAULT_LOCATION.region,
    };
  } catch {
    return DEFAULT_LOCATION;
  }
}

export async function fetchForecast({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,uv_index",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Não foi possível carregar o clima.");
  return res.json();
}

export function mapForecast(data) {
  const current = data.current;
  const now = new Date(current.time);
  const hourly = data.hourly.time
    .map((time, index) => ({
      time,
      temperature: Math.round(data.hourly.temperature_2m[index]),
      code: data.hourly.weather_code[index],
      rainChance: data.hourly.precipitation_probability[index],
    }))
    .filter((item) => new Date(item.time).getTime() + 60 * 60 * 1000 > now.getTime())
    .slice(0, 12);

  if (hourly[0]) {
    hourly[0] = {
      ...hourly[0],
      temperature: Math.round(current.temperature_2m),
      code: current.weather_code,
    };
  }

  const daily = data.daily.time.map((date, index) => ({
    date,
    code: data.daily.weather_code[index],
    max: Math.round(data.daily.temperature_2m_max[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
    rainChance: data.daily.precipitation_probability_max[index],
  }));

  return {
    current: {
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      wind: Math.round(current.wind_speed_10m),
      uv: Math.round(current.uv_index ?? 0),
      precipitation: current.precipitation,
      isDay: Boolean(current.is_day),
      code: current.weather_code,
    },
    hourly,
    daily,
  };
}
