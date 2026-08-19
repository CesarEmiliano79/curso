import { Link, useLocation } from "react-router-dom";
import { HomeIcon, InfoIcon, MailIcon, ShieldIcon, CalendarIcon, UserPlusIcon } from "./Icons";

const TABS = [
  { path: "/", label: "Inicio", Icon: HomeIcon },
  { path: "/acerca-de", label: "Nosotros", Icon: InfoIcon },
  { path: "/contacto", label: "Contacto", Icon: MailIcon },
  { path: "/reglas", label: "Reglas", Icon: ShieldIcon },
  { path: "/calendario", label: "Calendario", Icon: CalendarIcon },
  { path: "/registro", label: "Registro", Icon: UserPlusIcon },
];

// Detecta la pestaña activa a partir de la ruta actual, así que no hace
// falta pasarle ninguna prop: cada pantalla solo pone <BottomNav />.
export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bnav">
      {TABS.map(({ path, label, Icon }) => (
        <Link key={path} to={path} className={pathname === path ? "active" : ""}>
          <Icon />
          {label}
        </Link>
      ))}
    </nav>
  );
}