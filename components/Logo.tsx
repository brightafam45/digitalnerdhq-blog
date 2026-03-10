interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  darkBg?: boolean
}

const sizeMap = {
  sm: { icon: 32, textClass: 'text-base', taglineClass: 'text-[10px]' },
  md: { icon: 40, textClass: 'text-xl', taglineClass: 'text-xs' },
  lg: { icon: 56, textClass: 'text-2xl', taglineClass: 'text-sm' },
}

export default function Logo({ size = 'md', showTagline = false, darkBg = false }: LogoProps) {
  const { icon, textClass, taglineClass } = sizeMap[size]
  const textColor = darkBg ? '#ffffff' : '#180f41'
  const taglineColor = darkBg ? 'rgba(255,255,255,0.5)' : '#6b7280'

  return (
    <div className="flex items-center gap-3" aria-label="DigitalNerdHQ Blog Logo">
      {/* Geometric spinner icon — 8 pill-shaped rectangles */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background circle */}
        <rect width="40" height="40" rx="10" fill="#180f41" />

        {/* 8 rounded pill rectangles arranged in octagon/spinner pattern */}
        {/* Top */}
        <rect x="17" y="4" width="6" height="11" rx="3" fill="rgba(255,255,255,0.85)" />
        {/* Top-right */}
        <rect
          x="23.2"
          y="7.5"
          width="6"
          height="11"
          rx="3"
          fill="#ef4d50"
          transform="rotate(45 26.2 13)"
        />
        {/* Right */}
        <rect
          x="25"
          y="17"
          width="6"
          height="11"
          rx="3"
          fill="rgba(255,255,255,0.55)"
          transform="rotate(90 28 22.5)"
        />
        {/* Bottom-right */}
        <rect
          x="23.2"
          y="21.5"
          width="6"
          height="11"
          rx="3"
          fill="rgba(255,255,255,0.45)"
          transform="rotate(135 26.2 27)"
        />
        {/* Bottom */}
        <rect x="17" y="25" width="6" height="11" rx="3" fill="rgba(255,255,255,0.35)" />
        {/* Bottom-left */}
        <rect
          x="10.8"
          y="21.5"
          width="6"
          height="11"
          rx="3"
          fill="rgba(255,255,255,0.25)"
          transform="rotate(-135 13.8 27)"
        />
        {/* Left */}
        <rect
          x="9"
          y="17"
          width="6"
          height="11"
          rx="3"
          fill="rgba(255,255,255,0.2)"
          transform="rotate(-90 12 22.5)"
        />
        {/* Top-left */}
        <rect
          x="10.8"
          y="7.5"
          width="6"
          height="11"
          rx="3"
          fill="rgba(255,255,255,0.65)"
          transform="rotate(-45 13.8 13)"
        />
      </svg>

      {/* Text block */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0" style={{ lineHeight: 1.1 }}>
          <span
            className={`font-bold tracking-tight ${textClass}`}
            style={{ color: textColor, fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Digital
          </span>
          <span
            className={`font-bold tracking-tight ${textClass}`}
            style={{ color: '#ef4d50', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            NerdHQ
          </span>
        </div>
        {showTagline && (
          <span
            className={`${taglineClass} mt-1 font-light`}
            style={{
              color: taglineColor,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.01em',
            }}
          >
            Creativity, innovation and empowerment
          </span>
        )}
      </div>
    </div>
  )
}
