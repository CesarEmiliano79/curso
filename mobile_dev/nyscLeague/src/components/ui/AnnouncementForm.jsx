import { useState } from 'react'

export default function AnnouncementForm({ gameId, onMessageAdded, userProfile }) {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setError('Message cannot be empty')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // El id lo genera Firebase (push key) en addMessage, así que no lo mandamos aquí
      const newMessage = {
        gameId,
        userId: userProfile?.uid,
        userName: userProfile?.displayName || 'Anonymous',
        userPhotoURL: userProfile?.photoURL,
        text: text.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: 0,
      }

      if (onMessageAdded) {
        await onMessageAdded(newMessage)
      }

      setText('')
    } catch (err) {
      const message = err instanceof Error && err.message.startsWith('Invalid message data')
        ? err.message.replace('Invalid message data: ', '')
        : 'Error posting message. Please try again.'
      setError(message)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="announcement-form" onSubmit={handleSubmit}>
      <div className="form-header">
        {userProfile?.photoURL && (
          <img 
            src={userProfile.photoURL}
            alt={userProfile.displayName}
            className="form-avatar"
          />
        )}
        <div className="form-user-info">
          <p className="form-user-name">
            {userProfile?.displayName || 'Anonymous'}
          </p>
        </div>
      </div>

      <div className="form-field">
        <textarea
          className="form-textarea"
          placeholder={`Share something about this game, ${userProfile?.displayName?.split(' ')[0] || 'friend'}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="form-icon-btn"
          title="Add image"
          disabled={isLoading}
        >
          🖼️
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  )
}