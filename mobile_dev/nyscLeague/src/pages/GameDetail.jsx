import { useParams, Link } from 'react-router-dom'
import { useGame, transformGameToTableRow } from '../utilities/firebase.jsx'

export default function GameDetail() {
  const { id } = useParams()
  const [game, loading, error] = useGame(id)

  if (loading) {
    return (
      <div>
        <Link to="/schedule" className="btn btn-outline-secondary mb-3">
          ← Back to Schedule
        </Link>
        <p>Cargando detalles del juego...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Link to="/schedule" className="btn btn-outline-secondary mb-3">
          ← Back to Schedule
        </Link>
        <p className="text-danger">Error al cargar el juego: {error.message}</p>
      </div>
    )
  }

  if (!game) {
    return (
      <div>
        <Link to="/schedule" className="btn btn-outline-secondary mb-3">
          ← Back to Schedule
        </Link>
        <p className="text-warning">Juego no encontrado</p>
      </div>
    )
  }

  const gameRow = transformGameToTableRow(game)

  return (
    <div>
      <Link to="/schedule" className="btn btn-outline-secondary mb-3">
        ← Back to Schedule
      </Link>

      <span className="badge">Game Details</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>
        {gameRow.teams}
      </h1>

      <div className="game-detail-container">
        {/* Información del juego */}
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
                <b>{game.team1.name}  </b>
                <span className="team-coach">{game.team1.leader}</span>
              </div>
              <div className="vs-divider">vs.</div>
              <div className="team">
                <b>{game.team2.name}  </b>
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
              style={{ 
                width: '100%', 
                height: '400px', 
                border: 'none',
                borderRadius: '8px'
              }}
            />
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <div className="game-detail-nav" style={{ marginTop: '24px' }}>
        <Link to="/" className="btn btn-outline-secondary">
          Home
        </Link>
        <Link to="/schedule" className="btn">
          Back to Schedule
        </Link>
      </div>
    </div>
  )
}