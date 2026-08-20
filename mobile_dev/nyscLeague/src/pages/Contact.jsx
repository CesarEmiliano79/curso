import { useState } from 'react'
import Accordion from '../components/ui/Accordion.jsx'
import { MailIcon, PhoneIcon } from '../components/icons/Icons.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  const accordionItems = [
    {
      id: 'quick-form',
      title: 'Quick Contact Form',
      content: sent ? (
        <div className="end-state">
          <div className="emoji">✅</div>
          <h3>Message sent!</h3>
          <p>We will reply to your email as soon as we can.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-field" style={{ marginBottom: 10 }}>
            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required />
          </div>
          <button className="submit-btn" type="submit">Send</button>
        </form>
      ),
    },
  ]

  return (
    <div>
      <span className="badge">Contact Us</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>Get in Touch</h1>

      <div className="static-row">
        <div className="static-card">
          <div className="contact-icon"><MailIcon /></div>
          <h3>Email</h3>
          <p>
            <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a>
          </p>
        </div>
        <div className="static-card">
          <div className="contact-icon"><PhoneIcon /></div>
          <h3>Response Time</h3>
          <p>We will reply to your email as soon as we can.</p>
        </div>
      </div>

      <Accordion items={accordionItems} defaultOpenId="quick-form" />
    </div>
  )
}
