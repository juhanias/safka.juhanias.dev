import React from 'react'
import './Date.component.css'
export const ActiveDay = ({ date, food }) => {
  return (
    <div className='date'>
      <h3>{date}</h3>

      <div className='food-entries'>
        {food.map((element, index) => (
          <p key={index}>{element}</p>
        ))}
      </div>
    </div>
  )
}
