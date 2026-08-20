import { BallIcon } from '../icons/Icons.jsx'

// Sólo visible en móvil (oculta en desktop por layout.css).
export default function TopBar() {
  return (
    <header className="topbar">
      <div className="dot">
        <BallIcon />
      </div>
      <span className="brand">Northside YSL</span>
    </header>
  )
}
