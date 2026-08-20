// game: { dateLabel: 'SEP\n08', teams: 'U1 vs. U4', location: 'AJ Katzenmaier', time: '9:30 a.m.' }
export default function GameRow({ dateLabel, teams, location, time }) {
  return (
    <div className="game-row">
      <div className="game-date">
        {dateLabel.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 && <br />}
          </span>
        ))}
      </div>
      <div className="game-info">
        <b>{teams}</b>
        <span>{location}</span>
      </div>
      <div className="game-time">{time}</div>
    </div>
  )
}
