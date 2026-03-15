'use client'

import { useEffect, useRef } from 'react'

interface ArticleContentProps {
  html: string
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const links = ref.current.querySelectorAll<HTMLAnchorElement>('a[href]')
    links.forEach((link) => {
      const href = link.getAttribute('href') ?? ''
      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//')
      if (isExternal) {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      } else {
        link.removeAttribute('target')
      }
    })
  }, [html])

  return (
    <div
      ref={ref}
      className="article-content max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
