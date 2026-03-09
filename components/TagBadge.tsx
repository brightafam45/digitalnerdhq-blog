import Link from 'next/link'
import type { Tag } from '@/types'

interface TagBadgeProps {
  tag: Tag
  size?: 'sm' | 'md'
  variant?: 'default' | 'accent'
}

export default function TagBadge({ tag, size = 'sm', variant = 'default' }: TagBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  const variantClasses = {
    default:
      'bg-blue/10 text-blue-700 hover:bg-blue/20 border border-blue/20',
    accent:
      'bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20',
  }

  return (
    <Link
      href={`/tags/${tag.slug}`}
      className={`inline-flex items-center font-ui font-medium rounded-full transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      #{tag.name}
    </Link>
  )
}
