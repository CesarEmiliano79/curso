import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { schools, grades, positions, jerseySizes } from '../data/schools.js'

const initialState = {
  season: '',
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  zip: '',
  birth: '',
  gender: '',
  grade: '',
  parent: '',
  phone: '',
  email: '',
  first_school: '',
  second_school: '',
  normal_positions: [],
  wanted_positions: [],
  has_uniform: false,
  jersey_size: '',
  shorts_size: '',
  signature: '',
  date: '',
}

export default function Registration() {
  const [form, setForm] = useState(initialState)
  const navigate = useNavigate()

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleInList(field, value) {
    setForm((f) => {
      const list = f[field]
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
      return { ...f, [field]: next }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/registration/confirmation', { state: { form } })
  }

  return (
    <div>
      <span className="badge">Registration Form</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>Player Registration</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-row">
            <div className="form-field">
              <label>Season</label>
              <input value={form.season} readOnly placeholder="Fall 2026" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Player's First Name</label>
              <input value={form.first_name} onChange={(e) => set('first_name', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Last Name</label>
              <input value={form.last_name} onChange={(e) => set('last_name', e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field" style={{ flexBasis: '100%' }}>
              <label>Street Address</label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>City</label>
              <input value={form.city} onChange={(e) => set('city', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Zip</label>
              <input value={form.zip} onChange={(e) => set('zip', e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Birth Date (mm/dd/yyyy)</label>
              <input value={form.birth} onChange={(e) => set('birth', e.target.value)} placeholder="mm/dd/yyyy" required />
            </div>
            <div className="form-field">
              <label>Gender</label>
              <div className="choice-group">
                <label><input type="radio" name="gender" checked={form.gender === 'female'} onChange={() => set('gender', 'female')} /> Female</label>
                <label><input type="radio" name="gender" checked={form.gender === 'male'} onChange={() => set('gender', 'male')} /> Male</label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field" style={{ flexBasis: '100%' }}>
              <label>Grade</label>
              <div className="choice-group">
                {grades.map((g) => (
                  <label key={g}>
                    <input type="radio" name="grade" checked={form.grade === g} onChange={() => set('grade', g)} /> {g}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field" style={{ flexBasis: '100%' }}>
              <label>Parent/Guardian</label>
              <input value={form.parent} onChange={(e) => set('parent', e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Contact Phone</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="###-###-####" required />
            </div>
            <div className="form-field">
              <label>Contact Email</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title" style={{ fontSize: 15 }}>Which elementary schools do you live near?</h2>
          <div className="form-row">
            <div className="form-field">
              <label>First Closest School</label>
              <select value={form.first_school} onChange={(e) => set('first_school', e.target.value)}>
                <option value="">Select First School</option>
                {schools.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Second Closest School</label>
              <select value={form.second_school} onChange={(e) => set('second_school', e.target.value)}>
                <option value="">Select Second School</option>
                {schools.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Which position(s) do you normally play? <span style={{ fontWeight: 400, color: 'var(--text-gray)', fontSize: 12 }}>(check all that apply)</span>
          </h2>
          <div className="checkbox-table">
            {positions.map((p) => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={form.normal_positions.includes(p)}
                  onChange={() => toggleInList('normal_positions', p)}
                /> {p}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title" style={{ fontSize: 15 }}>
            Which position(s) do you want to play? <span style={{ fontWeight: 400, color: 'var(--text-gray)', fontSize: 12 }}>(check all that apply)</span>
          </h2>
          <div className="checkbox-table">
            {positions.map((p) => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={form.wanted_positions.includes(p)}
                  onChange={() => toggleInList('wanted_positions', p)}
                /> {p}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>
            <input
              type="checkbox"
              checked={form.has_uniform}
              onChange={(e) => set('has_uniform', e.target.checked)}
            /> Already have a uniform
          </label>

          {form.has_uniform && (
            <div className="form-row" style={{ marginTop: 12 }}>
              <div className="form-field">
                <label>Jersey Size</label>
                <select value={form.jersey_size} onChange={(e) => set('jersey_size', e.target.value)}>
                  <option value="">Select size</option>
                  {jerseySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label>Shorts Size</label>
                <select value={form.shorts_size} onChange={(e) => set('shorts_size', e.target.value)}>
                  <option value="">Select size</option>
                  {jerseySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="permission-box">
          <h3>Permission to Play</h3>
          <p>
            I, the parent or guardian of the minor registrant, agree that the
            registrant and I will abide by all the rules of the Northside
            Youth Soccer League (NYSL). In recognizing the possibility of
            physical injury associated with soccer and in consideration for
            the League accepting the registrant for its soccer programs and
            activities, I hereby release, discharge, and/or otherwise
            indemnify NYSL, their employees and associated personnel and
            volunteers, including the facilities used for practices and
            games, against any claim by or on behalf of the registrant.
          </p>
          <p>
            By entering your name below, I hereby agree and authorize the
            above, and acknowledge that I have read the cancellation policy
            and agree to its terms.
          </p>
          <div className="form-row" style={{ marginTop: 12 }}>
            <div className="form-field">
              <label>Parent/Guardian Signature</label>
              <input value={form.signature} onChange={(e) => set('signature', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input value={form.date} onChange={(e) => set('date', e.target.value)} required />
            </div>
          </div>
        </div>

        <button className="submit-btn" type="submit">Submit Registration</button>
      </form>
    </div>
  )
}
