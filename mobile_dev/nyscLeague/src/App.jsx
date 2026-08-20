import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Rules from './pages/Rules.jsx'
import GameInfo from './pages/GameInfo.jsx'
import Registration from './pages/Registration.jsx'
import RegistrationConfirmation from './pages/RegistrationConfirmation.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/game-info" element={<GameInfo />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration/confirmation" element={<RegistrationConfirmation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
