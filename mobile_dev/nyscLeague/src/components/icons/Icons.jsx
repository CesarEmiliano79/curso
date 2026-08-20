// Íconos SVG livianos, sin dependencias externas.
// Reciben className/props extra y usan currentColor / stroke-width fijo.

export const BallIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
)

export const AboutIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" />
  </svg>
)

export const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const RulesIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
  </svg>
)

export const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
)

export const RegisterIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" />
    <path d="M19 8v6M16 11h6" />
  </svg>
)

export const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M6 3l3 6-2 2c1 3 3 5 6 6l2-2 6 3v3c0 1-1 2-2 2C11 22 2 13 2 5c0-1 1-2 2-2z" />
  </svg>
)
