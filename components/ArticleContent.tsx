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
