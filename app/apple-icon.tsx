import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com'

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          backgroundColor: '#1e1e1e',
          display: 'flex',
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        {/* Load the real logo and clip to just the icon mark (left ~40% of the 2:1 image) */}
        <img
          src={`${siteUrl}/logo.png`}
          style={{ height: 225, width: 'auto', flexShrink: 0 }}
        />
      </div>
    ),
    { ...size }
  )
}
