import React from 'react'

const DebtItem = ({ owes, gets, debt }) => {
  return (
    <div>
        {
            owes.map((userInDebt, index) => {
                return (
                    <p key={index}>{userInDebt} owes ${debt} to {gets}</p>
                )
            })
        }
    </div>
  )
}

export default DebtItem