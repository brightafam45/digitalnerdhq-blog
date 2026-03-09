'use client'

import { useState, useEffect, useCallback } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    setProgress(Math.min(100, Math.max(0, scrollPercent)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [updateProgress])

  return (
    <div
      className="fixed top-1 left-0 z-50 h-1 bg-accent transition-all duration-100 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
