import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';

function App() {
  const [id, setId] = useState(0)
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])
  const [allExpenses, setAllExpenses] = useState([])

  const addUser = () => {
    setAllUsers([...allUsers, {'id' : id, 'userName' : userName}])
    setId(id + 1)
  }

  const removeUser = id => {
    setAllUsers(allUsers.filter(user => user.id !== id))
  }

  const addExpense = (name, expense) => {
    setAllExpenses([...allExpenses, { name: name, expense: expense }])
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

      <div className='debts'>
        {
          allExpenses.map((expense, index) => {
            return (
              <p key={index}>{expense.name} paid ${expense.expense}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
