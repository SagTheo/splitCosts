import React, { useState } from 'react'
import styles from '../css/UserInput.module.css'

export const UserInput = ({ name, removeUser, addExpense }) => {
  const [expense, setExpense] = useState()

  const formatName = name => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
  }

  return (
    <div className={styles.container}>
        <span>{formatName(name)}</span>
        <input type='number' 
               id='cost' 
               name='cost'
               onChange={e => setExpense(e.target.value)}
        ></input>
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="16" 
             height="16" 
             fill="green" 
             className={styles.add}
             viewBox="0 0 16 16"
             onClick={() => addExpense(name, expense)}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="16" 
             height="16" 
             fill="red" 
             className={styles.remove} 
             viewBox="0 0 16 16"
             onClick={removeUser}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg>
    </div>
  )
}
