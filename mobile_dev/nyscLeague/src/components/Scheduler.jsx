import BottomNav from "./BottomNav";

const FILTROS = ["Todos", "Mis equipos", "Este finde"];

const JUEGOS_SEMANA = [
  { fecha: "SÁB\n08", equipos: "Mini Goles vs. Tigres", lugar: "Cancha A · Parque Central", hora: "9:00 AM" },
  { fecha: "SÁB\n08", equipos: "Exploradores vs. Leones", lugar: "Cancha B · Parque Central", hora: "10:30 AM" },
  { fecha: "DOM\n09", equipos: "Halcones vs. Guerreros", lugar: "Cancha A · Parque Central", hora: "11:30 AM" },
  { fecha: "DOM\n09", equipos: "Estrellas vs. Águilas", lugar: "Cancha C · Parque Central", hora: "1:00 PM" },
];

const ACCESOS_RAPIDOS = ["Ver mapa", "Mis jugadores"];

export default function Scheduler() {
  return (
    <div className="screen">
      <header className="hdr">
        <div className="brand">
          <span className="mark">⚽</span>NYSL
        </div>
        <div className="ic" />
      </header>

      <div className="content">
        <div className="hero-mini">
          <span className="badge">Calendario y ubicaciones</span>
          <h1 style={{ marginTop: 8, fontSize: 17 }}>Próximos partidos</h1>
          <div className="scroll-x" style={{ marginTop: 10 }}>
            {FILTROS.map((f) => (
              <div className="chip-card" key={f} style={{ minWidth: "auto", padding: "7px 12px" }}>
                {f}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-h">
            <span className="eyebrow">Esta semana</span>
            <span className="more">Ver mes</span>
          </div>
          <div className="card" style={{ marginTop: 8, padding: 0 }}>
            {JUEGOS_SEMANA.map((j, i) => (
              <div
                className="row"
                key={j.equipos}
                style={{
                  padding: "10px 12px",
                  borderBottom: i < JUEGOS_SEMANA.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div className="date-chip">
                  {j.fecha.split("\n").map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
                <div className="info">
                  <h4>{j.equipos}</h4>
                  <span>{j.lugar}</span>
                </div>
                <div className="time">{j.hora}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-h">
            <span className="eyebrow">Accesos rápidos</span>
          </div>
          <div className="icon-row" style={{ marginTop: 8 }}>
            {ACCESOS_RAPIDOS.map((a) => (
              <div className="icon-item" key={a}>
                <div className="ic" />
                <h4>{a}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}