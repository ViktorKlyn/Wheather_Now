export function WeatherIcon({ name, size = 28 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true,
  };

  switch (name) {
    case "sun":
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="9" fill="#FFD56A" />
          <path
            d="M24 6v4M24 38v4M6 24h4M38 24h4M11.6 11.6l2.8 2.8M33.6 33.6l2.8 2.8M11.6 36.4l2.8-2.8M33.6 14.4l2.8-2.8"
            stroke="#FFD56A"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "partly":
      return (
        <svg {...props}>
          <circle cx="18" cy="18" r="7" fill="#FFD56A" />
          <path
            d="M16 32h16a7 7 0 0 0 .4-14 10 10 0 0 0-19.2 3A7.5 7.5 0 0 0 16 32Z"
            fill="#EEF4FF"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path
            d="M14 34h19a8 8 0 0 0 .5-16 11 11 0 0 0-21.2 3.2A8.5 8.5 0 0 0 14 34Z"
            fill="#E8EEF9"
          />
        </svg>
      );
    case "fog":
      return (
        <svg {...props}>
          <path
            d="M13 24h20M11 29h24M15 34h16"
            stroke="#D7E0F0"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "drizzle":
      return (
        <svg {...props}>
          <path
            d="M14 25h18a7 7 0 0 0 .4-14 10 10 0 0 0-19.3 3A7.5 7.5 0 0 0 14 25Z"
            fill="#E8EEF9"
          />
          <path
            d="M18 31v4M24 30v5M30 31v4"
            stroke="#8EC8FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "rain":
      return (
        <svg {...props}>
          <path
            d="M14 23h18a7 7 0 0 0 .4-14 10 10 0 0 0-19.3 3A7.5 7.5 0 0 0 14 23Z"
            fill="#E8EEF9"
          />
          <path
            d="M17 29l-2 8M24 28l-2 9M31 29l-2 8"
            stroke="#6BB6FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "storm":
      return (
        <svg {...props}>
          <path
            d="M14 22h18a7 7 0 0 0 .4-14 10 10 0 0 0-19.3 3A7.5 7.5 0 0 0 14 22Z"
            fill="#C9D6EA"
          />
          <path
            d="M26 24 20 33h6l-3 9 10-13h-7l4-5h-4Z"
            fill="#FFD56A"
          />
        </svg>
      );
    case "snow":
      return (
        <svg {...props}>
          <path
            d="M14 24h18a7 7 0 0 0 .4-14 10 10 0 0 0-19.3 3A7.5 7.5 0 0 0 14 24Z"
            fill="#E8EEF9"
          />
          <path
            d="M18 31v.01M24 34v.01M30 31v.01M21 37v.01M27 37v.01"
            stroke="#F4FBFF"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="10" fill="#E8EEF9" />
        </svg>
      );
  }
}

export function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}
