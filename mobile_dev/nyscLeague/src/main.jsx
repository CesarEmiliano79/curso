import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap primero: da el grid, utilidades y componentes base.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos propios después: por orden de cascada, siguen ganando
// sobre las reglas de Bootstrap y mantienen la paleta verde/lima.
import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
