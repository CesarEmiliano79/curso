import { Link } from 'react-router-dom'
import Accordion from '../components/ui/Accordion.jsx'
import LocationCard from '../components/ui/LocationCard.jsx'
import { useLocations, useGamesByMonth, transformGameToTableRow } from '../utilities/firebase.jsx'
import Placeholder from '../components/ui/Placeholder.jsx'

function ScheduleTable({ month, games, loading, error }) {
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
        {games.map((g, i) => {
          const row = transformGameToTableRow(g);
          // Usar g.id como key, con fallback a índice si no está disponible
          const key = g.id || `game-${month}-${i}`;
          return (
            <tr key={key} style={{ cursor: 'pointer' }} className="game-row-clickable">
              <td>
                <Link to={`/game/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {row.date}
                </Link>
              </td>
              <td>
                <Link to={`/game/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {row.teams}
                </Link>
              </td>
              <td>
                <Link to={`/game/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {row.location}
                </Link>
              </td>
              <td>
                <Link to={`/game/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {row.time}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Schedule() {
  // Leer juegos de septiembre (mes 8) y octubre (mes 9) de 2026
  const [septemberGames, septLoading, septError] = useGamesByMonth(8, 2026);
  const [octoberGames, octLoading, octError] = useGamesByMonth(9, 2026);
  
  // Leer ubicaciones
  const [locations, locLoading, locError] = useLocations();

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
          />
          <ScheduleTable 
            month="October" 
            games={octoberGames} 
            loading={octLoading}
            error={octError}
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
    </div>
  )
}