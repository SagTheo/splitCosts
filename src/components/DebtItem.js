import React from 'react'
import { formatName } from '../functions'
import styles from '../css/DebtItem.module.css'

const DebtItem = ({ userInDebt, owes }) => {
  return (
    <div>
        <span className={styles.userInDebt}>{formatName(userInDebt)}</span>
        {
            owes.map((userToPayBack, index) => {
                return(
                    <p key={index}>to {formatName(userToPayBack.to)}: ${userToPayBack.amount}</p>    
                ) 
            })
        }
    </div>
  )
}

export default DebtItem