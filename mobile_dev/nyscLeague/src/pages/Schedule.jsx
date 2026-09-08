import { useState } from 'react'
import Accordion from '../components/ui/Accordion.jsx'
import LocationCard from '../components/ui/LocationCard.jsx'
import GameDetailModal from '../components/ui/GameDetailModal.jsx'
import { useLocations, useGamesByMonth, transformGameToTableRow } from '../utilities/firebase.jsx'
import Placeholder from '../components/ui/Placeholder.jsx'

function ScheduleTable({ month, games, loading, error, onGameClick }) {
  if (loading) {
    return <p>Cargando horarios de {month}...</p>;
  }

  if (error) {
    return <p className="text-danger">Error al cargar los juegos de {month}</p>;
  }

  if (!games || games.length === 0) {
    return <p>No hay juegos programados para {month}</p>;
  }

  return (
    <table className="schedule-table table table-bordered align-middle mb-4">
      <thead>
        <tr>
          <th className="month-header">{month}</th>
          <th>Teams</th>
          <th>Location</th>
          <th>Times</th>
        </tr>
      </thead>
      <tbody>
        {games.map((g) => {
          const row = transformGameToTableRow(g);
          const key = g.id || `game-${month}-${g.date}`;
          return (
            <tr
              key={key}
              onClick={() => onGameClick(g.id)}
              style={{ cursor: 'pointer' }}
              className="game-row-clickable"
            >
              <td>{row.date}</td>
              <td>{row.teams}</td>
              <td>{row.location}</td>
              <td>{row.time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Schedule() {
  // Estado para el modal
  const [selectedGameId, setSelectedGameId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Leer juegos de septiembre (mes 8) y octubre (mes 9) de 2026
  const [septemberGames, septLoading, septError] = useGamesByMonth(8, 2026);
  const [octoberGames, octLoading, octError] = useGamesByMonth(9, 2026);
  
  // Leer ubicaciones
  const [locations, locLoading, locError] = useLocations();

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Limpiar el ID con un pequeño delay para que la animación de cierre funcione
    setTimeout(() => setSelectedGameId(null), 300)
  }

  const accordionItems = [
    {
      id: 'schedule',
      title: 'Fall Schedule',
      content: (
        <div>
          <ScheduleTable 
            month="September" 
            games={septemberGames} 
            loading={septLoading}
            error={septError}
            onGameClick={handleGameClick}
          />
          <ScheduleTable 
            month="October" 
            games={octoberGames} 
            loading={octLoading}
            error={octError}
            onGameClick={handleGameClick}
          />
        </div>
      ),
    },
    {
      id: 'locations',
      title: 'Game Locations',
      content: locLoading ? (
        <p>Cargando ubicaciones...</p>
      ) : locError ? (
        <p className="text-danger">Error al cargar las ubicaciones</p>
      ) : locations && locations.length > 0 ? (
        <div className="locations-grid">
          {locations.map(loc => (
            <LocationCard
              key={loc.id}
              name={loc.name}
              address={loc.adress}
              mapSrc={loc.mapSrc}
            />
          ))}
        </div>
      ) : (
        <Placeholder badge="Location" title="No hay ubicaciones disponibles" />
      ),
    },
  ]

  return (
    <div>
      <span className="badge">Game Information</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>NYSL Game Information</h1>
      <span className="warning-note">* All games take place on Saturday</span>

      <Accordion items={accordionItems} defaultOpenId="schedule" />

      <div className="static-row row g-3">
        <div className="static-card col">
          <h3>Facility Type</h3>
          <p>Outdoor</p>
        </div>
        <div className="static-card col">
          <h3>Weather Policy</h3>
          <p>
            If deemed necessary by NYSL, games may be shortened or cancelled
            due to extreme weather conditions.
          </p>
        </div>
      </div>

      <div className="static-card" style={{ marginBottom: 16 }}>
        <h3>Please direct all questions to:</h3>
        <p>
          Michael Randall, League Coordinator<br />
          Phone: (630) 690-8132<br />
          Email:{' '}
          <a href="mailto:michael.randall@chisoccer.org">
            michael.randall@chisoccer.org
          </a>
        </p>
      </div>

      {/* Modal de detalles del juego */}
      <GameDetailModal
        gameId={selectedGameId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}