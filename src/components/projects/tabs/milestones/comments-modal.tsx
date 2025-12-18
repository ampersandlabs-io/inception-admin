"use client"

import { useState } from "react"
import { X, Send, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Milestone } from "@/types"

interface CommentsModalProps {
  milestone: Milestone
  isOpen: boolean
  onClose: () => void
  onCommentAdded?: () => void
}

export function CommentsModal({ milestone, isOpen, onClose, onCommentAdded }: CommentsModalProps) {
  
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the comments API to fetch and manage comments
  // const { data: commentsData, isLoading: commentsLoading } = useComments(milestone.id)
  // const createCommentMutation = useCreateComment(milestone.id)

  // Get comments from API or fallback to milestone comments
  // const comments = commentsData?.comments || milestone.comments || []

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // await createCommentMutation.mutateAsync({ comment: newComment.trim() })
      setNewComment("")
      // Comments will automatically refresh due to query invalidation in useCreateComment
      // Still call the callback to refresh milestones data in the parent
      if (onCommentAdded) {
        await onCommentAdded()
      }
    } catch (error) {
      console.error("Failed to create comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e0e5f2]">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#258BBC]" />
            <div>
              <h2 className="text-lg font-semibold text-[#2b3674]">Comments</h2>
              <p className="text-sm text-[#8f9bba]">{milestone.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6">
          {commentsLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-[#258BBC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#8f9bba]">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-[#8f9bba]">No comments yet</p>
              <p className="text-sm text-[#8f9bba]">Be the first to comment on this milestone</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-[#258BBC] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[#2b3674]">
                        {comment.user?.name || 'Unknown User'}
                      </span>
                      <span className="text-xs text-[#8f9bba]">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-[#2b3674]">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comment Form */}
        <div className="p-6 border-t border-[#e0e5f2]">
          <form onSubmit={handleSubmitComment} className="flex gap-3">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-[#e0e5f2] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#258BBC] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="bg-[#258BBC] hover:bg-[#3a0fe6] text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
