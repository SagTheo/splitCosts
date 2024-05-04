import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import ExpenseItem from './components/ExpenseItem'; 
import UserTotalExpenses from './components/UserTotalExpenses';
import DebtItem from './components/DebtItem';
import { formatNumber } from './functions';

function App() {
  const [userId, setUserId] = useState(0)
  const [expenseId, setExpenseId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [disableButton, setDisableButton] = useState(false)
  const [allDebts, setAllDebts] = useState([])
  const [toggleIcons, setToggleIcons] = useState(true)

  const addUser = () => {
    setAllUsers([...allUsers, {'id': userId, 'userName': userName, 'totalExpenses': 0}])
    setUserId(userId + 1)

    setAllDebts([...allDebts, { 'id': userId, 'userName': userName, 'owes': [] }])
  }

  const confirmGroup = () => {
    setDisableButton(true)
    setToggleIcons(false)

    allDebts.forEach(debt => {
      const temp = allDebts.filter(el => el.id !== debt.id)

      temp.forEach(el => {
        debt.owes.push({ 'id': el.id, 'to': el.userName, 'amount': 0, 'debtSet': false })
      })
    })
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
    setAllDebts(allDebts.filter(debt => debt.id !== id))
  }

  const updateDebt = () => {
    allDebts.forEach(debt => {
      debt.owes.forEach(el => el.debtSet = false)
    })

    allUsers.forEach(user => {
      if (user.totalExpenses > 0) {
        const totalUser1ExpensesSplit = formatNumber(user.totalExpenses, allUsers.length)
        const user1 = allDebts.filter(debt => debt.id === user.id)[0]
        
        allDebts.forEach(debt => {
          if (debt.id !== user.id) {
            const user2 = allUsers.filter(user => user.id === debt.id)[0]
            const user1DebtToUser2 = user1.owes.filter(el => el.id === debt.id)[0]

            if (!user1DebtToUser2.debtSet) {
              const user2DebtToUser1 = debt.owes.filter(el => el.id === user.id)[0]
              const totalUser2ExpensesSplit = formatNumber(user2.totalExpenses, allUsers.length)

              if (totalUser1ExpensesSplit > totalUser2ExpensesSplit) {
                user2DebtToUser1.amount = totalUser1ExpensesSplit - totalUser2ExpensesSplit
                user1DebtToUser2.amount = 0
              } else if (totalUser1ExpensesSplit < totalUser2ExpensesSplit) {
                user1DebtToUser2.amount = totalUser2ExpensesSplit - totalUser1ExpensesSplit
                user2DebtToUser1.amount = 0
              } else {
                user1DebtToUser2.amount = 0
                user2DebtToUser1.amount = 0
              }

              user1DebtToUser2.debtSet = true
              user2DebtToUser1.debtSet = true
            }
          }
        })
      } 
    })
  }

  const addExpense = (name, id, expense , label) => {
    const regexAmount = /\d/
    const regexLabel = /\w+/

    if (!regexAmount.test(expense)) {
      alert('Expense must be a number')
    } else if (Number(expense) <= 0) {
      alert('Expense must be superior to 0')
    } else if (!regexLabel.test(label) || label === undefined) {
      alert('You must enter a label')
    } else {
      const user = allUsers.filter(user => user.id === id)[0]

      // Set global + individual totals
      user['totalExpenses'] += Number(expense)
      setTotal(Number(expense) + total)

      // Update debt for each user
      updateDebt()
      
      setAllExpenses([...allExpenses, { id: expenseId, userId: id, name: name, expense: expense, label: label }])
      setExpenseId(expenseId + 1)  
    }
  }

  const deleteExpense = (expenseId, userId, toTakeAway) => {
    const userTotalToUpdate = allUsers.filter(user => user.id === userId)[0]

    // Set global + individual totals
    userTotalToUpdate['totalExpenses'] -= toTakeAway
    setTotal(total - Number(toTakeAway))

    // Update debt for each user
    updateDebt()

    setAllExpenses(allExpenses.filter(expense => expense.id !== expenseId))
  }

  return (
    <div className="App">
      <input type='text' 
             id='userName' 
             name='userName' 
             onChange={e => setUserName(e.target.value)}
             onFocus={(e) => e.target.value = ''}
      >
      </input>
      <button disabled={disableButton} onClick={() => addUser()}>Add user</button>
      <button disabled={disableButton} onClick={() => confirmGroup()}>Confirm group</button>

      <div className='allUsers'>
        {
          allUsers.map((user, index) => {
            return (
              <UserInput key={index}
                         name={user.userName}
                         id={user.id}
                         removeUser={() => removeUser(user.id)}
                         addExpense={addExpense}
                         toggleIcons={toggleIcons}
              />
            )
          })
        }
      </div>

      <div className='expenses'>
        <p className='title'>Expenses</p>
        {
          allExpenses.map((expense, index) => {
            return (
              <ExpenseItem key={index}
                           expense={expense}
                           deleteExpense={() => deleteExpense(expense.id, expense.userId, expense.expense)}
              />
            )
          })
        }
      </div>
        
      <span>Total: ${total}</span>

      <div className='total'>
        {
          allUsers.map((user, index) => {
            return (
              <UserTotalExpenses key={index}
                                 userName={user.userName}
                                 totalExpenses={user.totalExpenses}
              />
            )
          })
        }
      </div>

      <div className='balance'>
        <p className='title'>Balance</p>
        {
          allDebts.map((debt, index) => {
            return (
              <DebtItem key={index}
                        userInDebt={debt.userName}
                        owes={debt.owes} 
              />  
            )
          })
        }
      </div>
    </div>
  );
}

export default App;