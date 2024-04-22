import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import ExpenseItem from './components/ExpenseItem';

function App() {
  const [userId, setUserId] = useState(0)
  const [expenseId, setExpenseId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])

  const addUser = () => {
    setAllUsers([...allUsers, {'id' : userId, 'userName' : userName}])
    setUserId(userId + 1)
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
  }

  const addExpense = (name, expense , label) => {
    setAllExpenses([...allExpenses, { id: expenseId, name: name, expense: expense, label: label }])
    setExpenseId(expenseId + 1)
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
      </div>
    </div>
  );
}

export default App;
