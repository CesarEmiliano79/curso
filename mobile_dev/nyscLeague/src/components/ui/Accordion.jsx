import { useState } from 'react'

// items: [{ id, title, numberLabel?, content: ReactNode }]
// defaultOpenId: id of the item open by default (optional)
export default function Accordion({ items, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId)

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className={'acc-item' + (isOpen ? ' open' : '')}>
            <button
              className="acc-head"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span>
                {item.numberLabel && <span className="num">{item.numberLabel}</span>}
                {item.title}
              </span>
              <span className="chev">⌄</span>
            </button>
            {isOpen && <div className="acc-body">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
