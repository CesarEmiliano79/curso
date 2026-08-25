export default function TeamCard({ name, info }) {
  return (
    <div className="team-card">
      <b>{name}</b>
      <span>{info}</span>
    </div>
  )
}
