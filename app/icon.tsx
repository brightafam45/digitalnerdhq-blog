import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Recreates the DigitalNerdHQ spinner logo icon at 32x32
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: '#180f41',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top pill — white */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.85)',
          top: 2, left: 13.5,
        }} />
        {/* Top-right pill — red */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: '#ef4d50',
          top: 3, right: 4,
          transform: 'rotate(45deg)',
        }} />
        {/* Right pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.55)',
          top: 11.5, right: 2,
          transform: 'rotate(90deg)',
        }} />
        {/* Bottom-right pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.4)',
          bottom: 3, right: 4,
          transform: 'rotate(135deg)',
        }} />
        {/* Bottom pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.3)',
          bottom: 2, left: 13.5,
        }} />
        {/* Bottom-left pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.2)',
          bottom: 3, left: 4,
          transform: 'rotate(-135deg)',
        }} />
        {/* Left pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.15)',
          top: 11.5, left: 2,
          transform: 'rotate(-90deg)',
        }} />
        {/* Top-left pill */}
        <div style={{
          position: 'absolute', width: 5, height: 9, borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.65)',
          top: 3, left: 4,
          transform: 'rotate(-45deg)',
        }} />
      </div>
    ),
    { ...size }
  )
}
