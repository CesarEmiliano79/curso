import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/navigation.js'
import { BallIcon } from '../icons/Icons.jsx'

// Se muestra sólo en viewport de escritorio (ver layout.css @media min-width:768px).
// En móvil queda con display:none, así que nunca compite visualmente con BottomNav.
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="dot">
          <BallIcon />
        </div>
        <div>
          <div className="name">Northside YSL</div>
          <div className="tag">Youth Soccer League</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
