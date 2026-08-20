import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/navigation.js'

// Sólo visible en móvil (oculta en desktop por layout.css).
// Usa los mismos navItems que Sidebar para mantener ambas vistas sincronizadas.
export default function BottomNav() {
  return (
    <nav className="bottomnav">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => 'navbtn' + (isActive ? ' active' : '')}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
