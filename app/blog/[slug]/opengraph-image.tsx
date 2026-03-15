import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/hashnode'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default async function OGImage({ params }: Props) {
  const post = await getPost(params.slug)

  const title = post?.title ?? 'DigitalNerdHQ Blog'
  const tag = post?.tags?.[0]?.name ?? null
  const authorName = post?.author?.name ?? 'DigitalNerdHQ'

  const fontSize = title.length <= 60 ? 52 : 40

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#060312',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left accent strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '630px',
            backgroundColor: '#ef4d50',
          }}
        />

        {/* Top section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '60px 70px 0 70px',
            justifyContent: 'center',
          }}
        >
          {/* Tag pill */}
          {tag && (
            <div
              style={{
                display: 'flex',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(239,77,80,0.15)',
                  color: '#ef4d50',
                  fontSize: '16px',
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {tag}
              </span>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              color: '#f6f5f4',
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              lineHeight: 1.2,
              maxWidth: '1060px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 70px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Left: logo + subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
              <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800 }}>
                Digital
              </span>
              <span style={{ color: '#ef4d50', fontSize: '24px', fontWeight: 800 }}>
                NerdHQ
              </span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              blog.digitalnerdhq.com
            </span>
          </div>

          {/* Right: author */}
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
            by {authorName}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
