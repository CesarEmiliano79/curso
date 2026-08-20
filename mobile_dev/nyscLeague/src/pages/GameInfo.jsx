import Accordion from '../components/ui/Accordion.jsx'
import LocationCard from '../components/ui/LocationCard.jsx'
import { septemberGames, octoberGames } from '../data/games.js'
import { locations } from '../data/locations.js'

function ScheduleTable({ month, games }) {
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th className="month-header">{month}</th>
          <th>Teams</th>
          <th>Location</th>
          <th>Times</th>
        </tr>
      </thead>
      <tbody>
        {games.map((g, i) => (
          <tr key={i}>
            <td>{g.date}</td>
            <td>{g.teams}</td>
            <td>{g.location}</td>
            <td>{g.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function GameInfo() {
  const accordionItems = [
    {
      id: 'schedule',
      title: 'Fall Schedule',
      content: (
        <div>
          <ScheduleTable month="September" games={septemberGames} />
          <ScheduleTable month="October" games={octoberGames} />
        </div>
      ),
    },
    {
      id: 'locations',
      title: 'Game Locations',
      content: (
        <div>
          {locations.map((loc) => (
            <LocationCard key={loc.id} {...loc} />
          ))}
        </div>
      ),
    },
  ]

  return (
    <div>
      <span className="badge">Game Information</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>NYSL Game Information</h1>
      <span className="warning-note">* All games take place on Saturday</span>

      <Accordion items={accordionItems} defaultOpenId="schedule" />

      <div className="static-row">
        <div className="static-card">
          <h3>Facility Type</h3>
          <p>Outdoor</p>
        </div>
        <div className="static-card">
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
