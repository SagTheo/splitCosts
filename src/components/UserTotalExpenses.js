import React from 'react'
import { formatName } from '../functions'

const UserTotalExpenses = ({ userName, totalExpenses}) => {
  return (
    <div>
        {formatName(userName)} : ${totalExpenses}
    </div>
  )
}

export default UserTotalExpenses