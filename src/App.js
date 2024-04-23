import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import ExpenseItem from './components/ExpenseItem';
import DebtItem from './components/DebtItem';

function App() {
  const [userId, setUserId] = useState(0)
  const [expenseId, setExpenseId] = useState(0)
  const [debtId, setDebtId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])
  const [allDebts, setAllDebts] = useState([])

  const addUser = () => {
    setAllUsers([...allUsers, {'id' : userId, 'userName' : userName}])
    setUserId(userId + 1)
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
  }

  const addExpense = (name, expense , label) => {
    const nbUsers = allUsers.length
    const debt = expense / nbUsers
    const owes = []

    allUsers.forEach(user => {
      if (user.userName !== name) {
        owes.push(user.userName)
      }
    })

    setAllExpenses([...allExpenses, { id: expenseId, name: name, expense: expense, label: label }])
    setExpenseId(expenseId + 1)

    setAllDebts([...allDebts, { id: debtId, owes: owes, gets: name, debt: debt }])
    setDebtId(debtId + 1)
  }

  const deleteExpense = id => {
    setAllExpenses(allExpenses.filter(expense => expense.id !== id))
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
                           deleteExpense={() => deleteExpense(expense.id)}
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
                        owes={debt.owes}
                        gets={debt.gets}
                        debt={debt.debt}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
