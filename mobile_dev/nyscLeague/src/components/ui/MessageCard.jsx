export default function MessageCard({ message, userProfile }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  return (
    <div className="message-card">
      {/* Header con avatar y info del usuario */}
      <div className="message-header">
        <img 
          src={message.userPhotoURL || 'https://via.placeholder.com/40'} 
          alt={message.userName}
          className="message-avatar"
        />
        <div className="message-user-info">
          <p className="message-user-name">{message.userName}</p>
          <span className="message-time">{formatDate(message.timestamp)}</span>
        </div>
      </div>

      {/* Contenido del mensaje */}
      <div className="message-body">
        <p className="message-text">{message.text}</p>
        {message.imageURL && (
          <img 
            src={message.imageURL} 
            alt="Message attachment"
            className="message-image"
          />
        )}
      </div>

      {/* Footer con acciones */}
      <div className="message-footer">
        <button className="message-action">
          👍 Like {message.likes > 0 && `(${message.likes})`}
        </button>
      </div>
    </div>
  )
}