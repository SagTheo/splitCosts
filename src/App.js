import { useState } from 'react';
import './App.css';
import { UserInput } from './components/UserInput';

function App() {
  const [userName, setUserName] = useState()
  const [allUsers, setAllUsers] = useState([])

  return (
    <div className="App">
      <input type='text' 
             id='userName' 
             name='userName' 
             onChange={e => setUserName(e.target.value)}
      >
      </input>
      <button onClick={() => setAllUsers([...allUsers, userName])}>Add user</button>

      <div className='allUsers'>
        {
          allUsers.map(user => {
            return (
              <UserInput name={user}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
