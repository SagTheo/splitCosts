import React from 'react'

const UserTotalExpenses = ({ userName, totalExpenses}) => {
  return (
    <div>
        {userName} : ${totalExpenses}
    </div>
  )
}

export default UserTotalExpenses