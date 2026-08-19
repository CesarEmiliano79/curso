import BottomNav from "./BottomNav";

const VALORES = [
  { label: "Diversión" },
  { label: "Equipo" },
  { label: "Respeto" },
];

const CATEGORIAS = [
  { label: "U1", edad: "4-5 años" },
  { label: "U2", edad: "5-6 años" },
  { label: "U3", edad: "6-7 años" },
  { label: "U4", edad: "7-8 años" },
  { label: "U5", edad: "8-9 años" },
];

const PROXIMOS_JUEGOS = [
  { fecha: "SÁB\n08", equipos: "Mini Goles vs. Tigres", lugar: "Cancha A", hora: "9:00 AM" },
  { fecha: "SÁB\n08", equipos: "Exploradores vs. Leones", lugar: "Cancha B", hora: "10:30 AM" },
];

export default function Home() {
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
          <span className="badge">Temporada 2026</span>
          <h1 style={{ marginTop: 8 }}>Aquí comienza la aventura</h1>
          <p>Una liga para aprender, crecer y disfrutar cada gol.</p>
          <div className="ctas">
            <a className="btn btn-primary">Ver equipos</a>
            <a className="btn btn-outline-w">Calendario</a>
          </div>
        </div>

        <div>
          <div className="section-h">
            <span className="eyebrow">Más que fútbol</span>
          </div>
          <div className="icon-row" style={{ marginTop: 8 }}>
            {VALORES.map((v) => (
              <div className="icon-item" key={v.label}>
                <div className="ic" />
                <h4>{v.label}</h4>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-h">
            <span className="eyebrow">Nuestros equipos</span>
            <span className="more">Ver todos</span>
          </div>
          <div className="scroll-x" style={{ marginTop: 8 }}>
            {CATEGORIAS.map((c) => (
              <div className="chip-card" key={c.label}>
                <div className="ic" />
                <h4>{c.label}</h4>
                <span>{c.edad}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-h">
            <span className="eyebrow">Próximos encuentros</span>
            <span className="more">Ver todo</span>
          </div>
          <div className="card" style={{ marginTop: 8, padding: 0 }}>
            {PROXIMOS_JUEGOS.map((j, i) => (
              <div
                className="row"
                key={j.equipos}
                style={{
                  padding: "10px 12px",
                  borderBottom: i < PROXIMOS_JUEGOS.length - 1 ? "1px solid var(--line)" : "none",
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
      </div>

      <BottomNav />
    </div>
  );
}