import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BallIcon } from '../icons/Icons.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { firebaseSignOut } from '../../utilities/firebase.jsx'

// Sólo visible en móvil (oculta en desktop por layout.css).
export default function TopBar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await firebaseSignOut()
      setIsProfileOpen(false)
      navigate('/registration')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="dot">
          <BallIcon />
        </div>
        <span className="brand">Northside YSL</span>
      </div>

      {/* User profile */}
      {user && (
        <div className="topbar-right">
          <div className="user-profile">
            <button
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              title={user.displayName || user.email}
            >
              <img
                src={user.photoURL || 'https://via.placeholder.com/32'}
                alt={user.displayName || 'User'}
                className="profile-avatar"
              />
              <span className="profile-name">{user.displayName?.split(' ')[0] || 'User'}</span>
            </button>

            {isProfileOpen && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName || 'User'}
                    className="profile-menu-avatar"
                  />
                  <div>
                    <p className="profile-menu-name">{user.displayName || 'Anonymous'}</p>
                    <p className="profile-menu-email">{user.email}</p>
                  </div>
                </div>

                <hr className="profile-menu-divider" />

                <button
                  className="profile-menu-item"
                  onClick={() => {
                    navigate('/announcements')
                    setIsProfileOpen(false)
                  }}
                >
                  💬 Announcements
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() => {
                    navigate('/')
                    setIsProfileOpen(false)
                  }}
                >
                  🏠 Home
                </button>

                <hr className="profile-menu-divider" />

                <button
                  className="profile-menu-item profile-menu-logout"
                  onClick={handleLogout}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}