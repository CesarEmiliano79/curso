import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import BottomNav from './BottomNav.jsx'

// Un solo árbol de componentes para ambos tamaños de pantalla.
// La visibilidad de Sidebar vs. TopBar/BottomNav se resuelve
// enteramente con @media queries en layout.css — no hay lógica
// de "isMobile" en JS, así que no hay parpadeo ni desajuste con SSR.
export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        <main className="page-content">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
