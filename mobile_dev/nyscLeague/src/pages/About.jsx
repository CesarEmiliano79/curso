import Accordion from '../components/ui/Accordion.jsx'

export default function About() {
  const accordionItems = [
    {
      id: 'general',
      title: 'General Information',
      content: (
        <p>
          The Northside Youth Soccer League was established in 1996 to provide
          athletes residing in Chicago's northside neighborhoods an environment
          in which to learn and play soccer. To be a member of NYSL, you must
          be between the ages of 4–12 and reside in a Chicago northside
          neighborhood. NYSL is run by a small full-time staff and relies on
          the generous volunteer time of parents and previous league members.
        </p>
      ),
    },
  ]

  return (
    <div>
      <span className="badge">About NYSL</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>Who We Are</h1>

      <div className="static-row">
        <div className="static-card">
          <h3>🎯 Mission</h3>
          <p>
            To support young athletes living in Chicago's northside
            neighborhoods with opportunities to learn and practice soccer
            skills, especially team cooperation and good sportsmanship.
          </p>
        </div>
        <div className="static-card">
          <h3>🌱 Vision</h3>
          <p>
            NYSL aspires to develop strong, well-rounded, and mindful athletes
            through the building of character, self-discipline, and
            leadership.
          </p>
        </div>
      </div>

      <Accordion items={accordionItems} defaultOpenId="general" />
    </div>
  )
}
