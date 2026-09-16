export default function Mark({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" fill="#111" />
      <path
        d="M6 24V8h3.2l6.8 11.2L22.8 8H26v16h-3.1V13.1L16.4 24h-1.8L9.1 13.1V24H6z"
        fill="#14b8a6"
      />
    </svg>
  );
}
