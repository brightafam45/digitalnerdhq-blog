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

  // Inject IDs onto headings so JumpNav scroll targets exist in the DOM
  useEffect(() => {
    if (!ref.current) return
    const headings = ref.current.querySelectorAll<HTMLHeadingElement>('h2, h3')
    const seen = new Map<string, number>()
    headings.forEach((el) => {
      const base = el.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60) ?? ''
      const count = seen.get(base) ?? 0
      seen.set(base, count + 1)
      el.id = count === 0 ? base : `${base}-${count}`
    })
  }, [html])

  useEffect(() => {
    if (!ref.current) return
    const preBlocks = ref.current.querySelectorAll<HTMLPreElement>('pre')
    preBlocks.forEach((pre) => {
      // Avoid double-wrapping on re-renders
      if (pre.parentElement?.dataset.copyWrapper) return

      const wrapperDiv = document.createElement('div')
      wrapperDiv.style.position = 'relative'
      wrapperDiv.dataset.copyWrapper = 'true'

      pre.insertAdjacentElement('beforebegin', wrapperDiv)
      wrapperDiv.appendChild(pre)

      const button = document.createElement('button')
      button.textContent = 'Copy'
      button.style.cssText = [
        'position: absolute',
        'top: 8px',
        'right: 8px',
        'background: rgba(255,255,255,0.1)',
        'color: white',
        'border: none',
        'border-radius: 6px',
        'padding: 4px 10px',
        'font-size: 12px',
        'cursor: pointer',
        'transition: all 0.2s',
        'z-index: 10',
      ].join(';')

      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(255,255,255,0.2)'
      })
      button.addEventListener('mouseleave', () => {
        if (button.textContent === 'Copy') {
          button.style.background = 'rgba(255,255,255,0.1)'
        }
      })

      button.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.textContent ?? '').then(() => {
          button.textContent = 'Copied!'
          button.style.background = 'rgba(255,255,255,0.2)'
          setTimeout(() => {
            button.textContent = 'Copy'
            button.style.background = 'rgba(255,255,255,0.1)'
          }, 2000)
        })
      })

      wrapperDiv.appendChild(button)
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
