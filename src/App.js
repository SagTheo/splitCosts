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
        debt.owes.push({ 'id': el.id, 'to': el.userName, 'amount': 0 })
      })
    })
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
    setAllDebts(allDebts.filter(debt => debt.id !== id))
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
      let expenseSplit = formatNumber(expense, allUsers.length)
      const user = allUsers.filter(user => user.id === id)[0]

      // Set global + individual totals
      user['totalExpenses'] += Number(expense)
      setTotal(Number(expense) + total)

      // Set debt for each user
      const currUserDebt = allDebts.filter(debt => debt.id === id)[0]

      allDebts.forEach(debt => {
        if (debt.id !== id) {
          let currUserDebtAmount = currUserDebt.owes.filter(el => el.id === debt.id)[0]

          // needs more work
          debt.owes.forEach(el => {
            if (el.id === id) {
              // if (currUserDebtAmount.amount > expenseSplit) {
              //   currUserDebtAmount.amount -= expenseSplit
              //   expenseSplit = 0
              // } else if (currUserDebtAmount.amount < expenseSplit) {
              //   expenseSplit -= currUserDebtAmount.amount
              //   currUserDebtAmount.amount = 0
              // } else {
              //   currUserDebtAmount.amount = 0
              //   expenseSplit = 0
              // }

              el.amount += expenseSplit
            }
          })
        }
      })

      setAllExpenses([...allExpenses, { id: expenseId, userId: id, name: name, expense: expense, label: label }])
      setExpenseId(expenseId + 1)  
    }
  }

  const deleteExpense = (expenseId, userId, toTakeAway) => {
    const userTotalToUpdate = allUsers.filter(user => user.id === userId)
    const debtToTakeAway = formatNumber(toTakeAway, allUsers.length)

    // Set global + individual totals
    userTotalToUpdate[0]['totalExpenses'] -= toTakeAway
    setTotal(total - Number(toTakeAway))

    // Update debt for each user
    allDebts.forEach(debt => {
      if (debt.id !== userId) {
        const debtToUpdate = debt.owes.filter(el => el.id === userId)

        debtToUpdate[0].amount -= debtToTakeAway 
      }
    })

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