import React from 'react'

const DebtItem = ({ userInDebt, owes }) => {
  return (
    <div>
        {
            owes.map((userToPayBack, index) => {
                return(
                    <p key={index}>{userInDebt} owes ${userToPayBack.amount} to {userToPayBack.to}</p>    
                ) 
            })
        }
    </div>
  )
}

export default DebtItem