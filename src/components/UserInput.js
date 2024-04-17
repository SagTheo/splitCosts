import React from 'react'

export const UserInput = ({ name }) => {
  return (
    <div>
        <span>{name}</span>
        <input type='number' id='cost' name='cost'></input>
    </div>
  )
}
