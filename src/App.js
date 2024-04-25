import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import ExpenseItem from './components/ExpenseItem';
import DebtItem from './components/DebtItem';
import UserTotalExpenses from './components/UserTotalExpenses';

function App() {
  const [userId, setUserId] = useState(0)
  const [expenseId, setExpenseId] = useState(0)
  const [debtId, setDebtId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])
  const [allDebts, setAllDebts] = useState([])
  const [total, setTotal] = useState(0)

  const addUser = () => {
    setAllUsers([...allUsers, {'id' : userId, 'userName' : userName, 'totalExpenses': 0}])
    setUserId(userId + 1)
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
  }

  const addExpense = (name, id, expense , label) => {
    const nbUsers = allUsers.length
    const debt = expense / nbUsers
    const owes = []
    const user = allUsers.filter(user => user.id === id)

    user[0]['totalExpenses'] += Number(expense)

    setTotal(Number(expense) + total)

    allUsers.forEach(user => {
      if (user.userName !== name) {
        owes.push(user.userName)
      }
    })

    setAllExpenses([...allExpenses, { id: expenseId, userId: id, name: name, expense: expense, label: label }])
    setExpenseId(expenseId + 1)

    setAllDebts([...allDebts, { id: debtId, owes: owes, gets: name, debt: debt }])
    setDebtId(debtId + 1)
  }

  const deleteExpense = (expenseId, userId, toTakeAway) => {
    const userTotalToUpdate = allUsers.filter(user => user.id === userId)

    userTotalToUpdate[0]['totalExpenses'] -= toTakeAway
    setTotal(total - Number(toTakeAway))

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
      <button onClick={() => addUser()}>Add user</button>

      <div className='allUsers'>
        {
          allUsers.map((user, index) => {
            return (
              <UserInput key={index}
                         name={user.userName}
                         id={user.id}
                         removeUser={() => removeUser(user.id)}
                         addExpense={addExpense}
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
        {/* {
          allDebts.map((debt, index) => {
            return (
              <DebtItem key={index}
                        owes={debt.owes}
                        gets={debt.gets}
                        debt={debt.debt}
              />
            )
          })
        } */}
      </div>
    </div>
  );
}

export default App;
