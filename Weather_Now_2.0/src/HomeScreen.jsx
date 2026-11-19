import { WeatherIcon, PinIcon } from "./icons.jsx";
import { describeWeather, formatClock, formatHour, weekdayShort } from "./weather.js";

function Skeleton() {
  return (
    <div className="home" aria-busy="true">
      <div className="pulse title-skel" />
      <div className="pulse hero-skel" />
      <div className="pulse card-skel" />
      <div className="pulse card-skel tall" />
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="home error-wrap">
      <p className="error-copy">{message}</p>
      <button type="button" className="retry" onClick={onRetry}>
        Tentar de novo
      </button>
    </div>
  );
}

export default function HomeScreen({ location, forecast, error, loading, onRetry, now }) {
  if (loading) return <Skeleton />;
  if (error || !forecast) {
    return <ErrorState message={error || "Sem dados de clima."} onRetry={onRetry} />;
  }

  const { current, hourly, daily } = forecast;
  const weather = describeWeather(current.code);
  const today = daily[0];

  return (
    <main className={`home ${current.isDay ? "day" : "night"}`}>
      <header className="topbar">
        <div className="place">
          <PinIcon />
          <div>
            <h1>{location.city}</h1>
            <p>{location.region}</p>
          </div>
        </div>
        <p className="clock">{formatClock(now)}</p>
      </header>

      <section className="hero" aria-label="Clima atual">
        <WeatherIcon name={weather.icon} size={92} />
        <p className="temp">
          {current.temperature}
          <span>°</span>
        </p>
        <p className="condition">{weather.label}</p>
        <p className="range">
          Máx. {today?.max ?? "—"}° · Mín. {today?.min ?? "—"}°
        </p>
        <p className="feels">Sensação de {current.feelsLike}°</p>
      </section>

      <section className="panel" aria-label="Próximas horas">
        <div className="panel-head">
          <h2>Próximas horas</h2>
        </div>
        <ul className="hours">
          {hourly.map((slot, index) => {
            const meta = describeWeather(slot.code);
            return (
              <li key={slot.time}>
                <span>{index === 0 ? "Agora" : formatHour(slot.time)}</span>
                <WeatherIcon name={meta.icon} size={30} />
                <strong>{slot.temperature}°</strong>
                <em>{slot.rainChance}%</em>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="panel" aria-label="Próximos dias">
        <div className="panel-head">
          <h2>7 dias</h2>
        </div>
        <ul className="days">
          {daily.map((day, index) => {
            const meta = describeWeather(day.code);
            return (
              <li key={day.date}>
                <span className="day-name">
                  {index === 0 ? "Hoje" : weekdayShort(day.date)}
                </span>
                <WeatherIcon name={meta.icon} size={26} />
                <span className="rain">{day.rainChance}%</span>
                <span className="temps">
                  <b>{day.max}°</b>
                  <i>{day.min}°</i>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="metrics" aria-label="Detalhes">
        <article>
          <span>Umidade</span>
          <strong>{current.humidity}%</strong>
        </article>
        <article>
          <span>Vento</span>
          <strong>{current.wind} km/h</strong>
        </article>
        <article>
          <span>UV</span>
          <strong>{current.uv}</strong>
        </article>
        <article>
          <span>Chuva</span>
          <strong>{current.precipitation} mm</strong>
        </article>
      </section>
    </main>
  );
}
