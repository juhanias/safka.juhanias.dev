import React from 'react'

export const Link = ({desc, link}) => {
  return (
    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <img src='ic_fluent_link_24_filled.svg' alt='Link icon' />
        <a href={link}>{desc}</a> 
    </div>
  )
}
