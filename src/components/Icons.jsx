const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const PlaneIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
)

export const PassportIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M9 17h6" />
  </svg>
)

export const BedIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 7v12M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6" />
    <circle cx="7" cy="11" r="2" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const SnowIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" />
  </svg>
)

export const LinkIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
  </svg>
)

export const SeatIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill={color}
      d="M6 3h12a1 1 0 0 1 1 1v8H5V4a1 1 0 0 1 1-1zM3 10h3v5h12v-5h3v6a2 2 0 0 1-2 2v3h-2v-3H7v3H5v-3a2 2 0 0 1-2-2z"
    />
  </svg>
)
