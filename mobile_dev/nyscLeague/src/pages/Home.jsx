import { Link } from 'react-router-dom'
import Accordion from '../components/ui/Accordion.jsx'
import TeamCard from '../components/ui/TeamCard.jsx'
import GameRow from '../components/ui/GameRow.jsx'
import { teams } from '../data/teams.js'
import { upcomingGames } from '../data/games.js'

export default function Home() {
  const accordionItems = [
    {
      id: 'teams',
      title: 'Our Teams',
      content: (
        <div className="team-grid">
          {teams.map((t) => (
            <TeamCard key={t.id} name={t.name} ageRange={t.ageRange} />
          ))}
        </div>
      ),
    },
    {
      id: 'games',
      title: 'Upcoming Games',
      content: (
        <div>
          {upcomingGames.map((g, i) => (
            <GameRow key={i} {...g} />
          ))}
        </div>
      ),
    },
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

      <Accordion items={accordionItems} defaultOpenId="games" />
    </div>
  )
}
