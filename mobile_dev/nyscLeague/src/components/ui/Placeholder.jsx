// Pantalla placeholder para las secciones que todavía no están
// implementadas en esta iteración. Mantiene la navegación completa
// funcionando (para poder ver/probar el layout responsive en todas
// las rutas) sin fingir contenido que aún no se pidió construir.
export default function Placeholder({ title, badge }) {
  return (
    <div>
      {badge && <span className="badge">{badge}</span>}
      <h1 className="page-title" style={{ marginTop: 8 }}>{title}</h1>

      <div className="end-state">
        <div className="emoji">🚧</div>
        <h3>En proceso</h3>
        <p>Esta pantalla todavía no ha sido implementada.</p>
      </div>
    </div>
  )
}
