import React from 'react'
import { formatName } from '../functions'
import styles from '../css/UserTotalExpenses.module.css'

const UserTotalExpenses = ({ userName, totalExpenses}) => {
  return (
    <div>
        {formatName(userName)} : <span className={styles.total}>${totalExpenses}</span>
    </div>
  )
}

export default UserTotalExpenses