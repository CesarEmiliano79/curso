import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGame, transformGameToTableRow, useMessages, addMessage } from '../../utilities/firebase.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import MessageCard from './MessageCard.jsx'
import AnnouncementForm from './AnnouncementForm.jsx'

export default function GameDetailModal({ gameId, isOpen, onClose }) {
  const [game, loading, error] = useGame(gameId)
  const [gameMessages, messagesLoading, messagesError] = useMessages(gameId)
  const { user } = useAuth()

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Evitar scroll cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Guarda el comentario en Firebase. AnnouncementForm arma el objeto `newMessage`
  // y lo pasa aquí; el listener de useMessages actualizará la lista automáticamente.
  const handleMessageAdded = async (newMessage) => {
    // No se atrapa el error aquí: se deja propagar para que AnnouncementForm
    // pueda mostrarle al usuario por qué no se guardó (ej. formato inválido)
    await addMessage(gameId, newMessage)
  }

  if (!isOpen) return null

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Loading...</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Error</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <p className="text-danger">Error loading game details: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Game Not Found</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
      </div>
    )
  }

  const gameRow = transformGameToTableRow(game)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-with-announcements" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{gameRow.teams}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body con dos secciones */}
        <div className="modal-body modal-body-split">
          {/* Sección izquierda: Info del juego */}
          <div className="game-detail-section">
            <div className="game-detail-grid">
              <div className="game-detail-info">
                <div className="detail-card">
                  <h3>Date</h3>
                  <p className="detail-value">{gameRow.date}</p>
                </div>

                <div className="detail-card">
                  <h3>Time</h3>
                  <p className="detail-value">{gameRow.time}</p>
                </div>

                <div className="detail-card">
                  <h3>Location</h3>
                  <p className="detail-value">{game.location.name}</p>
                  <p className="detail-address">{game.location.adress}</p>
                </div>

                <div className="detail-card">
                  <h3>Teams</h3>
                  <div className="teams-vs">
                    <div className="team">
                      <b>{game.team1.name}</b>
                      <span className="team-coach">{game.team1.leader}</span>
                    </div>
                    <div className="vs-divider">vs.</div>
                    <div className="team">
                      <b>{game.team2.name}</b>
                      <span className="team-coach">{game.team2.leader}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa de ubicación */}
              {game.location.mapSrc && (
                <div className="game-detail-map">
                  <iframe
                    src={game.location.mapSrc}
                    title={game.location.name}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sección de Comentarios: extensión continua de los detalles del juego */}
          <div className="announcements-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 8, marginBottom: 16 }}>
              <h3 className="announcements-title" style={{ margin: 0 }}>Game Discussion</h3>
              {user && gameId && (
                <Link to={`/photos/${gameId}`} className="btn btn-outline-secondary" onClick={onClose}>
                  📷 View Photos
                </Link>
              )}
            </div>

            {/* Formulario para agregar comentario */}
            {user ? (
              <div className="announcements-form-container">
                <AnnouncementForm
                  gameId={gameId}
                  onMessageAdded={handleMessageAdded}
                  userProfile={user}
                />
              </div>
            ) : (
              <div className="login-prompt">
                <p>Sign in to add comments</p>
              </div>
            )}

            {/* Lista de comentarios (Firebase en tiempo real) */}
            <div className="announcements-messages">
              {messagesLoading ? (
                <div className="empty-comments">
                  <p>Loading comments...</p>
                </div>
              ) : messagesError ? (
                <div className="empty-comments">
                  <p className="text-danger">Error loading comments</p>
                </div>
              ) : gameMessages.length > 0 ? (
                <div>
                  <p className="messages-count">
                    {gameMessages.length} {gameMessages.length === 1 ? 'comment' : 'comments'}
                  </p>
                  <div className="messages-list">
                    {gameMessages.map(message => (
                      <MessageCard
                        key={message.id}
                        message={message}
                        userProfile={user}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-comments">
                  <span className="empty-icon">💬</span>
                  <p>No comments yet</p>
                  <span>Be the first to comment!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn btn-outline-secondary" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}