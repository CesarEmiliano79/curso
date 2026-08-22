import {
  BallIcon,
  AboutIcon,
  MailIcon,
  RulesIcon,
  CalendarIcon,
  RegisterIcon,
} from '../components/icons/Icons.jsx'

// Fuente única de verdad para los links de navegación.
// Sidebar (PC) y TopBar/BottomNav (móvil) leen de aquí,
// así el menú nunca se desincroniza entre vistas.
export const navItems = [
  { to: '/', label: 'Home', icon: BallIcon, end: true },
  { to: '/about', label: 'About', icon: AboutIcon },
  { to: '/contact', label: 'Contact', icon: MailIcon },
  { to: '/rules', label: 'Rules', icon: RulesIcon },
  { to: '/schedule', label: 'Schedule', icon: CalendarIcon },
  { to: '/registration', label: 'Register', icon: RegisterIcon },
]
