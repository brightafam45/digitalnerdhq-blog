interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  darkBg?: boolean
}

const heightMap = {
  sm: 28,
  md: 36,
  lg: 48,
}

export default function Logo({ size = 'md', showTagline = false, darkBg = false }: LogoProps) {
  const height = heightMap[size]
  const taglineColor = darkBg ? 'rgba(255,255,255,0.5)' : '#6b7280'

  return (
    <div className="flex flex-col" aria-label="DigitalNerdHQ Blog Logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="DigitalNerdHQ"
        style={{ height, width: 'auto', maxWidth: height * 4, display: 'block', objectFit: 'contain' }}
      />
      {showTagline && (
        <span
          className="mt-1 font-light"
          style={{
            color: taglineColor,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.01em',
          }}
        >
          Creativity, innovation and empowerment
        </span>
      )}
    </div>
  )
}
