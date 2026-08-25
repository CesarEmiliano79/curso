import { Link } from 'react-router-dom'
import Accordion from '../components/ui/Accordion.jsx'
import TeamCard from '../components/ui/TeamCard.jsx'
import { useTeams } from '../utilities/firebase.jsx'

// Mapeo simplificado de ID a rango de edad
// Ajusta según tu estructura real (puede venir de la BD también)
const info = {
  'U1': 'Couch U1',
  'U2': 'Couch U2',
  'U3': 'Couch U3',
  'U4': 'Couch U4',
  'U5': 'Couch U5',
  'U6': 'Couch U6',
};

export default function Home() {
  const [teams, teamsLoading, teamsError] = useTeams();

  const accordionItems = [
    {
      id: 'teams',
      title: 'Our Teams',
      content: teamsLoading ? (
        <p>Cargando equipos...</p>
      ) : teamsError ? (
        <p className="text-danger">Error al cargar los equipos</p>
      ) : teams && teams.length > 0 ? (
        <div className="team-grid">
          {teams.map((t) => (
            <TeamCard
              key={t.id}
              name={t.name}
              info={info[t.id] || 'Without Coach'}
            />
          ))}
        </div>
      ) : (
        <p>No hay equipos disponibles</p>
      ),
    }
  ]

  return (
    <div>
      <div className="hero-box">
        <span className="badge">Upcoming Events</span>
        <h1>Northside Youth Soccer League</h1>
        <p>
          Supporting young athletes in Chicago's northside neighborhoods,
          on and off the field.
        </p>
        <div className="hero-btns">
          <Link className="btn" to="/registration">Register a Player</Link>
          <Link className="btn outline" to="/schedule">Schedule</Link>
        </div>
      </div>

      <h2 className="section-title">Upcoming Events</h2>
      <div className="static-row row g-3">
        <div className="static-card col">
          <h3>August 4</h3>
          <p>NYSL Fundraiser</p>
        </div>
        <div className="static-card col">
          <h3>August 16</h3>
          <p>Season Kick-off: Meet the Teams</p>
        </div>
        <div className="static-card col">
          <h3>September 1</h3>
          <p>First Game of the Season (check Game Schedule for details)</p>
        </div>
      </div>

      <Accordion items={accordionItems} defaultOpenId="teams" />
    </div>
  )
}