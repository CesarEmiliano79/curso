import { useState } from 'react'
import { signInWithGoogle } from '../utilities/firebase.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  // La redirección post-login la maneja quien envuelve a este componente
  // (LoginRoute en /login, RegistrationRoute en /registration), según el
  // valor de `user` que vuelve a cambiar automáticamente tras iniciar sesión.
  if (user) {
    return null
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // No navegamos aquí: en cuanto `user` cambie, LoginRoute/RegistrationRoute
      // (quien envuelve a este componente) mostrará automáticamente lo que corresponda.
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Error al iniciar sesión con Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-header">
          <div className="login-logo">⚽</div>
          <h1>Northside YSL</h1>
          <p className="login-subtitle">Youth Soccer League</p>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          <button
            className={`tab-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {!isSignUp && (
          <div className="login-form">
            <h2>Welcome Back</h2>
            <p className="login-description">
              Sign in to your account to view games and announcements
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              className="btn-google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <div className="login-divider">
              <span>or continue with email</span>
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              disabled={isLoading}
            />

            <button className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              Sign In
            </button>

            <p className="login-footer">
              Don't have an account?{' '}
              <button
                className="link-btn"
                onClick={() => setIsSignUp(true)}
                disabled={isLoading}
              >
                Create one
              </button>
            </p>
          </div>
        )}

        {/* Sign Up Form */}
        {isSignUp && (
          <div className="login-form">
            <h2>Join the League</h2>
            <p className="login-description">
              Create an account to participate in the community
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              className="btn-google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign up with Google</span>
                </>
              )}
            </button>

            <div className="login-divider">
              <span>or sign up with email</span>
            </div>

            <input
              type="text"
              placeholder="Full name"
              className="login-input"
              disabled={isLoading}
            />

            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="login-input"
              disabled={isLoading}
            />

            <div className="login-checkbox">
              <input type="checkbox" id="terms" disabled={isLoading} />
              <label htmlFor="terms">
                I agree to the Terms of Service
              </label>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              Create Account
            </button>

            <p className="login-footer">
              Already have an account?{' '}
              <button
                className="link-btn"
                onClick={() => setIsSignUp(false)}
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="login-legal">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#rules">Rules</a>
        </div>
      </div>
    </div>
  )
}