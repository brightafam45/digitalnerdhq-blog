'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Comment } from '@/types'

interface CommentsProps {
  postId: string
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

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formComment, setFormComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formComment.trim()) return

    setSubmitting(true)
    // Simulated submission — real implementation would call Hashnode comment mutation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitting(false)
    setSubmitted(true)
    setFormName('')
    setFormEmail('')
    setFormComment('')
  }

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
            style={{ backgroundColor: 'rgba(239,77,80,0.1)', color: '#ef4d50' }}
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
            No comments yet. Be the first to leave a comment!
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

      {/* Comment form */}
      <div
        className="mt-8 p-6 rounded-2xl"
        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        <h3
          className="font-bold text-lg mb-1"
          style={{ color: 'var(--text)' }}
        >
          Leave a comment
        </h3>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
          Comments are moderated and approved before publishing.
        </p>

        {submitted ? (
          <div
            className="text-center py-8 rounded-xl"
            style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
              Comment submitted!
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Your comment is pending moderation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="comment-name"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--text)' }}
                >
                  Name *
                </label>
                <input
                  id="comment-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef4d50]/30"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="comment-email"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--text)' }}
                >
                  Email <span style={{ color: 'var(--text-muted)' }}>(not shown publicly)</span>
                </label>
                <input
                  id="comment-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef4d50]/30"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="comment-text"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text)' }}
              >
                Comment *
              </label>
              <textarea
                id="comment-text"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                required
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2.5 rounded-lg text-sm resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef4d50]/30"
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center gap-2"
              style={{ backgroundColor: '#ef4d50' }}
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Comment'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
