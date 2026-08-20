export default function StaticCard({ icon, title, children }) {
  return (
    <div className="static-card">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
