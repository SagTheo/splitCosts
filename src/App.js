import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import ExpenseItem from './components/ExpenseItem'; 
import UserTotalExpenses from './components/UserTotalExpenses';

function App() {
  const [userId, setUserId] = useState(0)
  const [expenseId, setExpenseId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [addUserDisabled, setAddUserDisabled] = useState(false)
  const [allDebts, setAllDebts] = useState([])

  const addUser = () => {
    setAllUsers([...allUsers, {'id': userId, 'userName': userName, 'totalExpenses': 0}])
    setUserId(userId + 1)

    setAllDebts([...allDebts, { 'id': userId, 'userName': userName, 'owes': [] }])
  }

  const confirmGroup = () => {
    setAddUserDisabled(true)

    allDebts.forEach(debt => {
      const temp = allDebts.filter(el => el.id !== debt.id)

      temp.forEach(el => {
        debt.owes.push({ 'to': el.userName, 'amount': 0 })
      })
    })

    console.log(allDebts)
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
    setAllDebts(allDebts.filter(debt => debt.id !== id))
  }

  const addExpense = (name, id, expense , label) => {
    const user = allUsers.filter(user => user.id === id)

    user[0]['totalExpenses'] += Number(expense)

    setTotal(Number(expense) + total)

    setAllExpenses([...allExpenses, { id: expenseId, userId: id, name: name, expense: expense, label: label }])
    setExpenseId(expenseId + 1)
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
      <button disabled={addUserDisabled} onClick={() => addUser()}>Add user</button>
      <button onClick={() => confirmGroup()}>Confirm group</button>

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
      </div>
    </div>
  );
}

export default App;
