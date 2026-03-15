import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          backgroundColor: '#180f41',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.85)', top: 10, left: 76 }} />
        {/* Top-right — red */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: '#ef4d50', top: 18, right: 22, transform: 'rotate(45deg)' }} />
        {/* Right */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.55)', top: 64, right: 10, transform: 'rotate(90deg)' }} />
        {/* Bottom-right */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.4)', bottom: 18, right: 22, transform: 'rotate(135deg)' }} />
        {/* Bottom */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.3)', bottom: 10, left: 76 }} />
        {/* Bottom-left */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', bottom: 18, left: 22, transform: 'rotate(-135deg)' }} />
        {/* Left */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', top: 64, left: 10, transform: 'rotate(-90deg)' }} />
        {/* Top-left */}
        <div style={{ position: 'absolute', width: 28, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.65)', top: 18, left: 22, transform: 'rotate(-45deg)' }} />
      </div>
    ),
    { ...size }
  )
}
