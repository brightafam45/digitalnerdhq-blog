'use client'

interface AISummarizerProps {
  url: string
}

interface AITool {
  name: string
  label: string
  color: string
  bgColor: string
  getUrl: (encodedUrl: string) => string
  icon: React.ReactNode
}

function ChatGPTIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 41 41" fill="currentColor">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.242-2.518 10.076 10.076 0 0 0-9.616 6.975 9.965 9.965 0 0 0-6.625 4.816 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.243 2.518 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.624-4.816 10.079 10.079 0 0 0-1.241-11.812zm-22.56 12.655a7.462 7.462 0 0 1-4.756-1.697l.236-.133 7.893-4.558a.387.387 0 0 0 .196-.339v-11.12l3.337 1.929a.036.036 0 0 1 .02.029v9.23a7.511 7.511 0 0 1-6.926 4.659zm-16.116-6.891a7.462 7.462 0 0 1-.894-5.023l.238.144 7.892 4.558a.384.384 0 0 0 .39 0l9.644-5.567v3.858a.038.038 0 0 1-.015.032L8.17 23.798a7.51 7.51 0 0 1-7.314-1.164zm-2.067-16.443a7.463 7.463 0 0 1 3.898-3.282l-.002.274v9.115a.387.387 0 0 0 .196.337l9.644 5.567-3.336 1.927a.036.036 0 0 1-.036.003L3.95 15.833a7.51 7.51 0 0 1-.161-9.642zm27.406 6.445l-9.645-5.567 3.337-1.928a.037.037 0 0 1 .036-.004l7.955 4.594a7.507 7.507 0 0 1-1.16 13.537v-9.39a.387.387 0 0 0-.196-.338l.002-.01a.038.038 0 0 1-.33.106zm3.316-5.043l-.237-.144-7.892-4.558a.384.384 0 0 0-.39 0L9.35 13.401V9.543a.04.04 0 0 1 .016-.031l7.954-4.593a7.51 7.51 0 0 1 11.17 7.786l-.001-.003zm-20.887 6.871l-3.337-1.928a.037.037 0 0 1-.02-.029V13.477a7.508 7.508 0 0 1 12.318-5.76l-.236.133-7.893 4.558a.384.384 0 0 0-.196.338l-.003 11.12-.633-.366zm1.814-3.916l4.294-2.479 4.293 2.479v4.958l-4.293 2.479-4.294-2.479V14.548z" />
    </svg>
  )
}

function PerplexityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-10 7.5c.414 0 .75-.336.75-.75V5.25a.75.75 0 0 0-1.5 0v13.5c0 .414.336.75.75.75zM7.5 12c0-.414-.336-.75-.75-.75H5.25a.75.75 0 0 0 0 1.5H6.75c.414 0 .75-.336.75-.75zm11.25-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zM9 8.25c0-.414-.336-.75-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5c.414 0 .75-.336.75-.75zm7.5 7.5c0-.414-.336-.75-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5c.414 0 .75-.336.75-.75zm-7.5 0c0-.414-.336-.75-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5c.414 0 .75-.336.75-.75zm7.5-7.5c0-.414-.336-.75-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5c.414 0 .75-.336.75-.75z"/>
    </svg>
  )
}

function GrokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.304 1.81L9.761 20.185l-2.14-5.196 5.201-9.179-5.853 8.23L4.696 9.485 17.304 1.81zm-1.257 20.38L8.5 3.816l5.196 2.14 2.23 5.548-.013-.025L17.913 5.7l2.274 3.541-4.14 12.949z"/>
    </svg>
  )
}

function GeminiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill="url(#geminiGrad)"
      />
      <defs>
        <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B59B6" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function AISummarizer({ url }: AISummarizerProps) {
  const encodedUrl = encodeURIComponent(url)

  const tools: AITool[] = [
    {
      name: 'chatgpt',
      label: 'ChatGPT',
      color: '#10a37f',
      bgColor: 'rgba(16,163,127,0.08)',
      getUrl: (e) => `https://chatgpt.com/?q=Please+summarize+this+article:+${e}`,
      icon: <ChatGPTIcon />,
    },
    {
      name: 'perplexity',
      label: 'Perplexity',
      color: '#20b8cd',
      bgColor: 'rgba(32,184,205,0.08)',
      getUrl: (e) => `https://www.perplexity.ai/?q=Summarize:+${e}`,
      icon: <PerplexityIcon />,
    },
    {
      name: 'grok',
      label: 'Grok',
      color: '#000000',
      bgColor: 'rgba(0,0,0,0.06)',
      getUrl: (e) => `https://x.com/i/grok?text=Summarize+this+article:+${e}`,
      icon: <GrokIcon />,
    },
    {
      name: 'claude',
      label: 'Claude',
      color: '#d97757',
      bgColor: 'rgba(217,119,87,0.08)',
      getUrl: (e) => `https://claude.ai/new?q=Please+summarize+this+article:+${e}`,
      icon: <ClaudeIcon />,
    },
    {
      name: 'gemini',
      label: 'Gemini',
      color: '#4285f4',
      bgColor: 'rgba(66,133,244,0.08)',
      getUrl: (e) => `https://gemini.google.com/app?q=Summarize+this+article:+${e}`,
      icon: <GeminiIcon />,
    },
  ]

  return (
    <div
      className="rounded-xl p-4 md:p-5 mb-8"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card-bg)',
      }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        Summarize and analyze this article with
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.getUrl(encodedUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-secondary)',
              minWidth: '72px',
              willChange: 'transform',
            }}
            title={`Analyze with ${tool.label}`}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{
                backgroundColor: tool.bgColor,
                color: tool.color,
              }}
            >
              {tool.icon}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: 'var(--text-muted)' }}
            >
              {tool.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
