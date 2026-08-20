import Accordion from '../components/ui/Accordion.jsx'
import { rules } from '../data/rules.js'

export default function Rules() {
  const accordionItems = rules.map((r, i) => ({
    id: r.id,
    title: r.title,
    numberLabel: String(i + 1).padStart(2, '0'),
    content: r.paragraphs.map((p, idx) => <p key={idx}>{p}</p>),
  }))

  return (
    <div>
      <span className="badge">Rules and Policies</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>Rules of Play &amp; Policies</h1>
      <p className="page-intro">
        FIFA rules shall govern NYSL play except as modified herein.
      </p>

      <Accordion items={accordionItems} />
    </div>
  )
}
