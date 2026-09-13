import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Rules from './pages/Rules.jsx'
import Schedule from './pages/Schedule.jsx'
import Announcements from './pages/Announcements.jsx'
import GamePictures from './pages/GamePictures.jsx'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'

// Componente para proteger rutas (requiere autenticación)
function ProtectedRoute({ element }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return user ? element : <Navigate to="/registration" replace />
}

// Componente para redirigir si ya está autenticado en login
function LoginRoute({ element }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    )
  }

  // Si está autenticado, redirige a home
  return user ? <Navigate to="/" replace /> : element
}

// Componente para /registration: sin sesión pide login primero (es el destino
// al que ProtectedRoute manda a los usuarios no autenticados); ya con sesión
// muestra el formulario de inscripción.
function RegistrationRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return user ? <Registration /> : <Login />
}

// Componente inner que usa los hooks de auth
function AppRoutes() {
  return (
    <Routes>
      {/* Ruta de Login - sin Layout, pero solo si NO está autenticado */}
      <Route 
        path="/login" 
        element={<LoginRoute element={<Login />} />} 
      />

      {/* Todas las otras rutas con Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/schedule" element={<Schedule />} />

              {/* Sin sesión: pide login. Con sesión: formulario de inscripción */}
              <Route path="/registration" element={<RegistrationRoute />} />

              {/* Ruta protegida - solo para usuarios autenticados */}
              <Route
                path="/announcements"
                element={<ProtectedRoute element={<Announcements />} />}
              />

              {/* Galería de fotos por juego - solo para usuarios autenticados */}
              <Route
                path="/photos/:id"
                element={<ProtectedRoute element={<GamePictures />} />}
              />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

// Componente principal con AuthProvider
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}