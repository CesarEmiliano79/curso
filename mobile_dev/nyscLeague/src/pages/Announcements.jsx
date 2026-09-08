import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGames } from '../utilities/firebase.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import MessageCard from '../components/ui/MessageCard.jsx'
import AnnouncementForm from '../components/ui/AnnouncementForm.jsx'
import Placeholder from '../components/ui/Placeholder.jsx'

export default function Announcements() {
  const [games, gamesLoading] = useGames()
  const [selectedGameId, setSelectedGameId] = useState(null)
  const [messages, setMessages] = useState({})
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/registration')
    }
  }, [user, authLoading, navigate])

  const handleMessageAdded = (newMessage) => {
    const gameId = newMessage.gameId
    setMessages(prev => ({
      ...prev,
      [gameId]: [newMessage, ...(prev[gameId] || [])],
    }))
  }

  const selectedGame = games?.find(g => g.id === selectedGameId)
  const gameMessages = messages[selectedGameId] || []

  // Mock de mensajes para demostración
  useEffect(() => {
    if (games && games.length > 0 && selectedGameId) {
      if (!messages[selectedGameId]) {
        setMessages(prev => ({
          ...prev,
          [selectedGameId]: [
            {
              id: '1',
              gameId: selectedGameId,
              userId: 'user2',
              userName: 'Sarah Wilson',
              userPhotoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
              text: 'Excited for this game! Let\'s go U1! 🎉',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              likes: 5,
              replies: 2,
            },
            {
              id: '2',
              gameId: selectedGameId,
              userId: 'user3',
              userName: 'Coach Mike',
              userPhotoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
              text: 'Make sure to arrive 15 minutes early. See everyone there!',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              likes: 12,
              replies: 3,
            },
          ],
        }))
      }
    }
  }, [selectedGameId, games])

  if (authLoading) {
    return (
      <div>
        <span className="badge">Community</span>
        <h1 className="page-title" style={{ marginTop: 8 }}>Game Announcements</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // El useEffect redirigirá
  }

  if (gamesLoading) {
    return (
      <div>
        <span className="badge">Community</span>
        <h1 className="page-title" style={{ marginTop: 8 }}>Game Announcements</h1>
        <p>Loading games...</p>
      </div>
    )
  }

  return (
    <div className="announcements-page">
      <span className="badge">Community</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>Game Announcements</h1>

      <div className="announcements-container">
        {/* Sidebar con lista de juegos */}
        <aside className="announcements-sidebar">
          <h2>Upcoming Games</h2>
          <div className="games-list">
            {games && games.length > 0 ? (
              games.map(game => (
                <button
                  key={game.id}
                  className={`game-item ${selectedGameId === game.id ? 'active' : ''}`}
                  onClick={() => setSelectedGameId(game.id)}
                >
                  <div className="game-item-date">
                    {new Date(game.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="game-item-info">
                    <p className="game-item-teams">
                      {game.team1.name} vs {game.team2.name}
                    </p>
                    <p className="game-item-location">
                      {game.location.name}
                    </p>
                  </div>
                  {messages[game.id] && messages[game.id].length > 0 && (
                    <span className="game-item-badge">{messages[game.id].length}</span>
                  )}
                </button>
              ))
            ) : (
              <p className="text-muted">No games scheduled</p>
            )}
          </div>
        </aside>

        {/* Main feed de anuncios */}
        <main className="announcements-feed">
          {selectedGameId && selectedGame ? (
            <div className="feed-content">
              {/* Header del juego seleccionado */}
              <div className="feed-header">
                <h2>
                  {selectedGame.team1.name} vs {selectedGame.team2.name}
                </h2>
                <p className="feed-game-info">
                  {new Date(selectedGame.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} at {selectedGame.time} • {selectedGame.location.name}
                </p>
              </div>

              {/* Formulario para agregar mensaje */}
              {user && (
                <div className="feed-form-container">
                  <AnnouncementForm
                    gameId={selectedGameId}
                    onMessageAdded={handleMessageAdded}
                    userProfile={user}
                  />
                </div>
              )}

              {/* Lista de mensajes */}
              <div className="feed-messages">
                {gameMessages.length > 0 ? (
                  <div>
                    <p className="messages-count">
                      {gameMessages.length} {gameMessages.length === 1 ? 'comment' : 'comments'}
                    </p>
                    {gameMessages.map(message => (
                      <MessageCard
                        key={message.id}
                        message={message}
                        userProfile={user}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <p>No comments yet</p>
                    <span>Be the first to comment on this game!</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">👈</div>
              <p>Select a game to view announcements</p>
              <span>Choose a game from the list to see and post comments</span>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}