'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Comment } from '@/types'

interface CommentsProps {
  postId: string
  postSlug: string
}

function CommentAvatar({ name, picture }: { name: string; picture?: string }) {
  if (picture) {
    return (
      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2">
        <Image src={picture} alt={name} fill className="object-cover" sizes="32px" />
      </div>
    )
  }
  return (
    <div
      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
      style={{ backgroundColor: '#180f41' }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const dateStr = comment.dateAdded
    ? format(new Date(comment.dateAdded), 'MMM d, yyyy')
    : ''

  return (
    <div className={`flex gap-3 ${isReply ? 'ml-10 mt-3' : ''}`}>
      <CommentAvatar name={comment.author.name} picture={comment.author.profilePicture} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
            {comment.author.name}
          </span>
          {dateStr && (
            <time className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {dateStr}
            </time>
          )}
        </div>
        <div
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
          dangerouslySetInnerHTML={{ __html: comment.content.html || comment.content.text || '' }}
        />
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l-2 pl-4" style={{ borderColor: 'var(--border)' }}>
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply as Comment} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Comments({ postId, postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hashnodeUrl = `https://digitalnerdhq.hashnode.dev/${postSlug}#comments`

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true)
      const { getComments } = await import('@/lib/hashnode')
      const data = await getComments(postId)
      setComments(data)
    } catch {
      setError('Failed to load comments.')
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <section className="mt-12 pt-10" style={{ borderTop: '2px solid var(--border)' }}>
      <h2
        className="font-bold text-xl mb-6 flex items-center gap-2"
        style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
      >
        Comments
        {comments.length > 0 && (
          <span
            className="text-sm font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
          >
            {comments.length}
          </span>
        )}
      </h2>

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--border)' }} />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded w-32" style={{ backgroundColor: 'var(--border)' }} />
                <div className="h-3 rounded w-full" style={{ backgroundColor: 'var(--border)' }} />
                <div className="h-3 rounded w-3/4" style={{ backgroundColor: 'var(--border)' }} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm py-4" style={{ color: 'var(--text-muted)' }}>{error}</p>
      ) : comments.length === 0 ? (
        <div
          className="text-center py-10 rounded-xl"
          style={{ border: '1px dashed var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No comments yet. Be the first to leave a comment on Hashnode!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <CommentItem comment={comment} />
            </div>
          ))}
        </div>
      )}

      {/* Comment CTA */}
      <div
        className="mt-8 p-6 rounded-2xl text-center"
        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        <svg
          className="w-8 h-8 mx-auto mb-3"
          style={{ color: '#ef4444' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>
          Join the conversation
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          Comments are hosted on Hashnode. Click below to read and leave a comment.
        </p>
        <a
          href={hashnodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#ef4444' }}
        >
          Comment on Hashnode ↗
        </a>
      </div>
    </section>
  )
}
