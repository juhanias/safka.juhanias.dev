import React from 'react'
import './Date.component.css'
export const ActiveDay = ({ date, food, inactive = false, highlighted = false }) => {
  return (
    <div className={'date ' + (inactive ? 'inactive' : ' ') + (highlighted ? 'highlighted': ' ')}>
      <h3 className={inactive ? 'inactive-text' : ''}>{date}</h3>

      <div className='food-entries'>
        {food.map((element, index) => (
          <p key={index} className={inactive ? 'inactive-text' : ''}>{element}</p>
        ))}
      </div>
    </div>
  )
}
