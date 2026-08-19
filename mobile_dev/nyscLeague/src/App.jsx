import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Scheduler from "./components/Scheduler";
import BottomNav from "./components/BottomNav";
import "./App.css";

// Pantallas que todavía no se han construido como componente de React.
// Muestran el mismo header/bottom-nav para que la navegación no se rompa
// mientras se van agregando (Acerca de, Contacto, Reglas, Registro).
function Placeholder({ title }) {
  return (
    <div className="screen">
      <header className="hdr">
        <div className="brand">
          <span className="mark">⚽</span>NYSL
        </div>
        <div className="ic" />
      </header>
      <div className="content" style={{ alignItems: "center", justifyContent: "center" }}>
        <p style={{ textAlign: "center" }}>{title} — pantalla pendiente de construir</p>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Scheduler />} />
        <Route path="/acerca-de" element={<Placeholder title="Acerca de" />} />
        <Route path="/contacto" element={<Placeholder title="Contacto" />} />
        <Route path="/reglas" element={<Placeholder title="Reglas" />} />
        <Route path="/registro" element={<Placeholder title="Registro" />} />
      </Routes>
    </BrowserRouter>
  );
}