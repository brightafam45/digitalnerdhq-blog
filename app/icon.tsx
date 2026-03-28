import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          backgroundColor: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 3x3 grid of pills at ~-35deg — column 1 */}
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 3, left: 4, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 11, left: 4, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 19, left: 4, transform: 'rotate(-35deg)' }} />
        {/* column 2 */}
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 3, left: 13, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 11, left: 13, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 19, left: 13, transform: 'rotate(-35deg)' }} />
        {/* column 3 — top pill is red */}
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: '#ef4d50', top: 3, left: 22, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 11, left: 22, transform: 'rotate(-35deg)' }} />
        <div style={{ position: 'absolute', width: 5, height: 13, borderRadius: 3, backgroundColor: 'white', top: 19, left: 22, transform: 'rotate(-35deg)' }} />
      </div>
    ),
    { ...size }
  )
}
