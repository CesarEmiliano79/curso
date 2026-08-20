export default function TeamCard({ name, ageRange }) {
  return (
    <div className="team-card">
      <b>{name}</b>
      <span>{ageRange}</span>
    </div>
  )
}
