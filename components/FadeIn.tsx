'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

const directionMap = {
  up:    { y: 28, x: 0 },
  down:  { y: -28, x: 0 },
  left:  { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none:  { x: 0, y: 0 },
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
