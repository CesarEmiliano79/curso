import { useLocation, Link, Navigate } from 'react-router-dom'

const FIELD_LABELS = {
  season: 'Season',
  first_name: "Player's First Name",
  last_name: 'Last Name',
  address: 'Street Address',
  city: 'City',
  zip: 'Zip',
  birth: 'Birth Date',
  gender: 'Gender',
  grade: 'Grade',
  parent: 'Parent/Guardian',
  phone: 'Contact Phone',
  email: 'Contact Email',
  first_school: 'First Closest School',
  second_school: 'Second Closest School',
  normal_positions: 'Positions Normally Played',
  wanted_positions: 'Positions Wanted',
  has_uniform: 'Already Has Uniform',
  jersey_size: 'Jersey Size',
  shorts_size: 'Shorts Size',
  signature: 'Parent/Guardian Signature',
  date: 'Date',
}

function displayValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'null'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return value === '' ? 'null' : value
}

// Equivalente funcional a show_data.html: muestra lo que se hubiera
// enviado en la petición GET, pero como estado de React en vez de
// query string, evitando el uso de document.writeln.
export default function RegistrationConfirmation() {
  const location = useLocation()
  const form = location.state?.form

  if (!form) {
    return <Navigate to="/registration" replace />
  }

  return (
    <div>
      <div className="end-state">
        <div className="emoji">✅</div>
        <h3>Registration received!</h3>
        <p>The following information has been submitted as your registration:</p>
      </div>

      <table className="confirm-table">
        <thead>
          <tr>
            <th>Form Field</th>
            <th>Field Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(FIELD_LABELS).map(([key, label]) => (
            <tr key={key}>
              <td>{label}</td>
              <td>{displayValue(form[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <Link className="btn" to="/">Back to Home</Link>
      </div>
    </div>
  )
}
