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
          backgroundColor: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 3x3 grid of pills at ~-35deg — column 1 */}
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 18, left: 22, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 63, left: 22, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 108, left: 22, transform: 'rotate(-35deg)' }} />
        {/* column 2 */}
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 18, left: 76, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 63, left: 76, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 108, left: 76, transform: 'rotate(-35deg)' }} />
        {/* column 3 — top pill is red */}
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: '#ef4d50', top: 18, left: 130, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 63, left: 130, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 28, height: 72, borderRadius: 14, backgroundColor: 'white', top: 108, left: 130, transform: 'rotate(-35deg)' }} />
      </div>
    ),
    { ...size }
  )
}
