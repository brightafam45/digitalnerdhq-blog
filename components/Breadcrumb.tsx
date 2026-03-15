import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-6 flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                style={{ opacity: 0.4 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLast || !item.href ? (
              <span
                className="font-medium truncate max-w-[200px] sm:max-w-xs"
                style={{ color: 'var(--text)' }}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-[var(--text)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
